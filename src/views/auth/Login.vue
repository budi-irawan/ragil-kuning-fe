<template>
    <div>
      <div class="hold-transition login-page">
        <div class="login-box">
          <div class="card card-outline card-primary">
            <div class="card-header text-center">
              <a href="#" class="h1"><b>Asa</b>LTE</a>
            </div>
            <div class="card-body">
  
            <form>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="user.username"
                  v-on:keyup.enter="nextPlease"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input
                  id="input2"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                  v-on:keyup.enter="loginNow()"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
            </form>
              <div class="row">
                <div class="col-4">
                  <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    @click="loginNow()"
                  >
                    Sign In
                    <div class="loading" v-if="loading">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ipBackend } from '@/ipBackend';

  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        user: {
          username: "",
          password: "",
        },
      };
    },
  
    mounted() {
      let user = localStorage.getItem('token')
      if (user) {
        this.$router.push("/dashboard")
      }
    },
  
    created() {
      this.$eventBus.$on("loadingStatus", (payload) => {
        this.loading = payload;
      });
    },
  
    methods: {
      nextPlease: function (event) {
        document.getElementById('input2').focus();
      },

      loginNow() {
        this.$eventBus.$emit("loadingStatus", true);
  
        this.$axios
          .post(`${ipBackend}/user/login`, this.user)
          .then((res) => {
            this.$eventBus.$emit("loadingStatus", false);
            if (res.data.status != 200) {
              this.$VueIziToast.error({
                title: "Error",
                message: res.data.message,
                position: "topCenter"
              });
            } else {
              localStorage.setItem("token", res.data.token);
              this.$router.push("/dashboard")
            }
          });
      },
    },
  };
  </script>
  
  <style lang="scss">
  </style>