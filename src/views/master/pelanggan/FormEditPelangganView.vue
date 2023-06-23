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
                  Form Edit Data Pelanggan
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="updatePelanggan">
                      <div class="row mb-3">
                        <label
                          for="nama_pelanggan"
                          class="col-sm-3 col-form-label"
                          >Nama Pelanggan<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_pelanggan"
                            v-model.trim="
                              $v.item_pelanggan.nama_pelanggan.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.nama_pelanggan
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_pelanggan.nama_pelanggan.required"
                            class="invalid-feedback"
                          >
                            Nama pelanggan harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="alamat" class="col-sm-3 col-form-label"
                          >Alamat<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="alamat"
                            v-model.trim="$v.item_pelanggan.alamat.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.alamat
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_pelanggan.alamat.required"
                            class="invalid-feedback"
                          >
                            Alamat harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="nomor_telepon"
                          class="col-sm-3 col-form-label"
                          >Nomor Telepon<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nomor_telepon"
                            v-model.trim="
                              $v.item_pelanggan.nomor_telepon.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.nomor_telepon
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_pelanggan.nomor_telepon.required"
                            class="invalid-feedback"
                          >
                            Nomor telepon harus diisi
                          </div>
                          <div
                            v-if="!$v.item_pelanggan.nomor_telepon.numeric"
                            class="invalid-feedback"
                          >
                            Nomor telepon harus berupa angka
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
                            @change="getDusunByDesaId()"
                            v-model.trim="$v.item_pelanggan.desa_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.desa_id
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
                            v-if="!$v.item_pelanggan.desa_id.required"
                            class="invalid-feedback"
                          >
                            Desa harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Dusun<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model.trim="$v.item_pelanggan.dusun_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.dusun_id
                              ),
                            }"
                          >
                            <option
                              v-for="row_dusun in item_dusun"
                              :key="row_dusun.dusun_id"
                              :value="row_dusun.dusun_id"
                            >
                              {{ row_dusun.nama_dusun }}
                            </option>
                          </select>
                          <div
                            v-if="!$v.item_pelanggan.dusun_id.required"
                            class="invalid-feedback"
                          >
                            Dusun harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="wilayah" class="col-sm-3 col-form-label"
                          >Golongan Tarif<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model.trim="
                              $v.item_pelanggan.golongan_tarif_id.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_pelanggan.golongan_tarif_id
                              ),
                            }"
                          >
                            <option
                              v-for="igt in item_golongan_tarif"
                              :key="igt.id"
                              :value="igt.id"
                            >
                              {{ igt.nama_golongan_tarif }} - Tarif /m3:
                              {{ igt.nominal_tarif }} - Biaya Perawatan:
                              {{ igt.biaya_perawatan }}
                            </option>
                          </select>
                          <div
                            v-if="!$v.item_pelanggan.golongan_tarif_id.required"
                            class="invalid-feedback"
                          >
                            Golongan tarif harus diisi
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
  name: "FormEditPelangganView",
  data() {
    return {
      item_pelanggan: {},
      item_desa: [],
      item_dusun: [],
      item_golongan_tarif: [],
    };
  },

  validations: {
    item_pelanggan: {
      nama_pelanggan: { required },
      alamat: { required },
      nomor_telepon: { required, numeric },
      desa_id: { required },
      dusun_id: { required },
      golongan_tarif_id: { required },
    },
  },

  created: function () {
    this.getPelangganById();
    this.getDesa();
    this.getDusunByDesaId();
    this.getGolonganTarif();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getPelangganById() {
      try {
        const data_pelanggan = await axios.get(
          `http://localhost:3001/pelanggan/detailsById/${this.$route.params.id}`
        );

        this.item_pelanggan = data_pelanggan.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async getDesa() {
      try {
        const data_desa = await axios.get("http://localhost:3001/desa/list");
        this.item_desa = data_desa.data.data;
        // console.log(this.item_desa);
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(
          `http://localhost:3001/dusun/listDusunByDesaId`,
          { desa_id: this.item_pelanggan.desa_id }
        );
        this.item_dusun = data_dusun.data.data;
        console.log(this.item_dusun);
      } catch (error) {
        console.log(error);
      }
    },

    async getGolonganTarif() {
      try {
        const data_golongan_tarif = await axios.get(
          "http://localhost:3001/golongan_tarif/list"
        );
        this.item_golongan_tarif = data_golongan_tarif.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async updatePelanggan() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(
          `http://localhost:3001/pelanggan/update`,
          this.item_pelanggan
        );
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data pelanggan berhasil diupdate",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/master/pelanggan");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  

<style>
</style>