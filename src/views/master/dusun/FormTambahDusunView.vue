<template>
  <div>
    <app-nav-bar />
    <div class="content-wrapper">
      <router-view />
      <section class="content">
        <div class="container-fluid pt-3">
        <!-- <div class="row mt-1 mb-3">
          <app-top-bar />
        </div> -->
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-plus-circle"></i>
                  Form Tambah Data Dusun
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="saveDusun">
                      <div class="row mb-3">
                        <label
                          for="nama_dusun"
                          class="col-sm-3 col-form-label"
                          >Nama Dusun<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_dusun"
                            v-model.trim="$v.item_dusun.nama_dusun.$model"
                            :class="{
                              'is-invalid': validationStatus($v.item_dusun.nama_dusun),
                            }"
                          />
                          <div
                            v-if="!$v.item_dusun.nama_dusun.required"
                            class="invalid-feedback"
                          >
                            Nama dusun harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Desa<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model.trim="$v.item_dusun.desa_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_dusun.desa_id
                              ),
                            }"
                          >
                            <option
                              v-for="row_desa in item_desa"
                              :key="row_desa.id"
                              :value="row_desa.id"
                            >
                              {{ row_desa.nama_desa }}
                            </option>
                          </select>
                          <div
                            v-if="!$v.item_dusun.desa_id.required"
                            class="invalid-feedback"
                          >
                            Desa harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="nama_dusun"
                          class="col-sm-3 col-form-label"
                          >Tanggal Jatuh Tempo<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="tanggal_jatuh_tempo"
                            v-model.trim="$v.item_dusun.tanggal_jatuh_tempo.$model"
                            :class="{
                              'is-invalid': validationStatus($v.item_dusun.tanggal_jatuh_tempo),
                            }"
                          />
                          <div
                            v-if="!$v.item_dusun.tanggal_jatuh_tempo.required"
                            class="invalid-feedback"
                          >
                            Tanggal jatuh tempo harus diisi
                          </div>
                          <div
                            v-if="!$v.item_dusun.tanggal_jatuh_tempo.numeric"
                            class="invalid-feedback"
                          >
                            Tanggal jatuh tempo harus berupa angka
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
      </section>
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
  

<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  name: "FormTambahDusunView",
  data() {
    return {
      item_dusun: {
        nama_dusun: "",
        desa_id: "",
        tanggal_jatuh_tempo: "",
      },

      item_desa: []
    };
  },

  validations: {
    item_dusun: {
      nama_dusun: { required },
      desa_id: { required },
      tanggal_jatuh_tempo: { required, numeric },
    }
  },

  created() {
    this.getDesa();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getDesa() {
      try {
        const data_desa = await axios.get(
          `${ipBackend}/desa/list`
        );
        // console.log(data_desa);
        let dd = data_desa.data.data;
        this.item_desa = dd
      } catch (error) {
        console.log(error);
      }
    },

    async saveDusun() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(`${ipBackend}/dusun/create`, this.item_dusun);
        this.item_dusun.nama_dusun = ""
        this.item_dusun.desa_id = ""

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data dusun berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/dusun");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  
  <style>
</style>

