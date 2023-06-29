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
                  Form Tambah Data Golongan Tarif
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="saveGolonganTarif">
                      <div class="row mb-3">
                        <label
                          for="nama_golongan_tarif"
                          class="col-sm-3 col-form-label"
                          >Nama Golongan Tarif<span class="text-danger">
                            *
                          </span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_golongan_tarif"
                            v-model.trim="
                              $v.golongan_tarif_baru.nama_golongan_tarif.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.golongan_tarif_baru.nama_golongan_tarif
                              ),
                            }"
                          />
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.nama_golongan_tarif
                                .required
                            "
                            class="invalid-feedback"
                          >
                            Nama golongan tarif harus diisi
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          for="nominal_tarif"
                          class="col-sm-3 col-form-label"
                          >Nominal Tarif<span class="text-danger">
                            *
                          </span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nominal_tarif"
                            v-model.trim="
                              $v.golongan_tarif_baru.nominal_tarif.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.golongan_tarif_baru.nominal_tarif
                              ),
                            }"
                          />
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.nominal_tarif.required
                            "
                            class="invalid-feedback"
                          >
                            Nominal harus diisi
                          </div>
                          <div
                            v-if="!$v.golongan_tarif_baru.nominal_tarif.numeric"
                            class="invalid-feedback"
                          >
                            Nominal harus berupa angka
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          for="biaya_perawatan"
                          class="col-sm-3 col-form-label"
                          >Biaya Perawatan<span class="text-danger">
                            *
                          </span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="biaya_perawatan"
                            v-model.trim="
                              $v.golongan_tarif_baru.biaya_perawatan.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.golongan_tarif_baru.biaya_perawatan
                              ),
                            }"
                          />
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.biaya_perawatan.required
                            "
                            class="invalid-feedback"
                          >
                            Biaya perawatan harus diisi
                          </div>
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.biaya_perawatan.numeric
                            "
                            class="invalid-feedback"
                          >
                            Biaya perawatan harus berupa angka
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label
                          for="nominal_denda"
                          class="col-sm-3 col-form-label"
                          >Denda<span class="text-danger">
                            *
                          </span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nominal_denda"
                            v-model.trim="
                              $v.golongan_tarif_baru.nominal_denda.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.golongan_tarif_baru.nominal_denda
                              ),
                            }"
                          />
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.nominal_denda.required
                            "
                            class="invalid-feedback"
                          >
                            Denda harus diisi
                          </div>
                          <div
                            v-if="
                              !$v.golongan_tarif_baru.nominal_denda.numeric
                            "
                            class="invalid-feedback"
                          >
                            Denda harus berupa angka
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
  name: "FormTambahGolonganTarifView",

  data() {
    return {
      golongan_tarif_baru: {
        nama_golongan_tarif: "",
        nominal_tarif: "",
        biaya_perawatan: "",
        nominal_denda: "",
      },
    };
  },

  validations: {
    golongan_tarif_baru: {
      nama_golongan_tarif: { required },
      nominal_tarif: { required, numeric },
      biaya_perawatan: { required, numeric },
      nominal_denda: { required, numeric },
    },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveGolonganTarif() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(
          "http://192.168.0.64:3001/golongan_tarif/create",
          this.golongan_tarif_baru
        );

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data golongan tarif berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/golongan-tarif");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
    
  
    <style>
</style>