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
                  Form Tambah Data Tarif
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="saveTarif">
                      <div class="row mb-3">
                        <label
                          for="nominal_biaya"
                          class="col-sm-3 col-form-label"
                          >Nominal Tarif<span class="text-danger"
                            > * </span
                          ></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nominal_biaya"
                            v-model.trim="$v.tarif_baru.nominal_tarif.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.tarif_baru.nominal_tarif
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.tarif_baru.nominal_tarif.required"
                            class="invalid-feedback"
                          >
                            Nominal harus diisi
                          </div>
                          <div
                            v-if="!$v.tarif_baru.nominal_tarif.numeric"
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
  name: "FormTambahTarifView",

  data() {
    return {
      tarif_baru: {
        nominal_tarif: "",
      },
    };
  },

  validations: {
    tarif_baru: {
      nominal_tarif: { required, numeric },
    },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveTarif() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/tarif/create", this.tarif_baru);

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data tarif berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/pemakaian/tarif");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
    
  
    <style>
</style>