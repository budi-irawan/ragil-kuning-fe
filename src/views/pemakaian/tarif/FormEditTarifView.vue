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
                  Form Edit Data Tarif
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="updateTarif">
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
  name: "FormEditTarifView",

  data() {
    return {
      tarif_baru: {},
    };
  },

  validations: {
    tarif_baru: {
      nominal_tarif: { required, numeric },
    },
  },

  created: function () {
    this.getTarifById();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async updateTarif() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://192.168.0.64:3001/tarif/update", this.tarif_baru);

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data tarif berhasil diperbarui",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/pemakaian/tarif");
      } catch (error) {
        console.log(error);
      }
    },

    async getTarifById(id) {
      try {
        const tarif = await axios.get(
          "http://192.168.0.64:3001/tarif/detailsById/" + this.$route.params.id
        );

        this.tarif_baru = tarif.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

  },
};
</script>
    
  
    <style>
</style>