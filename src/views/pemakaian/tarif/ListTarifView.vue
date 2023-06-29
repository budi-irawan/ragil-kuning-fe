<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/pemakaian/tarif/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Tarif
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Tarif /m3
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="table-responsive-md">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nominal Tarif</th>
                        <th scope="col" style="width: 25%">Status</th>
                        <th scope="col" style="width: 25%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td>{{ item.no }}</td>
                        <td>
                          {{
                            "Rp " +
                            item.nominal_tarif
                              .toString()
                              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
                          }}
                        </td>
                        <td v-if="item.status_tarif == 0">
                          <span class="badge badge-pill badge-warning"
                            >Tidak Aktif</span
                          >
                        </td>
                        <td v-if="item.status_tarif == 1">
                          <span class="badge badge-pill badge-success"
                            >Aktif</span
                          >
                        </td>
                        <td class="tombol">
                          <button
                            v-if="item.status_tarif == 0"
                            type="button"
                            class="btn btn-sm btn-success"
                            @click.prevent="aktifkanTarif(item.id)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Aktifkan tarif"
                          >
                            <i class="fas fa-solid fa-check"></i>
                          </button>
                          <button
                            v-else
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="nonAktifkanTarif(item.id)"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Nonaktifkan tarif"
                          >
                            <i class="fas fa-solid fa-unlock"></i>
                          </button>
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'EditTarif',
                              params: { id: item.id },
                            }"
                          >
                            <i class="fas fa-solid fa-pen"></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deleteTarif(item.id)"
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
  name: "ListTarifView",
  data() {
    return {
      items: [],

      pilih_tarif: {},
    };
  },

  created() {
    this.getTarif();
    this.getTarifById();
  },

  methods: {
    async getTarif() {
      try {
        const data_tarif = await axios.get("http://192.168.0.64:3001/tarif/list");

        let db = data_tarif.data.data;
        for (let i = 0; i < db.length; i++) {
          db[i].no = i + 1;
        }
        this.items = db;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTarif(id) {
      try {
        const data_biaya = await axios.get(
          `http://192.168.0.64:3001/tarif/detailsById/${id}`
        );
        if (data_biaya.data.data[0].status_tarif == 1) {
          this.$swal({
            title: "Peringatan",
            text: "Tidak bisa menghapus tarif yang aktif",
            icon: "warning",
            confirmButtonColor: "#3085d6",
          });
        } else {
          this.$swal({
            title: "Peringatan !",
            text:
              "Apakah anda yakin akan menghapus data tarif '" +
              data_biaya.data.data[0].nominal_tarif +
              "'?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
          }).then(async (hasil) => {
            if (hasil.isConfirmed == true) {
              await axios.post("http://192.168.0.64:3001/tarif/delete", { id });
              this.$swal({
                icon: "success",
                title: "Sukses",
                text: "Data tarif berhasil dihapus",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            this.getTarif();
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getTarifById(id) {
      try {
        const tarif = await axios.get(
          "http://192.168.0.64:3001/tarif/detailsById/" + id
        );

        this.pilih_tarif = tarif.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async aktifkanTarif(id) {
      try {
        const tarif = await axios.get(
          "http://192.168.0.64:3001/tarif/detailsById/" + id
        );

        let cek = await axios.post(
          "http://192.168.0.64:3001/tarif/aktifkanTarif",
          tarif.data.data[0]
        );
        if (cek.data.status == 204) {
          this.$swal({
            title: "Peringatan",
            text: "Sudah ada tarif yang aktif",
            icon: "warning",
            confirmButtonColor: "#3085d6",
          });
        } else {
          this.$swal({
            icon: "success",
            title: "Sukses",
            text: "Data tarif berhasil diaktifkan",
            showConfirmButton: false,
            timer: 3000,
          });
        }
        this.getTarif();
      } catch (error) {
        console.log(error);
      }
    },

    async nonAktifkanTarif(id) {
      try {
        const tarif = await axios.get(
          "http://192.168.0.64:3001/tarif/detailsById/" + id
        );

        this.$swal({
          title: "Peringatan !",
          text:
            "Apakah anda yakin akan menonaktifkan data tarif '" +
            tarif.data.data[0].nominal_tarif +
            "'?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Nonaktifkan!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post(
              "http://192.168.0.64:3001/tarif/nonAktifkanTarif",
              tarif.data.data[0]
            );
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data tarif berhasil dinonaktifkan",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getTarif();
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