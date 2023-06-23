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
                    <form @submit.prevent="saveWilayah">
                      <div class="row mb-3">
                        <label
                          for="nama_wilayah"
                          class="col-sm-4 col-form-label"
                          >Nama Wilayah<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_wilayah"
                            v-model.trim="$v.nama_wilayah.$model"
                            :class="{
                              'is-invalid': validationStatus($v.nama_wilayah),
                            }"
                          />
                          <div
                            v-if="!$v.nama_wilayah.required"
                            class="invalid-feedback"
                          >
                            Nama wilayah harus diisi
                          </div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Simpan
                      </button>
                    </form>
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
  name: "FormTambahWilayahView",
  data() {
    return {
      nama_wilayah: "",
    };
  },

  validations: {
    nama_wilayah: { required },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveWilayah() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/wilayah/create", {
          nama_wilayah: this.nama_wilayah,
        });
        this.nama_wilayah = "";

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data wilayah berhasil disimpan",
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

