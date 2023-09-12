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
                  Form Tambah Data Tahun
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="saveTahun">
                      <div class="row mb-3">
                        <label
                          for="nama_wilayah"
                          class="col-sm-3 col-form-label"
                          >Nama Tahun<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_tahun"
                            v-model.trim="$v.nama_tahun.$model"
                            :class="{
                              'is-invalid': validationStatus($v.nama_tahun),
                            }"
                          />
                          <div
                            v-if="!$v.nama_tahun.required"
                            class="invalid-feedback"
                          >
                            Nama tahun harus diisi
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormTambahTahunView",
  data() {
    return {
      nama_tahun: "",
    };
  },

  validations: {
    nama_tahun: { required },
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async saveTahun() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(`${ipBackend}/tahun/create`, {
          nama_tahun: this.nama_tahun,
        });
        this.nama_tahun = "";

        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data tahun berhasil disimpan",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/tahun");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  
  <style>
</style>

