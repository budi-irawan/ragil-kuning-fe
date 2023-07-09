<template>
    <div>
      <app-nav-bar />
      <div class="content-wrapper">
        <router-view />
        <section class="content">
          <div class="container-fluid pt-3">
            <div class="row mt-1 mb-2">
              <app-top-bar />
            </div>
            <div class="row pt-2">
              <div class="col-lg-4 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{{ jumlah_tunggakan_satu_bulan }}</h3>
  
                    <p>Pelanggan Nunggak 1 Bulan</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-users"></i>
                  </div>
                  <router-link to="/tunggakan/satu-bulan" class="small-box-footer">
                    Lihat <i class="fas fa-arrow-circle-right"></i
                  ></router-link>
                </div>
              </div>
              <div class="col-lg-4 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>{{ jumlah_tunggakan_dua_bulan }}</h3>
  
                    <p>Pelanggan Nunggak 2 Bulan</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-users"></i>
                  </div>
                  <router-link to="/tunggakan/dua-bulan" class="small-box-footer">
                    Lihat <i class="fas fa-arrow-circle-right"></i
                  ></router-link>
                </div>
              </div>
              <div class="col-lg-4 col-6">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>{{ jumlah_tunggakan_tiga_bulan }}</h3>
  
                    <p>Pelanggan Nunggak 3 Bulan</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-solid fa-users-slash"></i>
                  </div>
                  <router-link to="/tunggakan/tiga-bulan" class="small-box-footer">
                    Lihat <i class="fas fa-arrow-circle-right"></i
                  ></router-link>
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
    name: "DashboardView",
  
    data() {
      return {
        item_user: {},
        loading: true,
        item_pemakaian: [],

        jumlah_tunggakan_satu_bulan: 0,
        jumlah_tunggakan_dua_bulan: 0,
        jumlah_tunggakan_tiga_bulan: 0,
  
        loadingImage: require('../../public/rolling.gif')
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
      this.item_pemakaian = await this.getPemakaian();
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
          let satu = []
          let dua = []
          let tiga = []
          for (let i = 0; i < db.length; i++) {
            if (db[i].jumlah_bulan_tunggakan == 1) {
              satu.push(db[i])
            }
            if (db[i].jumlah_bulan_tunggakan == 2) {
              dua.push(db[i])
            }
            if (db[i].jumlah_bulan_tunggakan == 3) {
              tiga.push(db[i])
            }
          }
          this.jumlah_tunggakan_satu_bulan += satu.length
          this.jumlah_tunggakan_dua_bulan += dua.length
          this.jumlah_tunggakan_tiga_bulan += tiga.length
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
  </style>