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
            <div class="row pt-3">
              <!-- <div class="col-lg-3 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>150</h3>
  
                    <p>Total Pelanggan Aktif</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-users"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >Lihat <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>53<sup style="font-size: 20px">%</sup></h3>
  
                    <p>Total Wilayah</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-map"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >Lihat <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>44</h3>
  
                    <p>Total Pemakaian</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-faucet"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >Lihat <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div>
              <div class="col-lg-3 col-6">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>65</h3>
  
                    <p>Total Pelanggan Tidak Aktif</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-users-slash"></i>
                  </div>
                  <a href="#" class="small-box-footer"
                    >Lihat <i class="fas fa-arrow-circle-right"></i
                  ></a>
                </div>
              </div> -->
            </div>
  
            <div class="row">
              <div class="col">
                <div class="card card-outline card-primary">
                  <div class="card-header">
                    <h3 class="card-title">
                      <font-awesome-icon icon="fa-solid fa-faucet-drip" />
                      Pelanggan Belum Bayar 1 Bulan
                    </h3>
                  </div>
                  <div class="card-body pad table-responsive">
                    <div class="table-responsive-md" v-if="!loading">
                      <table class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 5%">No</th>
                            <th scope="col">Nama Pelanggan</th>
                            <th scope="col" style="width: 20%">Desa</th>
                            <th scope="col" style="width: 20%">Dusun</th>
                            <th scope="col" style="width: 20%">
                              Jumlah Pemakaian
                            </th>
                            <th scope="col" style="width: 15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="item in item_pemakaian_satu">
                            <tr
                              class="bg-info"
                              v-if="item.jumlah_bulan_tunggakan == 1"
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
                              </td>
                            </tr>
                            </template>
                          <template>
                            <tr v-if="item_pemakaian_satu.length == 0">
                              <td colspan="4">Belum ada pemakaian</td>
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
        </section>
      </div>
      <app-footer />
      <control-side-bar />
    </div>
  </template>
      
      
  <script>
  import axios from "axios";
  export default {
    name: "TunggakanSatuBulan",
  
    data() {
      return {
        item_user: {},
        loading: true,
        item_pemakaian_satu: [],
  
        loadingImage: require('../../../public/rolling.gif')
      };
    },
  
    mounted() {
      this.getUser();
      if (localStorage.getItem("reloaded")) {
        localStorage.removeItem("reloaded");
      } else {
        localStorage.setItem("reloaded", "1");
        location.reload();
      }
    },
  
    async created() {
      this.getUser();
      this.item_pemakaian_satu = await this.getPemakaian();
      this.loading = false
    },
  
    computed: {
      isOwner() {
        return this.item_user && this.item_user.role === "OWNER";
      },
      isAdmin() {
        return this.item_user && this.item_user.role === "ADMIN";
      },
      isKasir() {
        return this.item_user && this.item_user.role === "KASIR";
      },
    },
  
    methods: {
      async getUser() {
        let t = localStorage.getItem("token");
        try {
          const data_user = await this.$axios.get(
            "http://localhost:3001/user/profil",
            {
              headers: {
                token: t,
              },
            }
          );
  
          let dd = data_user.data.data;
          this.item_user = dd[0];
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
          let hasil = []
          for (let i = 0; i < db.length; i++) {
            if (db[i].jumlah_bulan_tunggakan == 1) {
                hasil.push(db[i])
            }
          }
          let result = []
          for (let j = 0; j < hasil.length; j++) {
            hasil[j].no = j + 1
            result.push(hasil[j])
          }
          return result
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
  </style>