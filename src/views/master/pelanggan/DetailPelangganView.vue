<template>
  <div>
    <NavbarComponent />
    <div class="container">
      <div class="row mt-3 mb-4">
        <div class="col">
          <div class="card">
            <h5 class="card-header bg-dark" style="color: white">
              Detail Data Pelanggan
            </h5>
            <div class="card-body">
              <div class="row">
                <div class="col-8 mx-auto">
                  <div class="card mb-3" style="max-width: 100%">
                    <div class="card-body">
                      <div>
                        <template v-if="items[0]">
                          <div class="row">
                            <div class="col-sm-6">
                              <h5 class="card-title">
                                <b>{{ items[0].nama_pelanggan }}</b>
                              </h5>
                              <p class="card-text">
                                Email : <b>{{ items[0].email }}</b>
                              </p>
                              <p class="card-text">
                                Nomor Telepon :
                                <b>{{ items[0].nomor_telepon }}</b>
                              </p>
                              <p class="card-text">
                                <small class="text-muted"
                                  >Last updated 3 mins ago</small
                                >
                              </p>
                            </div>
                            <div class="col-sm-6">
                              <img
                                :src="`http://192.168.0.64:3001/uploads/${items[0].foto}`"
                                width="100%"
                              />
                            </div>
                          </div>
                        </template>
                        <div class="row">
                          <div class="col">
                            <router-link
                              class="btn btn-sm btn-warning"
                              :to="{
                                name: 'data-pelanggan-edit',
                                params: { id: this.$route.params.id },
                              }"
                            >
                              <i
                                class="bi bi-pencil-square"
                                style="color: white"
                              ></i>
                              Edit
                            </router-link>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger"
                              @click.prevent="deletePelanggan(items[0].id)"
                            >
                              <i class="bi bi-trash" style="color: white"></i>
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import NavbarComponent from "@/components/NavbarComponent.vue";

export default {
  name: "DetailPelangganView",
  components: {
    NavbarComponent,
  },
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.getPelangganById();
  },

  methods: {
    async getPelangganById() {
      try {
        const data_pelanggan = await axios.get(
          `http://192.168.0.64:3001/pelanggan/detailsById/${this.$route.params.id}`
        );
        this.items = data_pelanggan.data.data;
      } catch (error) {
        console.log(error, "eror satu");
      }
    },

    async deletePelanggan(id) {
      try {
        this.$swal({
          title: "Peringatan !",
          text: "Apakah anda yakin akan menghapus data dengan nama " + this.items[0].nama_pelanggan,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post("http://192.168.0.64:3001/pelanggan/delete", { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data pelanggan berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push("/data-pelanggan");
          } else {
            this.getPelangganById();
          }
        });
      } catch (error) {
        console.log(error, "errorrrrrrrrrrrrrrrrrrrrrrr");
      }
    },
  },
};
</script>
  
  <style>
</style>