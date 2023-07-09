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
                  <i class="fas fa-solid fa-paper-plane"></i>
                  Detail Pemakaian Air Pelanggan
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row">
                  <div class="col">
                    <div class="card bg-primary">
                      <div class="card-body pt-3">
                        <div class="row">
                          <div class="col-md-3">
                            <b>Nama Pelanggan: </b>
                            <p class="identitas">{{ item_pelanggan.nama_pelanggan }}</p>
                            <b>Alamat: </b>
                            <p class="identitas">{{ item_pelanggan.alamat }}</p>
                          </div>
                          <div class="col-md-3">
                            <b>No.Telepon: </b>
                            <p class="identitas">{{ item_pelanggan.nomor_telepon }}</p>
                            <b>Desa: </b>
                            <p class="identitas">{{ item_pelanggan.nama_desa }}</p>
                          </div>
                          <div class="col-md-3">
                            <b>Dusun: </b>
                            <p class="identitas">{{ item_pelanggan.nama_dusun }}</p>
                            <b>Golongan Tarif: </b>
                            <p class="identitas">{{ item_pelanggan.nama_golongan_tarif }}</p>
                          </div>
                          <div class="col-md-3">
                            <b>Tarif/m2: </b>
                            <p class="identitas">{{ item_pelanggan.nominal_tarif }}</p>
                            <b>Biaya Perawatan: </b>
                            <p class="identitas">{{ item_pelanggan.biaya_perawatan }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label
                          for="tanggal_input"
                          class="col-sm-4 col-form-label"
                          >Tanggal Input</label
                        >
                        <div class="col-sm-8">
                          <date-picker
                            v-model="pemakaian_baru.tanggal_input"
                            :config="options"
                            @dp-change="doSomethingOnChange"
                          ></date-picker>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="bulan" class="col-sm-4 col-form-label"
                          >Bulan</label
                        >
                        <div class="col-sm-8">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model="pemakaian_baru.bulan_id"
                            @change="getBulanById"
                          >
                            <option
                              v-for="row_bulan in item_bulan"
                              :key="row_bulan.bulan_id"
                              :value="row_bulan.bulan_id"
                            >
                              {{ row_bulan.nama_bulan }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="meter_akhir" class="col-sm-4 col-form-label"
                          >Meter Akhir</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="meter_akhir"
                            v-model.trim="$v.pemakaian_baru.meter_akhir.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pemakaian_baru.meter_akhir
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pemakaian_baru.meter_akhir.required"
                            class="invalid-feedback"
                          >
                            Meter akhir harus diisi
                          </div>
                          <div
                            v-if="!$v.pemakaian_baru.meter_akhir.numeric"
                            class="invalid-feedback"
                          >
                            Meter akhir harus berupa angka
                          </div>
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="col-sm-12">
                          <button
                          type="button"
                          class="btn btn-primary btn-block"
                          @click="savePemakaian"
                        >
                          <i class="fa fa-save"></i>
                          Simpan
                        </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div class="col-md-6">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="meter_awal" class="col-sm-4 col-form-label"
                          >Meter Awal</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="meter_awal"
                            v-model="pemakaian_baru.meter_awal"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="selisih" class="col-sm-4 col-form-label"
                          >Selisih</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="selisih"
                            v-model="total_selisih"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="total_tarif" class="col-sm-4 col-form-label"
                          >Total Tarif</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="total_tarif"
                            v-model="total_tarif"
                            disabled
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <hr />

                <div class="table-responsive-md">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col" style="width: 15%">Tanggal Input</th>
                        <th scope="col" style="width: 10%">Bulan</th>
                        <th scope="col" style="width: 12%">Meter Awal</th>
                        <th scope="col" style="width: 12%">Meter Akhir</th>
                        <th scope="col" style="width: 10%">Selisih</th>
                        <th scope="col" style="width: 15%">Total Tarif</th>
                        <th scope="col" style="width: 20%">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ip in item_pemakaian" :key="ip.pemakaian_id">
                        <td>{{ ip.no }}</td>
                        <td>{{ moment(ip.tanggal_input).format("LL") }}</td>
                        <td>{{ ip.nama_bulan }}</td>
                        <td>{{ ip.meter_awal }}</td>
                        <td>{{ ip.meter_akhir }}</td>
                        <td>{{ ip.selisih }}</td>
                        <td>{{ formatRupiah(ip.total_tarif) }}</td>
                        <td v-if="ip.sisa_pembayaran == 0">
                          <span class="badge badge-pill badge-success"
                            >Lunas</span
                          >
                        </td>
                        <td
                          v-if="
                            ip.sisa_pembayaran > 0 &&
                            ip.sisa_pembayaran < ip.total_tarif
                          "
                        >
                          <span class="badge badge-pill badge-warning"
                            >Belum Lunas</span
                          >
                        </td>
                        <td v-if="ip.sisa_pembayaran == ip.total_tarif">
                          <span class="badge badge-pill badge-info"
                            >Belum Dibayar</span
                          >
                        </td>
                      </tr>
                      <tr v-if="item_pemakaian.length == 0">
                        <td colspan="10">Belum ada pemakaian air</td>
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
import { required, numeric } from "vuelidate/lib/validators";
import moment from "moment";
export default {
  name: "DetailPemakaianView",
  data() {
    return {
      item_pelanggan: {},
      item_pemakaian: [],
      item_bulan: [],

      pemakaian_baru: {
        tanggal_input: "",
        nama_bulan: "",
        nomor_bulan: 0,
        meter_awal: 0,
        meter_akhir: 0,
        selisih: 0,
        nominal_tarif: 0,
        biaya_perawatan: 0,
        total_tarif: 0,
        nominal_denda: 0,
        pelanggan_id: "",
        bulan_id: "",
      },

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
    };
  },

  validations: {
    pemakaian_baru: {
      meter_akhir: { required, numeric },
    },
  },

  created() {
    this.getPemakaianByPelangganId();
    this.getPemakaianBulanLalu();
    this.getPelangganById();
    this.doSomethingOnChange();
    // this.getBulan();
    this.getBulanByPelangganId();
    this.getBulanById();
  },

  computed: {
    total_selisih: function () {
      let ml = Number(this.pemakaian_baru.meter_awal);
      let mk = Number(this.pemakaian_baru.meter_akhir);
      let ts = 0;
      if (!mk || mk < ml) {
        ts = 0;
      } else {
        if ((ml == 0 && mk > 0) || (ml > 0 && mk > ml)) {
          ts = mk - ml;
        } else {
          ts = ml - mk;
        }
      }
      this.pemakaian_baru.selisih = ts;
      return ts;
    },

    total_tarif: function () {
      let bp = Number(this.item_pelanggan.biaya_perawatan);
      let tt =
        Number(this.pemakaian_baru.selisih) *
          Number(this.item_pelanggan.nominal_tarif) +
        bp;
      this.pemakaian_baru.total_tarif = tt;
      return tt;
    },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getPelangganById() {
      try {
        const data_pelanggan = await axios.get(
          `http://localhost:3001/pelanggan/detailsById/${this.$route.params.id}`
        );
        this.item_pelanggan = data_pelanggan.data.data[0];
        
        this.pemakaian_baru.pelanggan_id =
          data_pelanggan.data.data[0].pelanggan_id;
        this.pemakaian_baru.nominal_tarif =
          data_pelanggan.data.data[0].nominal_tarif;
        this.pemakaian_baru.biaya_perawatan =
          data_pelanggan.data.data[0].biaya_perawatan;
        this.pemakaian_baru.nominal_denda =
          data_pelanggan.data.data[0].nominal_denda;
      } catch (error) {
        console.log(error, "eror satu");
      }
    },

    async savePemakaian() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(
          "http://localhost:3001/pemakaian/create",
          this.pemakaian_baru
        );

        this.$swal({
          icon: "success",
          title: "Data pemakaian berhasil ditambahkan",
          showConfirmButton: false,
          timer: 3000,
        });

        this.pemakaian_baru.tanggal_input = "";
        this.pemakaian_baru.bulan_id = "";
        this.pemakaian_baru.meter_akhir = 0;
        
        this.getPemakaianByPelangganId();
        this.getPemakaianBulanLalu();

      } catch (error) {
        console.log(error);
      }
    },

    async getPemakaianByPelangganId() {
      try {
        let pelanggan_id = this.$route.params.id;
        const data_pemakaian = await axios.post(
          "http://localhost:3001/pemakaian/listPemakaianByPelangganId",
          { pelanggan_id }
        );

        let db = data_pemakaian.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        this.item_pemakaian = db;
      } catch (error) {
        console.log(error);
      }
    },

    async getPemakaianBulanLalu() {
      try {
        let pelanggan_id = this.$route.params.id;
        const data_pemakaian = await axios.post(
          "http://localhost:3001/pemakaian/listPemakaianBulanLalu",
          { pelanggan_id }
        );

        if (data_pemakaian.length == 0) {
          this.pemakaian_baru.meter_awal = 0;
          this.pemakaian_baru.selisih =
            this.pemakaian_baru.meter_akhir - this.pemakaian_baru.meter_awal;
        } else {
          this.pemakaian_baru.meter_awal =
            data_pemakaian.data.data[0].meter_akhir;
          if (
            this.pemakaian_baru.meter_awal > this.pemakaian_baru.meter_akhir
          ) {
            this.pemakaian_baru.selisih =
              this.pemakaian_baru.meter_awal - this.pemakaian_baru.meter_akhir;
          } else {
            this.pemakaian_baru.selisih =
              this.pemakaian_baru.meter_akhir - this.pemakaian_baru.meter_awal;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    tampilFormTambah() {
      this.form_tambah = true;
    },

    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(money);
    },

    doSomethingOnChange() {
      this.pemakaian_baru.bulan = moment(
        this.pemakaian_baru.tanggal_input
      ).format("MMMM");
    },

    async getBulan() {
      try {
        const data_bulan = await axios.get("http://localhost:3001/bulan/list");
        let dd = data_bulan.data.data;
        for (let i = 0; i < dd.length; i++) {
          dd[i].no = i + 1;
        }
        this.item_bulan = dd;
      } catch (error) {
        console.log(error);
      }
    },

    async getBulanById() {
      try {
        let id = this.pemakaian_baru.bulan_id;
        const detail_bulan = await axios.get(
          "http://localhost:3001/bulan/detailsById/" + id
        );
        let db = detail_bulan.data.data[0];
        this.pemakaian_baru.nama_bulan = db.nama_bulan;
        this.pemakaian_baru.nomor_bulan = db.nomor_bulan;
      } catch (error) {
        console.log(error);
      }
    },

    async getBulanByPelangganId() {
      try {
        let pelanggan_id = this.$route.params.id;
        const data_bulan = await axios.post(
          "http://localhost:3001/bulan/listBulanByPelangganId",
          { pelanggan_id: pelanggan_id }
        );
        let db = data_bulan.data.data;
        this.item_bulan = db;
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
</style>