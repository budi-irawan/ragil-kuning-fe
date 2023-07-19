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
            <router-link class="btn btn-primary" to="/master/golongan-tarif/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Golongan Tarif
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <font-awesome-icon icon="fa-solid fa-layer-group" />
                  Data Golongan Tarif
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive-md">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Golongan</th>
                        <th scope="col">Tarif /m3</th>
                        <th scope="col">Biaya Perawatan</th>
                        <th scope="col">Denda</th>
                        <th scope="col" style="width: 25%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in item_golongan_tarif" :key="item.id">
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_golongan_tarif }}</td>
                        <td>{{ formatRupiah(item.nominal_tarif) }}</td>
                        <td>{{ formatRupiah(item.biaya_perawatan) }}</td>
                        <td>{{ formatRupiah(item.nominal_denda) }}</td>
                        <td class="tombol">
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'edit-golongan-tarif',
                              params: { id: item.id },
                            }"
                          >
                            <i class="fas fa-solid fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deleteGolonganTarif(item.id)"
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
  name: "ListGolonganTarifView",
  data() {
    return {
      item_golongan_tarif: [],

      pilih_golongan_tarif: {},
    };
  },

  created() {
    this.getGolonganTarif();
    this.getGolonganTarifById();
  },

  methods: {
    formatRupiah(money) {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(money);
    },

    async getGolonganTarif() {
      try {
        const data_golongan_tarif = await axios.get(`${ipBackend}/golongan_tarif/list`);

        let db = data_golongan_tarif.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        this.item_golongan_tarif = db;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteGolonganTarif(id) {
      try {
        const data_golongan_tarif = await axios.get(
          `${ipBackend}/golongan_tarif/detailsById/${id}`
        );
        
          this.$swal({
            title: "Peringatan !",
            text:
              "Apakah anda yakin akan menghapus data golongan tarif '" +
              data_golongan_tarif.data.data[0].nama_golongan_tarif +
              "'?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
          }).then(async (hasil) => {
            if (hasil.isConfirmed == true) {
              await axios.post(`${ipBackend}/golongan_tarif/delete`, { id });
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Data golongan tarif berhasil dihapus",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            this.getGolonganTarif();
          });
        
      } catch (error) {
        console.log(error);
      }
    },

    async getGolonganTarifById(id) {
      try {
        const data_golongan_tarif = await axios.get(
          `${ipBackend}/golongan_tarif/detailsById/` + id
        );

        this.pilih_golongan_tarif = data_golongan_tarif.data.data[0];
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