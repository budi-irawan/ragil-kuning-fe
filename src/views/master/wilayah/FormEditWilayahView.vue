<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card">
              <h5 class="card-header bg-dark" style="color: white">
                Data Wilayah
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-8 mx-auto">
                    <div>
                      <template>
                        <form @submit.prevent="updateWilayah">
                          <div class="row mb-3">
                            <label
                              for="nama_wilayah"
                              class="col-sm-4 col-form-label"
                              >Nama Wilayah</label
                            >
                            <div class="col-sm-8">
                              <input
                                type="text"
                                class="form-control"
                                id="nama_wilayah"
                                v-model.trim="
                                  $v.pilih_wilayah.nama_wilayah.$model
                                "
                                :class="{
                                  'is-invalid': validationStatus(
                                    $v.pilih_wilayah.nama_wilayah
                                  ),
                                }"
                              />
                              <div
                                v-if="!$v.pilih_wilayah.nama_wilayah.required"
                                class="invalid-feedback"
                              >
                                Nama wilayah harus diisi
                              </div>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">
                            Update
                          </button>
                        </form>
                      </template>
                    </div>
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormEditWilayahView",
  data() {
    return {
      pilih_wilayah: {},
    };
  },

  validations: {
    pilih_wilayah: {
      nama_wilayah: { required },
    },
  },

  created: function () {
    this.getWilayahById();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getWilayahById() {
      try {
        const data_pelanggan = await axios.get(
          `http://localhost:3001/wilayah/detailsById/${this.$route.params.id}`
        );

        this.pilih_wilayah = data_pelanggan.data.data[0];
        console.log(this.pilih_wilayah);
      } catch (error) {
        console.log(error);
      }
    },

    async updateWilayah() {
      try {
        await axios.post(
          "http://localhost:3001/wilayah/update",
          this.pilih_wilayah
        );
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data wilayah berhasil diupdate",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/wilayah");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
    
<style>
</style>
  
  