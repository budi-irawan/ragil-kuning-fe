<template>
  <aside class="main-sidebar sidebar-dark-primary">
    <router-link to="/dashboard" class="brand-link elevation-1">
      <img
        src="@/assets/logo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">ASA LTE 3</span>
    </router-link>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../../../public/user.png" class="img-circle elevation-1" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ item_user.nama_user }}</a>
        </div>
      </div>

      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-header">DASHBOARD</li>
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li v-if="isOwner || isAdmin" class="nav-header">MASTER</li>
          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/master/golongan-tarif" class="nav-link">
              <font-awesome-icon
                icon="fa-solid fa-layer-group"
                class="nav-icon"
              />
              <p>Golongan Tarif</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/master/pelanggan" class="nav-link">
              <i class="nav-icon fa fa-users"></i>
              <p>Pelanggan</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/master/desa" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-map" class="nav-icon" />
              <p>Desa</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/master/dusun" class="nav-link">
              <font-awesome-icon
                icon="fa-solid fa-map-location-dot"
                class="nav-icon"
              />
              <p>Dusun</p>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/master/tahun" class="nav-link">
              <font-awesome-icon
                icon="fa-solid fa-calendar-plus"
                class="nav-icon"
              />
              <p>Tahun</p>
            </router-link>
          </li>

          <li v-if="isOwner || isAdmin" class="nav-header">PEMAKAIAN</li>
          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/pemakaian/cetak-formulir" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-print" class="nav-icon" />
              <p>Cetak Formulir</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isOwner || isAdmin" to="/pemakaian" class="nav-link">
              <font-awesome-icon
                icon="fa-solid fa-faucet-drip"
                class="nav-icon"
              />
              <p>Data Pemakaian</p>
            </router-link>
          </li>

          <li class="nav-header">PEMBAYARAN</li>
          <li class="nav-item">
            <router-link v-if="isOwner || isKasir" to="/pembayaran/tagihan" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" class="nav-icon"/>
              <p>Tagihan</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="isOwner || isKasir" to="/pembayaran/laporan" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-book" class="nav-icon"/>
              <p>Settlement</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pembayaran/laporan-excel" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-file-excel" class="nav-icon"/>
              <p>Laporan</p>
            </router-link>
          </li>

          <li v-if="isOwner" class="nav-header">SETTING</li>
          <li class="nav-item">
            <router-link v-if="isOwner" to="/user" class="nav-link">
              <font-awesome-icon
                icon="fa-solid fa-user-gear"
                class="nav-icon"
              />
              <p>User Managemen</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "AppSideBar",
  data() {
    return {
      item_user: {},
    };
  },

  mounted() {
    // console.log("mounted");
    this.getDesa();
    // if (user) {
    //   this.$router.push("/dashboard")
    // }
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
    async getDesa() {
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

<style lang="scss">
</style>