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
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-file-excel"/>
                  Laporan Pembayaran
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="downloadLaporan">
                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Bulan<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            @change="getTahun()"
                            v-model="bulan_baru.bulan_id"
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

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Tahun<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_tahun"
                            v-model="bulan_baru.nama_tahun"
                            disabled
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Desa<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            @change="getDusunByDesaId()"
                            v-model="formulir_baru.desa_id"
                          >
                            <option
                              v-for="row_desa in item_desa"
                              :key="row_desa.id"
                              :value="row_desa.id"
                            >
                              {{ row_desa.nama_desa }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" class="btn btn-primary">
                        <font-awesome-icon icon="fa-solid fa-download" />
                        Download Laporan
                      </button>
                    </form>
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
export default {
  name: "LaporanPembayaranBulanan",
  data() {
    return {
      data_laporan: [],
      item_desa: [],
      item_dusun: [],
      item_bulan: [],

      bulan_baru: {
        bulan_id: "",
        nama_tahun: ""
      },

      formulir_baru: {
        bulan_id: "",
        nama_tahun: "",
        desa_id: "",
        dusun_id: ""
      },

    };
  },

  async created() {
    this.data_laporan = await this.getLaporanBulanan();
    this.getDesa();
    this.getBulan();
    this.getTahun();
    this.getDusunByDesaId();
  },

  computed: {
    filterLaporan: function () {
      let filterBulan = this.formulir_baru.bulan_id;
      let filterDesa = this.formulir_baru.desa_id;
      return this.data_laporan.filter((p) => {
        let filtered = true;
        if (filterDesa) {
          filtered = p.desa_id == filterDesa;
        }
        if (filtered) {
          if (filterBulan) {
            filtered = p.bulan_id == filterBulan;
          }
        }
        return filtered;
      });
    },
  },

  methods: {
    async getBulan() {
      try {
        const data_bulan = await axios.get(
          `${ipBackend}/bulan/list`
        );
        let db = data_bulan.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i+1
        }
        this.item_bulan = db
      } catch (error) {
        console.log(error);
      }
    },

    async getTahun() {
      try {
        let bulan_id = this.bulan_baru.bulan_id
        const data_bulan = await axios.get(`${ipBackend}/bulan/detailsById/`+bulan_id);
        let db = data_bulan.data.data[0];
        this.bulan_baru.nama_tahun = db.nama_tahun
        this.formulir_baru.bulan_id = db.bulan_id
        this.formulir_baru.nama_tahun = db.nama_tahun
      } catch (error) {
        console.log(error);
      }
    },

    async getLaporanBulanan() {
      try {
        const result = await axios.post(`${ipBackend}/pembayaran/laporanPembayaranPerBulan`, { bulan_id: this.formulir_baru.bulan_id, desa_id: this.formulir_baru.desa_id });
        let db = result.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        return db
      } catch (error) {
        console.log(error);
      }
    },

    async getDesa() {
      try {
        const data_desa = await axios.get(`${ipBackend}/desa/list`);
        this.item_desa = data_desa.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(`${ipBackend}/dusun/listDusunByDesaId`,{ desa_id: this.formulir_baru.desa_id });
        this.item_dusun = data_dusun.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async downloadLaporan() {
      try {
        window.open(`${ipBackend}/pembayaran/laporanPembayaranPerBulanExcel?bulan_id=${this.formulir_baru.bulan_id}&&desa_id=${this.formulir_baru.desa_id}`);
        this.formulir_baru.bulan_id = ""
        this.formulir_baru.tahun_id = ""
        this.formulir_baru.desa_id = ""
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