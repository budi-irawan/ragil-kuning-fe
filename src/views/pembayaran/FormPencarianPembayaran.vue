<template>
  <div>
    <app-nav-bar />
    <div class="content-wrapper">
      <router-view />
      <section class="content">
        <div class="container-fluid pt-3">
        <div class="row mt-1 mb-3">
          <app-top-bar />
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
                  Tagihan Pembayaran
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col">
                    <div class="form-outline">
                      <input
                        type="text"
                        v-model="search"
                        autofocus
                        class="form-control pencarian"
                        placeholder="Cari pelanggan "
                        aria-label="Search"
                        id="input-pencarian"
                        v-on:keyup.enter="cariPelanggan"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row mb-3">
                  <div class="col">
                    <div class="table-responsive-md" v-if="hasilPencarian.length>0">
                      <table class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 5%">No</th>
                            <th scope="col" style="width: 15%">Nama Pelanggan</th>
                            <th scope="col" style="width: 15%">Desa</th>
                            <th scope="col" style="width: 15%">Dusun</th>
                            <th scope="col" style="width: 18%">Total Pemakaian</th>
                            <th scope="col" style="width: 15%">Total Tagihan</th>
                            <th scope="col" style="width: 15%">Total Terbayar</th>
                            <th scope="col" style="width: 15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="lp in hasilPencarian" :key="lp.pelanggan_id">
                            <td>{{ lp.no }}</td>
                            <td>{{ lp.nama_pelanggan }}</td>
                            <td>{{ lp.nama_desa }}</td>
                            <td>{{ lp.nama_dusun }}</td>
                            <td>{{ lp.jumlah_pemakaian }}</td>
                            <td>{{ formatRupiah(lp.jumlah_tagihan) }}</td>
                            <td>{{ formatRupiah(lp.jumlah_terbayar) }}</td>
                            <td class="tombol">
                              <router-link 
                              class="btn btn-sm btn-success"
                                :to="{
                                  name: 'detail-pembayaran',
                                  params: { id: lp.pelanggan_id },
                                }"
                              >
                                <i class="fas fa-solid fa-eye"></i>
                              </router-link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 v-if="hasilPencarian.length==0&&notFound==true">Data tidak ada</h3>
                  </div>
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

window.onload = function() {
  document.getElementById("input-pencarian").focus();
};

export default {
  name: "FormPencarianPembayaran",
  data() {
    return {
      search : '',

      hasilPencarian : [],
      notFound: false
    };
  },

  created() {
  },

  computed: {
  },

  methods: {
    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(money);
    },

    async cariPelanggan() {
      let namaPelanggan = this.search
      console.log(namaPelanggan);
      const dataPencarian = await axios.post(
        `${ipBackend}/pembayaran/listTagihanByNamaPelanggan`,
        { nama_pelanggan: this.search }
      );
      dataPencarian.data.data.length == 0 ? this.notFound = true : this.notFound = false
      for (let i = 0; i < dataPencarian.data.data.length; i++) {
        dataPencarian.data.data[i].no = i + 1
      }
      this.hasilPencarian = dataPencarian.data.data
    }
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

input.pencarian {
  height: 100px;
  font-size: 70px;
  font-weight: bold;
}
</style>