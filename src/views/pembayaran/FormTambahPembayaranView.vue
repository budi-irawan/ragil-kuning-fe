<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-solid fa-paper-plane"></i>
                  Pembayaran Tagihan Air Pelanggan
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label
                        for="nama_pelanggan"
                        class="col-sm-4 col-form-label"
                        >Pelanggan</label
                      >
                      <div class="col-sm-8">
                        <select
                          class="form-control"
                          aria-label="Default select example"
                          v-model="pembayaran_baru.pelanggan_id"
                          @click="getPemakaianByPelangganId"
                        >
                          <option
                            v-for="rp in row_pelanggan"
                            :key="rp.pelanggan_id"
                            :value="rp.pelanggan_id"
                          >
                            {{ rp.nama_pelanggan }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />

                <div class="row mb-3">
                  <div class="col-md-6">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label
                          for="nama_pelanggan"
                          class="col-sm-4 col-form-label"
                          >Nama Pelanggan</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_pelanggan"
                            v-model="item_pelanggan.nama_pelanggan"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="alamat" class="col-sm-4 col-form-label"
                          >Alamat</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="alamat"
                            v-model="item_pelanggan.alamat"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="nomor_telepon"
                          class="col-sm-4 col-form-label"
                          >No.Telepon</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nomor_telepon"
                            v-model="item_pelanggan.nomor_telepon"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="nama_wilayah"
                          class="col-sm-4 col-form-label"
                          >Wilayah</label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_wilayah"
                            v-model="item_pelanggan.nama_wilayah"
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
                        <th scope="col" style="width: 10%">Tahun</th>
                        <th scope="col" style="width: 15%">Bulan</th>
                        <th scope="col" style="width: 12%">Total Pemakaian</th>
                        <th scope="col" style="width: 15%">Total Tarif</th>
                        <th scope="col" style="width: 20%">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="ip in item_pemakaian" :key="ip.pemakaian_id">
                        <td>{{ ip.no }}</td>
                        <td>{{ moment(ip.tanggal_input).format("YYYY") }}</td>
                        <td>{{ ip.bulan }}</td>
                        <td>{{ ip.selisih }}</td>
                        <td>{{ formatRupiah(ip.total_tarif) }}</td>
                        <td v-if="ip.status_pemakaian == 0">
                          <span class="badge badge-pill badge-warning"
                            >Belum Lunas</span
                          >
                        </td>
                        <td v-if="ip.status_pemakaian == 1">
                          <span class="badge badge-pill badge-success"
                            >Lunas</span
                          >
                        </td>
                      </tr>
                      <tr v-if="item_pemakaian.length==0">
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
  

<script>
import axios from "axios";
export default {
  name: "FormTambahPembayaranView",
  data() {
    return {
      item_pelanggan: {},
      row_pelanggan: [],
      item_pemakaian: [],

      pembayaran_baru: {
        pelanggan_id: "",
      },
    };
  },

  created() {
    this.getPelanggan();
    this.getPemakaianByPelangganId();
  },

  computed: {},

  methods: {
    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(money);
    },

    async getPelanggan() {
      try {
        const data_pelanggan = await axios.get(
          "http://localhost:3001/pelanggan/list"
        );
        let dp = data_pelanggan.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
        }
        this.row_pelanggan = dp;
      } catch (error) {
        console.log(error);
      }
    },

    async getPemakaianByPelangganId() {
      try {
        let pelanggan_id = this.pembayaran_baru.pelanggan_id;
        const data_pelanggan = await axios.get(
          `http://localhost:3001/pelanggan/detailsById/${pelanggan_id}`
        );
        this.item_pelanggan = data_pelanggan.data.data[0];
        const data_pemakaian = await axios.post(
          "http://localhost:3001/pemakaian/listPemakaianByPelangganId",
          { pelanggan_id }
        );

        let db = data_pemakaian.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        this.item_pemakaian = db;
        console.log(this.item_pemakaian);
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