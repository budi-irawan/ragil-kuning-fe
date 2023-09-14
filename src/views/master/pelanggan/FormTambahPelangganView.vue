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
                  Form Tambah Data Pelanggan
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form id="form" @submit.prevent="savePelanggan">
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
                              $v.pelanggan_baru.nama_pelanggan.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.nama_pelanggan
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pelanggan_baru.nama_pelanggan.required"
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
                            v-model.trim="$v.pelanggan_baru.alamat.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.alamat
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pelanggan_baru.alamat.required"
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
                              $v.pelanggan_baru.nomor_telepon.$model
                            "
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.nomor_telepon
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.pelanggan_baru.nomor_telepon.required"
                            class="invalid-feedback"
                          >
                            Nomor telepon harus diisi
                          </div>
                          <div
                            v-if="!$v.pelanggan_baru.nomor_telepon.numeric"
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
                            v-model.trim="$v.pelanggan_baru.desa_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.desa_id
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
                            v-if="!$v.pelanggan_baru.desa_id.required"
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
                            v-model.trim="$v.pelanggan_baru.dusun_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.dusun_id
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
                            v-if="!$v.pelanggan_baru.dusun_id.required"
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
                            v-model.trim="$v.pelanggan_baru.golongan_tarif_id.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.pelanggan_baru.golongan_tarif_id
                              ),
                            }"
                          >
                            <option
                              v-for="igt in item_golongan_tarif"
                              :key="igt.id"
                              :value="igt.id"
                            >
                              {{ igt.nama_golongan_tarif }} - Tarif /m3: {{ igt.nominal_tarif }} - Biaya Perawatan: {{ igt.biaya_perawatan }}
                            </option>
                          </select>
                          <div
                            v-if="!$v.pelanggan_baru.golongan_tarif_id.required"
                            class="invalid-feedback"
                          >
                            Golongan tarif harus diisi
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
  name: "FormTambahPelangganView",
  data() {
    return {
      pelanggan_baru: {
        nama_pelanggan: "",
        alamat: "",
        nomor_telepon: "",
        desa_id: "",
        dusun_id: "",
        golongan_tarif_id: "",
      },

      item_desa: [],
      item_dusun: [],
      item_golongan_tarif: []
    };
  },

  mounted() {
  },

  validations: {
    pelanggan_baru: {
      nama_pelanggan: { required },
      alamat: { required },
      nomor_telepon: { required, numeric },
      desa_id: { required },
      dusun_id: { required },
      golongan_tarif_id: { required },
    },
  },

  created() {
    this.getDesa();
    this.getDusunByDesaId();
    this.getGolonganTarif();
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
        this.item_desa = data_desa.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(
          `${ipBackend}/dusun/listDusunByDesaId`,{desa_id: this.pelanggan_baru.desa_id}
        );
        this.item_dusun = data_dusun.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getGolonganTarif() {
      try {
        const data_golongan_tarif = await axios.get(
          `${ipBackend}/golongan_tarif/list`
        );
        this.item_golongan_tarif = data_golongan_tarif.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async savePelanggan() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post(
          `${ipBackend}/pelanggan/create`,
          this.pelanggan_baru
        );

        this.$swal({
          icon: "success",
          title: "Data pelanggan berhasil ditambahkan",
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