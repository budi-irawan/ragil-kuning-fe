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
                  <font-awesome-icon icon="fa-solid fa-faucet-drip" />
                  Data Pemakaian Air
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-outline">
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
                  <div class="col-md-6">
                    <div class="form-outline">
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
                <div class="row mb-3">
                  <div class="col">
                    <div class="form-outline">
                      <input
                        type="text"
                        v-model="search"
                        autofocus
                        class="form-control"
                        placeholder="Cari pelanggan "
                        aria-label="Search"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="table-responsive-md" v-if="!loading">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Pelanggan</th>
                        <th scope="col" style="width: 20%">Desa</th>
                        <th scope="col" style="width: 20%">Dusun</th>
                        <th scope="col" style="width: 20%">Jumlah Pemakaian</th>
                        <th scope="col" style="width: 15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="item in filterPelanggan">
                        <tr
                          class="bg-danger"
                          v-if="item.jumlah_bulan_tunggakan >= 3"
                          :key="item.pelanggan_id"
                        >
                          <td>{{ item.no }}</td>
                          <td>{{ item.nama_pelanggan }}</td>
                          <td>{{ item.nama_desa }}</td>
                          <td>{{ item.nama_dusun }}</td>
                          <td>{{ item.total_pemakaian }}</td>
                          <td class="tombol">
                            <router-link
                              class="btn btn-sm btn-success btn-sm"
                              :to="{
                                name: 'detail-pemakaian',
                                params: { id: item.pelanggan_id },
                              }"
                            >
                              <i class="fas fa-solid fa-eye"></i>
                            </router-link>
                            <button
                              type="button"
                              class="btn btn-primary btn-sm"
                              title="Cetak surat peringatan"
                              @click="cetakSuratPeringatan(item.pelanggan_id)"
                            >
                              <font-awesome-icon icon="fa-solid fa-print" />
                            </button>
                          </td>
                        </tr>

                        <tr v-else :key="item.pelanggan_id">
                          <td>{{ item.no }}</td>
                          <td>{{ item.nama_pelanggan }}</td>
                          <td>{{ item.nama_desa }}</td>
                          <td>{{ item.nama_dusun }}</td>
                          <td>{{ item.total_pemakaian }}</td>
                          <td class="tombol">
                            <router-link
                              class="btn btn-sm btn-success"
                              :to="{
                                name: 'detail-pemakaian',
                                params: { id: item.pelanggan_id },
                              }"
                            >
                              <i class="fas fa-solid fa-eye"></i>
                            </router-link>
                          </td>
                        </tr>
                      </template>
                      <template>
                        <tr v-if="item_pemakaian.length == 0">
                          <td colspan="4">
                            Belum ada pemakaian
                          </td>
                        </tr>
                      </template>
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
  

<script>
import axios from "axios";
export default {
  name: "ListPemakaianView",
  data() {
    return {
      loading: true,
      item_pemakaian: [],
      
      search: "",
      desa_id: "",
      dusun_id: "",

      item_desa: [],
      item_dusun: [],

      loadingImage: require('../../../../public/rolling.gif')
    };
  },

  async created() {
    this.getDesa();
    this.getDusunByDesaId();
    this.item_pemakaian = await this.getPemakaian();
    this.loading = false
  },

  computed: {
    filterPelanggan: function () {
      let filterDesa = this.desa_id;
      let filterDusun = this.dusun_id;
      let filterNama = this.search;
      return this.item_pemakaian.filter((p) => {
        let filtered = true;
        if (filterDesa) {
          filtered = p.desa_id == filterDesa;
        }
        if (filtered) {
          if (filterDusun) {
            filtered = p.dusun_id == filterDusun;
          }
        }
        if (filtered) {
          if (filterNama) {
            filtered = p.nama_pelanggan.toLowerCase().match(filterNama);
          }
        }
        return filtered;
      });
    },

  },

  methods: {
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

    async getPemakaian() {
      try {
        const data_pemakaian = await axios.get(
          "http://localhost:3001/pemakaian/list"
        );

        let db = data_pemakaian.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        return db
      } catch (error) {
        console.log(error);
      }
    },

    async cetakSuratPeringatan(pelanggan_id) {
      try {
        window.open("http://localhost:3001/pembayaran/cetakSuratPeringatan/" + pelanggan_id)
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