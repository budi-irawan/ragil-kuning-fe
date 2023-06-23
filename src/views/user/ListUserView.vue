<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/user/register">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data User
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon
                    icon="fa-solid fa-user-gear"
                    class="nav-icon"
                  />
                  Data User
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive" v-if="!loading">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama User</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.dusun_id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_user }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.role }}</td>
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
                <div v-else class="row">
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
  name: "ListUserView",
  data() {
    return {
      loading: true,
      items: [],
      loadingImage: require('../../../public/rolling.gif')
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

  async created() {
    this.items = await this.getUser();
    this.loading = false
  },

  methods: {
    async getUser() {
      try {
        const data_user = await axios.get("http://localhost:3001/user/list", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        let dd = data_user.data.data;
        for (let i = 0; i < dd.length; i++) {
          dd[i].no = i + 1;
        }
        return dd
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDusun(id) {
      try {
        const data_user = await axios.get(
          `http://localhost:3001/user/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text:
            "Apakah anda yakin akan menghapus data user " +
            data_user.data.data[0].nama_user +
            "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://localhost:3001/user/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data user berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getUser();
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
.load {
  padding-left: 50%;
}
</style>