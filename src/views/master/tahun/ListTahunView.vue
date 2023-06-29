<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/master/tahun/tambah-tahun">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Tahun
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Tahun
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Tahun</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_tahun }}</td>
                        <td v-if="item.status_tahun == 0">
                          <span class="badge badge-pill badge-info"
                            >Tidak Aktif</span
                          >
                        </td>
                        <td v-if="item.status_tahun == 1">
                          <span class="badge badge-pill badge-success"
                            >Aktif</span
                          >
                        </td>
                        <td class="tombol">
                          <button
                            v-if="item.status_tahun == 0"
                            type="button"
                            class="btn btn-sm btn-success"
                            @click.prevent="aktifkanTahun(item.id)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Aktifkan tahun"
                          >
                            <i class="fas fa-solid fa-check"></i>
                          </button>
                          <button
                            v-else
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="nonAktifkanTahun(item.id)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Nonaktifkan tahun"
                          >
                            <i class="fas fa-solid fa-unlock"></i>
                          </button>
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'edit-desa',
                              params: { id: item.id },
                            }"
                          >
                            <i class="fas fa-solid fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deleteTahun(item.id)"
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>

<script>
import axios from "axios";
// import authHeader from "@/views/auth/auth_header";
export default {
  name: "ListTahunView",
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
    this.getTahun();
  },

  methods: {
    async getTahun() {
      let t = localStorage.getItem('token')
      // console.log(t);
      try {
        const data_tahun = await axios.get(
          "http://192.168.0.64:3001/tahun/list", {
            headers: {
              token: t
            }
          }
        );
        let dd = data_tahun.data.data;
        for (let i = 0; i < dd.length; i++) {
          dd[i].no = i+1
        }
        this.items = dd
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTahun(id) {
      try {
        const data_tahun = await axios.get(
          `http://192.168.0.64:3001/tahun/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text: "Apakah anda yakin akan menghapus data tahun " + data_tahun.data.data[0].nama_tahun + "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://192.168.0.64:3001/tahun/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data tahun berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getTahun();
        });
      } catch (error) {
        console.log(error);
      }
    },

    async aktifkanTahun(id) {
      try {
        const tahun = await axios.get(
          "http://192.168.0.64:3001/tahun/detailsById/" + id
        );

        let cek = await axios.post(
          "http://192.168.0.64:3001/tahun/aktifkantahun",
          tahun.data.data[0]
        );
        if (cek.data.status == 204) {
          this.$swal({
            title: "Peringatan",
            text: "Sudah ada tahun yang aktif",
            icon: "warning",
            confirmButtonColor: "#3085d6",
          });
        } else {
          this.$swal({
            icon: "success",
            title: "Sukses",
            text: "Data tahun berhasil diaktifkan",
            showConfirmButton: false,
            timer: 3000,
          });
        }
        this.getTahun();
      } catch (error) {
        console.log(error);
      }
    },

    async nonAktifkanTahun(id) {
      try {
        const tahun = await axios.get(
          "http://192.168.0.64:3001/tahun/detailsById/" + id
        );

        this.$swal({
          title: "Peringatan !",
          text:
            "Apakah anda yakin akan menonaktifkan data tahun '" +
            tahun.data.data[0].nama_tahun +
            "'?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Nonaktifkan!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post(
              "http://192.168.0.64:3001/tahun/nonAktifkanTahun",
              tahun.data.data[0]
            );
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data tahun berhasil dinonaktifkan",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getTahun();
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