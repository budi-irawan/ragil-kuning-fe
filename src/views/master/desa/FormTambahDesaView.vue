<template>
  <div>
    <app-nav-bar />
    <app-side-bar />
    <div class="content-wrapper">
      <router-view />
      <div class="container pt-3">
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-plus-circle"></i>
                  Form Tambah Data Desa
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="saveDesa">
                      <div class="row mb-3">
                        <label
                          for="nama_wilayah"
                          class="col-sm-3 col-form-label"
                          >Nama Desa<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_desa"
                            v-model.trim="$v.nama_desa.$model"
                            :class="{
                              'is-invalid': validationStatus($v.nama_desa),
                            }"
                          />
                          <div
                            v-if="!$v.nama_desa.required"
                            class="invalid-feedback"
                          >
                            Nama desa harus diisi
                          </div>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
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
  name: "FormTambahDesaView",
  data() {
    return {
      nama_desa: "",
    };
  },

  validations: {
    nama_desa: { required },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveDesa() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/desa/create", {
          nama_desa: this.nama_desa,
        });
        this.nama_desa = "";

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data desa berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/desa");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  
  <style>
</style>

