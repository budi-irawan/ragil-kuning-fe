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
            <div class="card card-outline card-secondary">
              <!-- <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-faucet-drip" />
                  Input Pemakaian Air
                </h3>
              </div> -->
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="desa_id" class="col-sm-4 col-form-label"
                        >Desa</label
                      >
                      <div class="col-sm-8">
                        <select
                          class="form-control"
                          aria-label="Default select example"
                          @change="getDusunByDesaId()"
                          v-model="desa_id"
                        >
                          <option>--Desa--</option>
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
                  </div>
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="dusun_id" class="col-sm-4 col-form-label"
                        >Dusun</label
                      >
                      <div class="col-sm-8">
                        <select
                          class="form-control"
                          aria-label="Default select example"
                          v-model="dusun_id"
                        >
                          <option>--Dusun--</option>
                          <option
                            v-for="row_dusun in item_dusun"
                            :key="row_dusun.dusun_id"
                            :value="row_dusun.dusun_id"
                          >
                            {{ row_dusun.nama_dusun }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group row">
                      <button
                        class="btn btn-success"
                        @click="getPemakaianBulanLalu"
                      >
                        Lihat
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="tanggal_input" class="col-sm-4 col-form-label"
                        >Tanggal Input</label
                      >
                      <div class="col-sm-8">
                        <date-picker
                          v-model="tanggal_input"
                          :config="options"
                          @dp-change="doSomethingOnChange"
                        ></date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="bulan" class="col-sm-4 col-form-label"
                        >Bulan</label
                      >
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          id="bulan"
                          v-model="nama_bulan"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="table-responsive-md">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col" style="width: 20%">Nama Pelanggan</th>
                        <th scope="col" style="width: 10%">
                          Biaya/m<sup>3</sup>
                        </th>
                        <th scope="col" style="width: 15%">Biaya Perawatan</th>
                        <th scope="col" style="width: 12%">Meter Awal</th>
                        <th scope="col" style="width: 12%">Meter Akhir</th>
                        <th scope="col" style="width: 10%">Selisih</th>
                        <th scope="col" style="width: 20%">Jumlah Tarif</th>
                        <!-- <th scope="col" style="width: 10%">Kondisi</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="item in item_pemakaian">
                        <tr :key="item.pelanggan_id">
                          <td>{{ item.no }}</td>
                          <td>{{ item.nama_pelanggan }}</td>
                          <td>{{ item.nominal_tarif }}</td>
                          <td>{{ item.biaya_perawatan }}</td>
                          <td>{{ item.bulan_lalu }}</td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              v-model="item.meter_akhir"
                            />
                          </td>
                          <td>
                            {{
                              item.meter_akhir > item.bulan_lalu
                                ? item.meter_akhir - item.bulan_lalu
                                : 0
                            }}
                          </td>
                          <td>
                            {{
                              item.meter_akhir > item.bulan_lalu
                                ? item.nominal_tarif *
                                    (item.meter_akhir - item.bulan_lalu) +
                                  item.biaya_perawatan
                                : item.biaya_perawatan
                            }}
                          </td>
                          <td>
                            <!-- <input class="form-control" type="checkbox" name="kondisi" v-model="item.kondisi" checked> -->
                          </td>
                        </tr>
                      </template>
                      <template>
                        <tr v-if="item_pemakaian.length == 0">
                          <td colspan="8">Belum ada pemakaian</td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
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
  name: "InputPemakaian",
  data() {
    return {
      item_pemakaian: [],
      kondisi: true,

      desa_id: "",
      dusun_id: "",

      item_desa: [],
      item_dusun: [],

      tanggal_input: "",
      bulan_id: "",
      nama_bulan: "",
      nomor_bulan: 0,

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
    };
  },

  async created() {
    this.getDesa();
    this.getDusunByDesaId();
    this.getPemakaianBulanLalu();
  },

  computed: {},

  mounted() {},

  methods: {
    async doSomethingOnChange() {
      if (this.tanggal_input) {
        const data_bulan = await axios.post(
          `${ipBackend}/pemakaian/getBulanByTanggalInput`,
          { tanggal_input: this.tanggal_input }
        );
        this.bulan_id = data_bulan.data.data[0].bulan_id;
        this.nama_bulan = data_bulan.data.data[0].nama_bulan;
        this.nomor_bulan = data_bulan.data.data[0].nomor_bulan;
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
        const data_dusun = await axios.post(
          `${ipBackend}/dusun/listDusunByDesaId`,
          { desa_id: this.desa_id }
        );
        this.item_dusun = data_dusun.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getPemakaianBulanLalu() {
      try {
        const dataPemakaian = await axios.post(
          `${ipBackend}/pemakaian/getPemakaianBulanLalu`,
          { dusun_id: this.dusun_id }
        );
        let dp = dataPemakaian.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
        }
        this.item_pemakaian = dp;
      } catch (error) {
        console.log(error);
      }
    },

    async savePemakaian() {
      let bulk_pemakaian = this.item_pemakaian;
      for (let i = 0; i < bulk_pemakaian.length; i++) {
        bulk_pemakaian[i].meter_awal = bulk_pemakaian[i].bulan_lalu;
        let selisih = Number(bulk_pemakaian[i].meter_akhir) - bulk_pemakaian[i].bulan_lalu;
        let total_tarif = selisih * bulk_pemakaian[i].nominal_tarif + bulk_pemakaian[i].biaya_perawatan;
        bulk_pemakaian[i].selisih = selisih;
        bulk_pemakaian[i].meter_akhir = Number(bulk_pemakaian[i].meter_akhir);
        bulk_pemakaian[i].total_tarif = total_tarif;
        bulk_pemakaian[i].sisa_pembayaran = total_tarif;
      }
      
      await axios.post(`${ipBackend}/pemakaian/createBulk`, {
        tanggal_input: this.tanggal_input,
        bulan_id: this.bulan_id,
        nama_bulan: this.nama_bulan,
        nomor_bulan: this.nomor_bulan,
        bulk_pemakaian,
      });

      this.$swal({
        icon: "success",
        title: "Data pemakaian berhasil ditambahkan",
        showConfirmButton: false,
        timer: 3000,
      });

      this.tanggal_input = ""
      this.desa_id = ""
      this.dusun_id = ""

      this.$router.push("/pemakaian");
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