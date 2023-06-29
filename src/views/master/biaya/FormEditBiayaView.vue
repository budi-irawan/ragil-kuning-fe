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
                Data Biaya
              </h5>
              <div class="card-body">
                <div class="row">
                  <div class="col-8 mx-auto">
                    <form id="form" @submit.prevent="updateBiaya">
                      <div class="row mb-3">
                        <label for="nama_biaya" class="col-sm-4 col-form-label"
                          >Nama Biaya<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_biaya"
                            v-model.trim="$v.pilih_biaya.nama_biaya.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pilih_biaya.nama_biaya
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pilih_biaya.nama_biaya.required"
                            class="invalid-feedback"
                          >
                            Nama biaya harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="nominal_biaya"
                          class="col-sm-4 col-form-label"
                          >Nominal<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="nominal_biaya"
                            v-model.trim="$v.pilih_biaya.nominal_biaya.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pilih_biaya.nominal_biaya
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pilih_biaya.nominal_biaya.required"
                            class="invalid-feedback"
                          >
                            Nominal harus diisi
                          </div>
                          <div
                            v-if="!$v.pilih_biaya.nominal_biaya.numeric"
                            class="invalid-feedback"
                          >
                            Nominal harus berupa angka
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-4 col-form-label"
                          >Golongan<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-8">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model.trim="$v.pilih_biaya.golongan_biaya.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pilih_biaya.golongan_biaya
                              ),
                            }"
                          >
                            <option value="1">Utama</option>
                            <option value="2">Tambahan</option>
                          </select>
                          <div
                            v-if="!$v.pilih_biaya.golongan_biaya.required"
                            class="invalid-feedback"
                          >
                            Golongan harus diisi
                          </div>
                        </div>
                      </div>

                      <button type="submit" class="btn btn-primary">
                        Update
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
  name: "FormEditBiayaView",

  data() {
    return {
      pilih_biaya: {},
    };
  },

  validations: {
    pilih_biaya: {
      nama_biaya: { required },
      nominal_biaya: { required, numeric },
      golongan_biaya: { required },
    },
  },

  created: function () {
    this.getBiayaById();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getBiayaById() {
      try {
        const data_biaya = await axios.get("http://localhost:3001/biaya/detailsById/"+ this.$route.params.id);
       
        this.pilih_biaya = data_biaya.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async updateBiaya() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/biaya/update", this.pilih_biaya);

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