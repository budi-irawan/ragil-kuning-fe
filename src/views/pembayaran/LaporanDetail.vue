<template>
  <div>
    <app-nav-bar />
    <div class="content-wrapper">
      <router-view />
      <section class="content">
        <div class="container-fluid pt-3">
        <!-- <div class="row mt-1 mb-3">
          <app-top-bar />
        </div> -->
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary kartu">
              <div class="card-header">
                <div class="float-left">
                  <h3 class="card-title">
                    <font-awesome-icon icon="fa-solid fa-book" />
                    Laporan Detail
                  </h3>
                </div>
                <div class="float-right">
                  <h3 class="card-title">
                    {{ moment().format('dddd') }}, {{ moment().format('LL') }} {{ moment().format('h:mm:ss') }}
                  </h3>
                </div>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="tanggal_pembayaran" class="col-sm-6 col-form-label"
                        >Tanggal Pembayaran</label
                      >
                      <div class="col-sm-6">
                        <date-picker
                          v-model="tanggal_pembayaran"
                          :config="options"
                          @dp-change="doSomethingOnChange"
                        ></date-picker>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group row">
                      <button type="submit" class="btn btn-primary" @click="laporanDetail">
                        Tampilkan
                      </button>
                    </div>
                  </div>
                </div>
                <div class="table-responsive-md">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                          <th scope="col" style="width: 20%">Nama Pelanggan</th>
                          <th scope="col" style="width: 12%">Desa</th>
                          <th scope="col" style="width: 12%">Dusun</th>
                          <th scope="col" style="width: 15%">Jml.Pembayaran</th>
                          <th scope="col" style="width: 20%">Jml.Denda Terbayar</th>
                          <th scope="col" style="width: 15%">Sub.Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="lp in item_laporan" :key="lp.pelanggan_id">
                          <td>{{ lp.no }}</td>
                          <td>{{ lp.nama_pelanggan }}</td>
                          <td>{{ lp.nama_desa }}</td>
                          <td>{{ lp.nama_dusun }}</td>
                          <td>{{ formatRupiah(lp.total_terbayar) }}</td>
                          <td>{{ formatRupiah(lp.total_denda_terbayar) }}</td>
                          <td>{{ formatRupiah(lp.total) }}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
  

<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import moment from "moment";
export default {
  name: "LaporanDetail",
  data() {
    return {
      tanggal_pembayaran: '',
      item_laporan: [],

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
    };
  },

  methods: {
    formatRupiah(money) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(money);
      },

    doSomethingOnChange() {
      this.tanggal_pembayaran = moment(this.tanggal_pembayaran).format("YYYY-MM-DD");
    },

    async laporanDetail() {
        try {
          let tanggal_pembayaran = this.tanggal_pembayaran;
          const data_laporan = await axios.post(`${ipBackend}/pembayaran/laporanDetail`, { tanggal_pembayaran });
  
          let db = data_laporan.data.data;
          for (let i = 0; i < db.length; i++) {
            db[i].no = i + 1;
          }
          this.item_laporan = db;
        } catch (error) {
          console.log(error);
        }
      },
  },
};
</script>
  

<style>
.tombol {
  text-align: center;
}
.btn-sm {
  margin: 2px;
}
.kartu {
  height: 100%;
  height: 70vh;
}
</style>