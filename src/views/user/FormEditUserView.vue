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
                  Form Edit Data User
                </h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <form @submit.prevent="updateUser">
                      <div class="row mb-3">
                        <label for="nama_user" class="col-sm-3 col-form-label"
                          >Nama User<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="nama_user"
                            v-model.trim="$v.item_user.nama_user.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_user.nama_user
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_user.nama_user.required"
                            class="invalid-feedback"
                          >
                            Nama user harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="username" class="col-sm-3 col-form-label"
                          >Username<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model.trim="$v.item_user.username.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_user.username
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_user.username.required"
                            class="invalid-feedback"
                          >
                            Username harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="password" class="col-sm-3 col-form-label"
                          >Password<span class="text-danger"> *</span></label
                        >
                        <div class="col-sm-9">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model.trim="$v.item_user.password.$model"
                            :class="{
                              'is-invalid': validationStatus(
                                $v.item_user.password
                              ),
                            }"
                          />
                          <div
                            v-if="!$v.item_user.password.required"
                            class="invalid-feedback"
                          >
                            Password harus diisi
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label for="role" class="col-sm-3 col-form-label"
                          >Role<span class="text-danger">*</span></label
                        >
                        <div class="col-sm-9">
                          <select
                            class="form-control"
                            aria-label="Default select example"
                            v-model.trim="$v.item_user.role.$model"
                            :class="{
                              'is-invalid': validationStatus($v.item_user.role),
                            }"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="KASIR">KASIR</option>
                          </select>
                          <div
                            v-if="!$v.item_user.role.required"
                            class="invalid-feedback"
                          >
                            Role harus diisi
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
      </section>
    </div>
    <app-footer />
    <control-side-bar />
  </div>
</template>
    
<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormEditUserView",
  data() {
    return {
      item_user: {},
    };
  },

  validations: {
    item_user: {
      nama_user: { required },
      username: { required },
      password: { required },
      role: { required },
    },
  },

  created: function () {
    this.getUserById();
  },

  methods: {
    validationStatus: function (validation) {
      return typeof validation != "undefined" ? validation.$error : false;
    },

    async getUserById() {
      try {
        const data_user = await axios.get(
          `http://localhost:3001/user/detailsById/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
        );

        console.log(data_user.data.data[0]);
        this.item_user = data_user.data.data[0];
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser() {
      try {
        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

        await axios.post("http://localhost:3001/user/update", this.item_user);
        this.$swal({
          icon: "success",
          title: "Sukses",
          text: "Data user berhasil diupdate",
          showConfirmButton: false,
          timer: 3000,
        });
        this.$router.push("/user");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
    
<style>
</style>
  
  