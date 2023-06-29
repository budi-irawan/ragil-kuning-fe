<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/master/biaya/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Biaya
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Biaya
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive-md">
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col" style="width: 5%">No</th>
                          <th scope="col">Nama Biaya</th>
                          <th scope="col">Nominal Biaya</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in items" :key="item.id">
                          <td>{{ item.no }}</td>
                          <td>{{ item.nama_biaya }}</td>
                          <td>{{ formatRupiah(item.nominal_biaya) }}</td>
                          <td class="tombol">
                            <router-link
                              class="btn btn-sm btn-warning"
                              :to="{
                                name: 'EditBiaya',
                                params: { id: item.id },
                              }"
                            >
                              <i class="fas fa-solid fa-pen"></i>
                            </router-link>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger"
                              @click.prevent="deleteBiaya(item.id)"
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
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListBiayaView",
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getBiaya();
  },

  methods: {
    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(money);
    },

    async getBiaya() {
      try {
        const data_biaya = await axios.get("http://192.168.0.64:3001/biaya/list");
        let db = data_biaya.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i+1
          if (db[i].golongan_biaya == 1) {
            db[i].golongan = "Utama";
          } else if (db[i].golongan_biaya == 2) {
            db[i].golongan = "Tambahan";
          } else {
            db[i].golongan = "-";
          }
        }
        this.items = db;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBiaya(id) {
      try {
        const data_biaya = await axios.get(
          `http://192.168.0.64:3001/biaya/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text:
            "Apakah anda yakin akan menghapus data biaya '" +
            data_biaya.data.data[0].nama_biaya +
            "'?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://192.168.0.64:3001/biaya/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data biaya berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getBiaya();
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