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
                    Laporan Harian
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
                      <button type="submit" class="btn btn-primary" @click="laporanHarian">
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
                        <th scope="col" style="width: 15%">Kasir</th>
                        <th scope="col" style="width: 18%">
                          Jumlah Pembayaran
                        </th>
                        <th scope="col" style="width: 20%">
                          Jumlah Denda Terbayar
                        </th>
                        <th scope="col" style="width: 15%">Sub.Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="rl in resultLaporan" :key="rl.user_id">
                        <td>{{ rl.no }}</td>
                        <td>{{ rl.nama_user }}</td>
                        <td>{{ rl.jumlah_pembayaran }}</td>
                        <td>{{ rl.jumlah_denda }}</td>
                        <td>{{ rl.jumlah_pembayaran + rl.jumlah_denda }}</td>
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
  name: "LaporanHarian",
  data() {
    return {
      tanggal_pembayaran: '',
      resultLaporan : [],

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
    };
  },

  created() {
    // this.laporanHarian()
  },

  methods: {
    doSomethingOnChange() {
      this.tanggal_pembayaran = moment(this.tanggal_pembayaran).format("YYYY-MM-DD");
    },

    async laporanHarian() {
      try {
        let tanggal_pembayaran = this.tanggal_pembayaran
        const data_laporan = await axios.post(`${ipBackend}/pembayaran/laporanHarian`, { tanggal_pembayaran });
        let hasilLaporan = data_laporan.data.data
        for (let i = 0; i < hasilLaporan.length; i++) {
          hasilLaporan[i].no = i + 1
        }        
        this.resultLaporan = hasilLaporan
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