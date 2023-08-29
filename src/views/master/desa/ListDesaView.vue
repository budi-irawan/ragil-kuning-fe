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
            <router-link class="btn btn-primary" to="/master/desa/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Desa
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Desa
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Desa</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_desa }}</td>
                        <td class="tombol">
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
                            @click.prevent="deleteDesa(item.id)"
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
import { ipBackend } from '@/ipBackend';
import axios from "axios";
export default {
  name: "ListDesaView",
  data() {
    return {
      items: [],
    };
  },

  mounted() {
    this.getDesa();
  },

  created() {
    this.getDesa();
  },

  methods: {
    async getDesa() {
      let t = localStorage.getItem('token')
      try {
        const data_desa = await axios.get(
          `${ipBackend}/desa/list`, {
            headers: {
              token: t
            }
          }
        );
        let dd = data_desa.data.data;
        for (let i = 0; i < dd.length; i++) {
          dd[i].no = i+1
        }
        this.items = dd
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDesa(id) {
      try {
        const data_desa = await axios.get(
          `${ipBackend}/desa/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text: "Apakah anda yakin akan menghapus data desa " + data_desa.data.data[0].nama_desa + "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post(`${ipBackend}/desa/delete`, { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data desa berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getDesa();
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