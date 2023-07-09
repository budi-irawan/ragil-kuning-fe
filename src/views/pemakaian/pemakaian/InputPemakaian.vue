<template>
  <div>
    <app-nav-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row mt-1 mb-3">
          <app-top-bar />
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-secondary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-faucet-drip" />
                  Input Pemakaian Air
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="form-group row">
                      <label for="desa_id" class="col-sm-3 col-form-label">Desa</label>
                      <div class="col-sm-9">
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
                      <label for="dusun_id" class="col-sm-3 col-form-label">Dusun</label>
                      <div class="col-sm-9">
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
                      <button class="btn btn-success" @click="getPemakaianBulanLalu">Lihat</button>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="tanggal_input">Tanggal Input</label>
                      <!-- <date-picker
                        v-model="pemakaian_baru.tanggal_input"
                        :config="options"
                        @dp-change="doSomethingOnChange"
                        @click="getBulanByTanggalInput"
                      ></date-picker> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="bulan">Bulan</label>
                      <input
                        type="text"
                        class="form-control"
                        id="bulan"
                      />
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
                        <th scope="col" style="width: 10%">Biaya/m<sup>3</sup></th>
                        <th scope="col" style="width: 15%">Biaya Perawatan</th>
                        <th scope="col" style="width: 12%">Meter Awal</th>
                        <th scope="col" style="width: 12%">Meter Akhir</th>
                        <th scope="col" style="width: 10%">Selisih</th>
                        <th scope="col" style="width: 20%">Jumlah Tarif</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(item) in item_pemakaian">
                        <tr :key="item.pelanggan_id">
                          <td>{{ item.no }}</td>
                          <td>{{ item.nama_pelanggan }}</td>
                          <td>{{ item.nominal_tarif }}</td>
                          <td>{{ item.biaya_perawatan }}</td>
                          <td>{{ item.bulan_lalu }}</td>
                          <td><input type="text" class="form-control" v-model="item.meter_akhir" ></td>
                          <td>{{ item.meter_akhir - item.bulan_lalu }}</td>
                          <td>{{ item.nominal_tarif * (item.meter_akhir - item.bulan_lalu) + item.biaya_perawatan }}</td>
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
    
  
<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "InputPemakaian",
  data() {
    return {
      item_pemakaian: [],

      desa_id: "",
      dusun_id: "",

      item_desa: [],
      item_dusun: [],

      bulk_pemakaian: [],

      options: {
        format: "YYYY-MM-DD",
        useCurrent: false,
      },
      
    };
  },

  async created() {
    this.getDesa();
    this.getDusunByDesaId();
    // this.getBulanByTanggalInput();
    // this.getPemakaianBulanLalu();
  },

  computed: {
    selisih: function () {
      let data1 = this.bulk_pemakaian
      console.log(data1);
      return
    },

  },

  mounted() {
  },

  methods: {
    // doSomethingOnChange() {
    //   this.pemakaian_baru.nama_bulan = moment(
    //     this.pemakaian_baru.tanggal_input
    //   ).format("MMMM");
    // },

    async getDesa() {
      try {
        const data_desa = await axios.get("http://localhost:3001/desa/list");
        this.item_desa = data_desa.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(
          `http://localhost:3001/dusun/listDusunByDesaId`,
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
          `http://localhost:3001/pemakaian/getPemakaianBulanLalu`,
          { dusun_id: this.dusun_id }
        );
        let dp = dataPemakaian.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1

          this.bulk_pemakaian.push(dp[i])
        }
        this.item_pemakaian = dp
      } catch (error) {
        console.log(error);
      }
    },

    async getPemakaian() {
      try {
        const data_pemakaian = await axios.get(
          "http://localhost:3001/pemakaian/list"
        );

        let db = data_pemakaian.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        return db;
      } catch (error) {
        console.log(error);
      }
    },

    async getBulanByTanggalInput() {
      try {
        console.log(this.pemakaian_baru.tanggal_input);
        const data_bulan = await axios.post(
          `http://localhost:3001/pemakaian/getBulanByTanggalInput`,
          { tanggal_input: this.pemakaian_baru.tanggal_input }
        );
        // console.log(data_bulan.data.data);
      } catch (error) {
        console.log(error);
      }
    },

    savePemakaian() {
      let hasil = this.bulk_pemakaian
      for (let j = 0; j < hasil.length; j++) {
        console.log(hasil[j]);

      }
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
</style>