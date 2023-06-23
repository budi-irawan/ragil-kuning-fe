<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/master/wilayah/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Wilayah
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Wilayah
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Wilayah</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_wilayah }}</td>
                        <td class="tombol">
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'EditWilayah',
                              params: { id: item.id },
                            }"
                          >
                            <i class="fas fa-solid fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deleteWilayah(item.id)"
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
export default {
  name: "ListWilayahView",
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getWilayah();
  },

  methods: {
    async getWilayah() {
      try {
        const data_wilayah = await axios.get(
          "http://localhost:3001/wilayah/list"
        );
        let dw = data_wilayah.data.data;
        for (let i = 0; i < dw.length; i++) {
          dw[i].no = i+1
        }
        this.items = dw
      } catch (error) {
        console.log(error);
      }
    },

    async deleteWilayah(id) {
      try {
        this.$swal({
          title: "Peringatan !",
          text: "Apakah anda yakin akan menghapus data dengan id " + id,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://localhost:3001/wilayah/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data wilayah berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getWilayah();
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