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
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/master/dusun/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Dusun
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Dusun
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Dusun</th>
                        <th scope="col">Desa</th>
                        <th scope="col">Tgl.Jatuh Tempo</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.dusun_id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_dusun }}</td>
                        <td>{{ item.nama_desa }}</td>
                        <td>{{ item.tanggal_jatuh_tempo }}</td>
                        <td class="tombol">
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'edit-dusun',
                              params: { id: item.dusun_id },
                            }"
                          >
                            <i class="fas fa-solid fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deleteDusun(item.dusun_id)"
                          >
                            <i class="fas fa-trash" style="color: white"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
  name: "ListDusunView",
  data() {
    return {
      items: [],
    };
  },

  mounted() {
    // console.log('mounted');
    // let user = localStorage.getItem('token')
    // console.log(user);
    // this.token = user
    // if (user) {
    //   this.$router.push("/dashboard")
    // }
  },

  created() {
    this.getDusun();
  },

  methods: {
    async getDusun() {
      try {
        const data_dusun = await axios.get(
          "http://localhost:3001/dusun/list"
        );
        let dd = data_dusun.data.data;
        for (let i = 0; i < dd.length; i++) {
          dd[i].no = i+1
        }
        this.items = dd
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDusun(id) {
      try {
        const data_dusun = await axios.get(
          `http://localhost:3001/dusun/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text: "Apakah anda yakin akan menghapus data dusun " + data_dusun.data.data[0].nama_dusun + "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://localhost:3001/dusun/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data dusun berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getDusun();
        });
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