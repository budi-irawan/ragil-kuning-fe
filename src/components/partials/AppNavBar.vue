<template>
  <nav class="main-header navbar navbar-expand navbar-dark shadow-sm">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><b>ASA Ragil Kuning</b></a
        >
      </li>
    </ul>

    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link">Home</router-link>
      </li>
      
      <li class="nav-item dropdown">
        <a
          id="dropdownSubMenu1"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          class="nav-link dropdown-toggle"
          >Master</a
        >
        <ul
          aria-labelledby="dropdownSubMenu1"
          class="dropdown-menu border-0 shadow"
        >
          <li><router-link to="/master/golongan-tarif" class="dropdown-item">Golongan Tarif</router-link></li>
          <li><router-link to="/master/pelanggan" class="dropdown-item">Pelanggan</router-link></li>
          <li><router-link to="/master/desa" class="dropdown-item">Desa</router-link></li>
          <li><router-link to="/master/dusun" class="dropdown-item">Dusun</router-link></li>
          <li><router-link to="/master/tahun" class="dropdown-item">Tahun</router-link></li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          id="dropdownSubMenu1"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          class="nav-link dropdown-toggle"
          >Transaksi</a
        >
        <ul
          aria-labelledby="dropdownSubMenu1"
          class="dropdown-menu border-0 shadow"
        >
          <li><router-link to="/pembayaran/cari-pelanggan" class="dropdown-item">Pembayaran</router-link></li>
          <li><router-link to="/pemakaian" class="dropdown-item">Pemakaian</router-link></li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          id="dropdownSubMenu1"
          href="#"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          class="nav-link dropdown-toggle"
          >Laporan</a
        >
        <ul
          aria-labelledby="dropdownSubMenu1"
          class="dropdown-menu border-0 shadow"
        >
          <li><router-link to="/pembayaran/laporan-harian" class="dropdown-item">Laporan Harian</router-link></li>
          <li><router-link to="/pembayaran/laporan-detail" class="dropdown-item">Laporan Detail</router-link></li>
          <li><router-link to="/pembayaran/laporan-excel" class="dropdown-item">Laporan Pembayaran</router-link></li>
        </ul>
      </li>

      <li class="nav-item">
        <router-link to="/pembayaran/laporan" class="nav-link">Settlement</router-link>
      </li>

      <li class="nav-item">
        <router-link to="/user" class="nav-link">User</router-link>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a href="javascript:void(0)" class="nav-link">{{
          item_user.username
        }}</a>
      </li>
      <li class="nav-item">
        <a href="javascript:void(0)" class="nav-link" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
const { ipBackend } = require("../../ipBackend")
export default {
  name: "AppNavBar",

  data() {
    return {
      item_user: {},
    };
  },

  mounted() {
    let user = localStorage.getItem("token");
    if (!user) {
      this.$router.push("/");
    }
    this.getUser();
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
      let data_token = localStorage.getItem("token");
      try {
        const data_user = await this.$axios.get(
          `${ipBackend}/user/profil`,
          {
            headers: {
              token: data_token,
            },
          }
        );
        let dd = data_user.data.data;
        this.item_user = dd[0];
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      try {
        this.$swal({
          title: "Konfirmasi",
          text: "Apakah anda yakin akan keluar dari aplikasi ?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, keluar!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            localStorage.clear();
            this.$router.push("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
</style>