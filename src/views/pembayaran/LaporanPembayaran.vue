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
                    Settlement
                  </h3>
                </div>
                <div class="float-right">
                  <h3 class="card-title">
                    {{ moment().format('dddd') }}, {{ moment().format('LL') }} {{ moment().format('h:mm:ss') }}
                  </h3>
                </div>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive-md" v-if="!loading">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col" style="width: 15%">Tanggal</th>
                        <th scope="col" style="width: 18%">
                          Jumlah Pembayaran
                        </th>
                        <th scope="col" style="width: 20%">
                          Jumlah Denda Terbayar
                        </th>
                        <th scope="col" style="width: 15%">Sub.Total</th>
                        <th scope="col" style="width: 15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="lp in item_laporan" :key="lp.tanggal_bayar">
                        <td>{{ lp.no }}</td>
                        <td>{{ moment(lp.tanggal_bayar).format("LL") }}</td>
                        <td>{{ formatRupiah(lp.total_terbayar) }}</td>
                        <td>{{ formatRupiah(lp.total_denda_terbayar) }}</td>
                        <td>{{ formatRupiah(lp.total) }}</td>
                        <td class="tombol">
                          <router-link class="btn btn-sm btn-success" :to="{ name: 'detail-settlement', params: { tanggal: lp.tanggal_bayar }, }" data-toggle="tooltip"
                            data-placement="top"
                            title="Detail Settlement">
                            <i class="fas fa-solid fa-eye"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            @click="cetakSettlementReport(lp.tanggal_bayar)"
                          >
                            <i class="fa fa-print"></i>
                            Cetak
                          </button>
                        </td>
                      </tr>
                      <tr v-if="item_laporan.length == 0">
                        <td colspan="10">Belum ada pembayaran</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-else class="row muser">
                  <div class="col text-center">
                    <img :src="loadingImage" />
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
import axios from "axios";
import moment from "moment";
export default {
  name: "LaporanPembayaran",
  data() {
    return {
      loading: true,
      item_user: {},
      item_laporan: [],

      loadingImage: require('../../../public/rolling.gif')
    };
  },

  async created() {
    this.getUser();
    // this.getLaporanPembayaranPerHari();
    this.item_laporan = await this.getLaporanPembayaranPerHari();
    this.loading = false 
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
        const data_user = await this.$axios.get(
          "http://localhost:3001/user/profil",
          { headers: { token: token_user } }
        );
        let dd = data_user.data.data;
        this.item_user = dd[0];
      } catch (error) {
        console.log(error);
      }
    },

    async getLaporanPembayaranPerHari() {
      try {
        const data_laporan = await axios.get(
          "http://localhost:3001/pembayaran/laporanPembayaranPerHari"
        );

        let db = data_laporan.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        return db
      } catch (error) {
        console.log(error);
      }
    },

    async cetakSettlementReport(tanggal_bayar) {
      try {
        let tanggal = tanggal_bayar;
        let hasil = await axios.post("http://localhost:3001/pembayaran/cetakLaporanPembayaranPerTanggal", { tanggal });
        let dataLaporan = hasil.data.data;
        console.log(dataLaporan);

        let struk_settlement = {
          kasir: this.item_user.nama_user,
          tanggal: moment().format("DD/MM/YYYY"),
          jam: moment(new Date()).format("HH:mm:ss"),
          data_settlement: []
        };

        for (let i = 0; i < dataLaporan.length; i++) {
          struk_settlement.data_settlement.push({
            nama_dusun: dataLaporan[i].nama_dusun,
            total_terbayar: dataLaporan[i].total_terbayar,
            total_denda_terbayar: dataLaporan[i].total_denda_terbayar,
            total: dataLaporan[i].total
          })
        }

        this.$swal({
          icon: "success",
          title: "Settlement berhasil dicetak",
          showConfirmButton: false,
          timer: 3000,
        });

        this.getLaporanPembayaranPerHari();
        const kirim_struk = await axios.post("http://localhost:4000/cetak-struk-settlement",{ struk_settlement });
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