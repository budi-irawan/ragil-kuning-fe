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
        <div class="row mt-3 mb-2">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
                  Detail Pembayaran Tagihan Pelanggan
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row">
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="card bg-secondary kartu-identitas">
                          <div class="card-body pt-3">
                            <div class="row">
                              <div class="col-md-3">
                                <b>Nama Pelanggan: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nama_pelanggan }}
                                </p>
                                <b>Alamat: </b>
                                <p class="identitas">{{ item_pelanggan.alamat }}</p>
                              </div>
                              <div class="col-md-3">
                                <b>No.Telepon: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nomor_telepon }}
                                </p>
                                <b>Desa: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nama_desa }}
                                </p>
                              </div>
                              <div class="col-md-3">
                                <b>Dusun: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nama_dusun }}
                                </p>
                                <b>Golongan Tarif: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nama_golongan_tarif }}
                                </p>
                              </div>
                              <div class="col-md-3">
                                <b>Tarif/m2: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.nominal_tarif }}
                                </p>
                                <b>Biaya Perawatan: </b>
                                <p class="identitas">
                                  {{ item_pelanggan.biaya_perawatan }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12 isi-tagihan">
                        <div class="table-responsive-md">
                          <table class="table table-bordered table-hover table-sm">
                            <thead>
                              <tr>
                                <th scope="col" style="width: 3%">No</th>
                                <th scope="col" style="width: 10%">Bulan</th>
                                <th scope="col" style="width: 15%">
                                  Jml.Pemakaian
                                </th>
                                <th scope="col" style="width: 15%">
                                  Jml.Tagihan
                                </th>
                                <th scope="col" style="width: 12%">
                                  Jml.Denda
                                </th>
                                <th scope="col" style="width: 18%">
                                  Sisa Tagihan
                                </th>
                                <th scope="col" style="width: 15%">
                                  Jml.Terbayar
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="lp in list_pembayaran"
                                :key="lp.pemakaian_id"
                              >
                                <td>{{ lp.no }}</td>
                                <td>{{ lp.nama_bulan }}</td>
                                <td>{{ lp.selisih }}</td>
                                <td>{{ formatRupiah(lp.total_tarif) }}</td>
                                <td>{{ formatRupiah(lp.jumlah_denda_per_bulan) }}</td>
                                <td>{{ formatRupiah(lp.sisa_pembayaran_dan_denda) }}</td>
                                <td>{{ formatRupiah(lp.total_terbayar) }}</td>

                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <th colspan="3" scope="col" style="width: 5%">
                                  Total
                                </th>
                                <th scope="col" style="width: 15%">
                                  {{ formatRupiah(total_tagihan_tanpa_denda) }}
                                </th>
                                <th scope="col" style="width: 12%">
                                  {{ formatRupiah(total_denda) }}
                                </th>
                                <th scope="col" style="width: 18%">
                                  {{ formatRupiah(total_tagihan_dengan_denda) }}
                                </th>
                                <th scope="col" style="width: 15%">
                                  {{ formatRupiah(total_total_terbayar) }}
                                </th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="card shadow">
                      <div class="card-header bg-primary head-form-bayar">
                        <h5>PEMBAYARAN</h5>
                      </div>
                      <div class="card-body">
                        <div class="row" style="font-size: 20px;text-align: center;">TOTAL :</div>
                        <div class="row" style="font-size: 50px;text-align: center; font-weight: bold;">{{ formatRupiah(total_tagihan_dengan_denda) }}</div>
                        <form>
                          <div class="form-group">
                            <label for="jumlah_bayar">Jumlah Bayar</label>
                            <input type="text" class="form-control form-input-bayar" id="jumlah_bayar" autofocus v-model="pembayaran_baru.jumlah_bayar" v-on:keyup.enter="savePembayaran">
                          </div>
                          <div class="form-group">
                            <label for="uang_kembalian">Kembali</label>
                            <input type="text" class="form-control form-input-bayar" id="uang_kembalian" v-model="susuk" disabled>
                          </div>
                          <hr>
                          <div class="form-group">
                            <button
                              type="button"
                              class="btn btn-primary btn-block"
                              @click="savePembayaran"
                            >
                              <i class="fa fa-save"></i>
                              Bayar
                            </button>
                          </div>

                          <div class="form-group">
                            <button
                              type="button"
                              class="btn btn-success btn-block"
                              @click="cetakStruk"
                            >
                              <i class="fa fa-print"></i>
                              Cetak Struk
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col">
            <div class="card card-primary card-outline">
              <div class="card-header p-0 pt-1 border-bottom-0">
                <div class="row mt-2 px-3">
                  <div class="col">
                    <h5>Pembayaran</h5>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form_tambah">
                      <form class="form-horizontal">
                        <div class="form-group row">
                          <label
                            for="jumlah_bayar"
                            class="col-sm-4 col-form-label"
                            >Jumlah Bayar</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="text"
                              class="form-control"
                              id="jumlah_bayar"
                              v-model="pembayaran_baru.jumlah_bayar"
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label
                            for="uang_kembalian"
                            class="col-sm-4 col-form-label"
                            >Kembali</label
                          >
                          <div class="col-sm-8">
                            <input
                              type="text"
                              class="form-control"
                              id="uang_kembalian"
                              v-model="susuk"
                            />
                          </div>
                        </div>

                        <div class="form-group row">
                          <div class="col-sm-12">
                            <button
                              type="button"
                              class="btn btn-primary btn-block"
                              @click="savePembayaran"
                            >
                              <i class="fa fa-save"></i>
                              Print
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
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

window.onload = function() {
  document.getElementById("jumlah_bayar").focus();
};

export default {
  name: "DetailPembayaran",
  data() {
    return {
      item_user: {},
      item_pelanggan: {},
      list_pembayaran: [],
      list_pembayaran_belum_lunas: [],
      list_bulan: [],

      pembayaran_baru: {
        tanggal_bayar: moment().format("YYYY-MM-DD HH:mm:ss"),
        pelanggan_id: "",
        nominal_denda: 0,
        tanggal_jatuh_tempo: 0,
      },

      total_tagihan_tanpa_denda: 0,
      total_denda: 0,
      total_total_terbayar: 0,
      total_tagihan_dengan_denda: 0,

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },

      loadingImage: require('../../../public/rolling.gif')
    };
  },

  created() {
    this.getUser();
    this.getPelangganById();
    this.getTagihanByPelangganId();
    this.doSomethingOnChange();
  },

  computed: {
    susuk: function () {
      let ss = 0;
      if (!this.pembayaran_baru.jumlah_bayar) {
        ss = 0;
      } else {
        if (
          this.pembayaran_baru.jumlah_bayar < this.total_tagihan_dengan_denda
        ) {
          ss = 0;
        } else {
          ss =
            Number(this.pembayaran_baru.jumlah_bayar) -
            Number(this.total_tagihan_dengan_denda);
        }
      }
      return ss;
    },
  },

  methods: {
    async getUser() {
      let token_user = localStorage.getItem("token");
      try {
        const data_user = await this.$axios.get(
          `${ipBackend}/user/profil`,
          { headers: { token: token_user } }
        );
        let dd = data_user.data.data;
        this.item_user = dd[0];
      } catch (error) {
        console.log(error);
      }
    },

    async getPelangganById() {
      try {
        const data_pelanggan = await axios.get(`${ipBackend}/pelanggan/detailsById/${this.$route.params.id}`);
        this.item_pelanggan = data_pelanggan.data.data[0];
        this.pembayaran_baru.pelanggan_id = data_pelanggan.data.data[0].pelanggan_id;
        this.pembayaran_baru.tanggal_jatuh_tempo = data_pelanggan.data.data[0].tanggal_jatuh_tempo;
        this.pembayaran_baru.nominal_denda = data_pelanggan.data.data[0].nominal_denda;
      } catch (error) {
        console.log(error, "eror satu");
      }
    },

    async getTagihanByPelangganId() {
      try {
        let pelanggan_id = this.$route.params.id;
        const data_pelanggan = await axios.get(`${ipBackend}/pelanggan/detailsById/${pelanggan_id}`);
        let tanggal_jatuh_tempo = data_pelanggan.data.data[0].tanggal_jatuh_tempo;
        let nominal_denda = data_pelanggan.data.data[0].nominal_denda;
        
        const data_pembayaran = await axios.post(`${ipBackend}/pembayaran/listTagihanByPelangganId`,
          { pelanggan_id, tanggal_jatuh_tempo, nominal_denda }
        );

        let db = data_pembayaran.data.data;
        this.total_tagihan_tanpa_denda = db[0].total_tagihan_tanpa_denda;
        this.total_denda = db[0].total_denda;
        this.total_total_terbayar = db[0].total_total_terbayar;
        this.total_tagihan_dengan_denda = db[0].total_tagihan_dengan_denda;
        let dp = db[0].data_tagihan;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
        }
        this.list_pembayaran = dp
      } catch (error) {
        console.log(error);
      }
    },

    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(money);
    },

    formatCurrency(m) {
      // Menghilangkan semua karakter kecuali angka
      // console.log(this.pembayaran_baru.jumlah_bayar);
      let value = this.pembayaran_baru.jumlah_bayar.replace(/[^\d]/g, "");
      
      // Mengubah string menjadi angka
      let number = parseInt(value, 10);

      // Memformat angka menjadi format rupiah
      let formattedValue = number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(m);

      // Memperbarui nilai input dengan format rupiah
      this.pembayaran_baru.jumlah_bayar = formattedValue;
      // return
    },

    doSomethingOnChange() {
      this.pembayaran_baru.bulan = moment(
        this.pembayaran_baru.tanggal_bayar
      ).format("MMMM");
    },

    async savePembayaran() {
      try {
        let dataPembayaran = await axios.post(
          `${ipBackend}/pembayaran/createPembayaranGabungan`,
          this.pembayaran_baru
        );
        let struk_baru = {
          nama_pelanggan: this.item_pelanggan.nama_pelanggan,
          kasir: this.item_user.nama_user,
          tanggal: moment(this.pembayaran_baru.tanggal_bayar).format(
            "DD/MM/YYYY"
          ),
          jam: moment(new Date()).format("HH:mm:ss"),
          jumlah_bayar: 0,
          uang_pembayaran: this.pembayaran_baru.jumlah_bayar,
          kembalian: this.susuk,
          data_struk: dataPembayaran.data.data,
        };
        console.log(struk_baru);

        for (let i = 0; i < struk_baru.data_struk.length; i++) {
          struk_baru.jumlah_bayar += struk_baru.data_struk[i].total_pembayaran
        }
        // console.log(struk_baru);
        this.pembayaran_baru.jumlah_bayar = 0;

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Berhasil melakukan pembayaran",
          showConfirmButton: false,
          timer: 3000,
        });

        this.getPelangganById();
        this.getTagihanByPelangganId();
        this.$router.push("/pembayaran/cari-pelanggan");
        
      } catch (error) {
        console.log(error);
      }
    },

    async cetakStruk() {
      try {
        const kirim_struk = await axios.post("http://localhost:4000/print", {
          struk_baru,
         });
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

p.identitas {
  font-size: 12px;
  font-weight: 300;
  font-family: Arial, Helvetica, sans-serif;
}

div.kartu-identitas {
  padding-bottom: 2px;
  font-size: 12px;
}

div.isi-tagihan {
  font-size: 12px;
}

div.head-form-bayar {
  text-align: center;
}

input.form-input-bayar {
  height: 50px;
  font-size: 30px;
  font-weight: bold;
}
</style>
