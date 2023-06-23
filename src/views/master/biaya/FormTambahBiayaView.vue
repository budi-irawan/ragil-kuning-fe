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
                  Form Tambah Data Biaya
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="saveBiaya">
                      <div class="row mb-3">
                        <label for="nama_biaya" class="col-sm-3 col-form-label"
                          >Nama Biaya<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_biaya"
                            v-model.trim="$v.biaya_baru.nama_biaya.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.biaya_baru.nama_biaya
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.biaya_baru.nama_biaya.required"
                            class="invalid-feedback"
                          >
                            Nama pelanggan harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="nominal_biaya"
                          class="col-sm-3 col-form-label"
                          >Nominal<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nominal_biaya"
                            v-model.trim="$v.biaya_baru.nominal_biaya.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.biaya_baru.nominal_biaya
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.biaya_baru.nominal_biaya.required"
                            class="invalid-feedback"
                          >
                            Nominal harus diisi
                          </div>
                          <div
                            v-if="!$v.biaya_baru.nominal_biaya.numeric"
                            class="invalid-feedback"
                          >
                            Nominal harus berupa angka
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
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "FormTambahBiayaView",

  data() {
    return {
      biaya_baru: {
        nama_biaya: "",
        nominal_biaya: "",
      },
    };
  },

  validations: {
    biaya_baru: {
      nama_biaya: { required },
      nominal_biaya: { required, numeric },
    },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveBiaya() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/biaya/create", this.biaya_baru);

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data biaya berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/biaya");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  

  <style>
</style>