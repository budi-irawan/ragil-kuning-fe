<template>
  <div>
    <router-link to="/dashboard" class="btn btn-app">
      <i class="nav-icon fas fa-tachometer-alt"></i>
      <p>Dashboard</p>
    </router-link>
    <router-link to="/master/golongan-tarif" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-layer-group" class="nav-icon" />
      <p>Golongan Tarif</p>
    </router-link>
    <router-link to="/master/pelanggan" class="btn btn-app">
      <i class="nav-icon fa fa-users"></i>
      <p>Pelanggan</p>
    </router-link>
    <router-link to="/master/desa" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-map" class="nav-icon" />
      <p>Desa</p>
    </router-link>
    <router-link to="/master/dusun" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-map-location-dot" class="nav-icon" />
      <p>Dusun</p>
    </router-link>
    <router-link to="/master/tahun" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-calendar-plus" class="nav-icon" />
      <p>Tahun</p>
    </router-link>
    <router-link to="/pemakaian" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-faucet-drip" class="nav-icon" />
      <p>Pemakaian</p>
    </router-link>
    <router-link to="/pembayaran/cari-pelanggan" class="btn btn-app">
      <font-awesome-icon
        icon="fa-solid fa-hand-holding-dollar"
        class="nav-icon"
      />
      <p>Pembayaran</p>
    </router-link>

    <router-link to="/pembayaran/laporan-harian" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-file-lines" class="nav-icon"/>
      <p>Lap.Harian</p>
    </router-link>
    <router-link to="/pembayaran/laporan-detail" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-file-invoice" class="nav-icon"/>
      <p>Lap.Detail</p>
    </router-link>
    <router-link to="/pembayaran/laporan-excel" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-file-excel" class="nav-icon"/>
      <p>Laporan</p>
    </router-link>
    
    <router-link to="/pembayaran/laporan" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-book" class="nav-icon"/>
      <p>Settlement</p>
    </router-link>
    
    <router-link to="/user" class="btn btn-app">
      <font-awesome-icon icon="fa-solid fa-user-gear" class="nav-icon" />
      <p>User</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppTopBar",
  data() {
    return {
      item_user: {},
    };
  },

  mounted() {
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
      let t = localStorage.getItem("token");
      // console.log(t);
      try {
        const data_desa = await this.$axios.get(
          "http://localhost:3001/user/profil",
          {
            headers: {
              token: t,
            },
          }
        );
        // console.log(data_desa);
        let dd = data_desa.data.data;
        this.item_user = dd[0];
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>