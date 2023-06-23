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
                  Form Edit Data Desa
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="updateDesa">
                      <div class="row mb-3">
                        <label for="nama_desa" class="col-sm-3 col-form-label"
                          >Nama Desa</label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_desa"
                            v-model.trim="$v.item_desa.nama_desa.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_desa.nama_desa
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_desa.nama_desa.required"
                            class="invalid-feedback"
                          >
                            Nama desa harus diisi
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormEditDesaView",
  data() {
    return {
      item_desa: {},
    };
  },

  validations: {
    item_desa: {
      nama_desa: { required },
    },
  },

  created: function () {
    this.getDesaById();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getDesaById() {
      try {
        const data_desa = await axios.get(
          `http://localhost:3001/desa/detailsById/${this.$route.params.id}`
        );

        this.item_desa = data_desa.data.data[0];
        console.log(this.item_desa);
      } catch (error) {
        console.log(error);
      }
    },

    async updateDesa() {
      try {
        await axios.post("http://localhost:3001/desa/update", this.item_desa);
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data desa berhasil diupdate",
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
  
  