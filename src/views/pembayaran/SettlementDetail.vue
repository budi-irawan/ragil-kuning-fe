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
                  <div class="float-left">
                    <h3 class="card-title">
                      <font-awesome-icon icon="fa-solid fa-book" />
                      Detail Settlement 
                    </h3>
                  </div>
                  <div class="float-right">
                    <h3 class="card-title">
                      {{ moment().format('dddd') }}, {{ moment().format('LL') }} {{ moment().format('h:mm:ss') }}
                    </h3>
                  </div>
                </div>
                <div class="card-body pad table-responsive">
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
                        <tr style="font-weight: bold;">
                          <td colspan="4">Total</td>
                          <td>{{ formatRupiah(jumlah_total_terbayar) }}</td>
                          <td>{{ formatRupiah(jumlah_total_denda_terbayar) }}</td>
                          <td>{{ formatRupiah(jumlah_total_terbayar + jumlah_total_denda_terbayar) }}</td>
                        </tr>
                        <tr v-if="item_laporan.length == 0">
                          <td colspan="7">Belum ada pembayaran</td>
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
  import axios from "axios";
  import moment from "moment";
  export default {
    name: "SettlementDetail",
    data() {
      return {
        item_user: {},
        item_laporan: [],

        jumlah_total_terbayar: 0,
        jumlah_total_denda_terbayar: 0,
      };
    },
  
    created() {
      this.getUser();
      this.detailSettlementPerTanggal();
    },
  
    methods: {
      formatRupiah(money) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(money);
      },
  
      async getUser() {
        let token_user = localStorage.getItem("token");
        try {
          const data_user = await this.$axios.get("http://localhost:3001/user/profil",{ headers: { token: token_user } });
          let dd = data_user.data.data;
          this.item_user = dd[0];
        } catch (error) {
          console.log(error);
        }
      },

      async detailSettlementPerTanggal() {
        try {
          let tanggal = this.$route.params.tanggal;
          const data_laporan = await axios.post("http://localhost:3001/pembayaran/detailSettlementPerTanggal", { tanggal });
  
          let db = data_laporan.data.data;
          for (let i = 0; i < db.length; i++) {
            db[i].no = i + 1;
            this.jumlah_total_terbayar += db[i].total_terbayar
            this.jumlah_total_denda_terbayar += db[i].total_denda_terbayar
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
  </style>