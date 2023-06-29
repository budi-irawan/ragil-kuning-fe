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
                  <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
                  Tagihan Pembayaran
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
                      <tr v-for="lp in filterPelanggan" :key="lp.pelanggan_id">
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
                      <tr>
                        <td colspan="5"><b>Total</b></td>
                        <td><b>{{ formatRupiah(total_tagihan) }}</b></td>
                        <td><b>{{ formatRupiah(total_terbayar) }}</b></td>
                      </tr>
                      <tr v-if="list_pembayaran.length==0">
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
  

<script>
import axios from "axios";
export default {
  name: "ListTagihan",
  data() {
    return {
      loading: true,
      list_pembayaran: [],

      search: "",
      desa_id: "",
      dusun_id: "",

      item_desa: [],
      item_dusun: [],

      total_tagihan: 0,
      total_terbayar: 0,

      loadingImage: require('../../../public/rolling.gif')
    };
  },

  async created() {
    this.getDesa();
    this.getDusunByDesaId();
    this.list_pembayaran = await this.getPembayaran();
    this.loading = false
  },

  computed: {
    filterPelanggan: function () {
      let filterDesa = this.desa_id;
      let filterDusun = this.dusun_id;
      let filterNama = this.search;
      return this.list_pembayaran.filter((p) => {
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
    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(money);
    },

    async getDesa() {
      try {
        const data_desa = await axios.get("http://192.168.0.64:3001/desa/list");
        this.item_desa = data_desa.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(
          `http://192.168.0.64:3001/dusun/listDusunByDesaId`,
          { desa_id: this.desa_id }
        );
        this.item_dusun = data_dusun.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getPembayaran() {
      try {
        const data_pembayaran = await axios.get(
          "http://192.168.0.64:3001/pembayaran/list"
        );
        let dp = data_pembayaran.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
          this.total_tagihan += dp[i].jumlah_tagihan
          this.total_terbayar += dp[i].jumlah_terbayar
        }
        return dp
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