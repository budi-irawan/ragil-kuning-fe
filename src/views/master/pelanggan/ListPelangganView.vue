<template>
  <div>
    <app-nav-bar />
    <div class="content-wrapper">
      <router-view />
      <section class="content">
        <div class="container-fluid pt-3">
        <div class="row mt-1 mb-3">
          <app-top-bar />
        </div>
        <div class="row">
          <div class="col">
            <router-link class="btn btn-primary" to="/master/pelanggan/tambah">
              <i class="fas fa-solid fa-plus-circle"></i>
              Tambah Data Pelanggan
            </router-link>
          </div>
        </div>
        <div class="row mt-3 mb-4">
          <div class="col">
            <div class="card card-outline card-primary">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-table"></i>
                  Data Pelanggan
                </h3>
              </div>
              <div class="card-body pad table-responsive">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="form-outline">
                      <select
                        class="form-control"
                        aria-label="Default select example"
                        @change="getDusunByDesaId()"
                        v-model="desa_id"
                      >
                        <option>--Desa--</option>
                        <option
                          v-for="row_desa in item_desa"
                          :key="row_desa.id"
                          :value="row_desa.id"
                        >
                          {{ row_desa.nama_desa }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-outline">
                      <select
                        class="form-control"
                        aria-label="Default select example"
                        v-model="dusun_id"
                      >
                        <option>--Dusun--</option>
                        <option
                          v-for="row_dusun in item_dusun"
                          :key="row_dusun.dusun_id"
                          :value="row_dusun.dusun_id"
                        >
                          {{ row_dusun.nama_dusun }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <div class="form-outline">
                      <input
                        type="text"
                        v-model="search"
                        autofocus
                        class="form-control"
                        placeholder="Cari pelanggan "
                        aria-label="Search"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="table-responsive" v-if="!loading">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col" style="width: 5%">No</th>
                        <th scope="col">Nama Pelanggan</th>
                        <th scope="col">Alamat</th>
                        <th scope="col">Nomor Telepon</th>
                        <th scope="col">Desa</th>
                        <th scope="col">Dusun</th>
                        <th scope="col">Golongan Tarif</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in filterPelanggan"
                        :key="item.pelanggan_id"
                      >
                        <td>{{ item.no }}</td>
                        <td>{{ item.nama_pelanggan }}</td>
                        <td>{{ item.alamat }}</td>
                        <td>{{ item.nomor_telepon }}</td>
                        <td>{{ item.nama_desa }}</td>
                        <td>{{ item.nama_dusun }}</td>
                        <td>{{ item.nama_golongan_tarif }}</td>
                        <td class="tombol">
                          <router-link
                            class="btn btn-sm btn-warning"
                            :to="{
                              name: 'EditPelanggan',
                              params: { id: item.pelanggan_id },
                            }"
                          >
                            <i
                              class="fas fa-solid fa-pen"
                              style="color: white"
                            ></i>
                          </router-link>
                          <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            @click.prevent="deletePelanggan(item.pelanggan_id)"
                          >
                            <i class="fas fa-trash" style="color: white"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div v-else class="row muser">
                  <div class="col text-center">
                    <img :src="loadingImage" />
                  </div>
                </div>

                <!-- <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <button type="button" class="page-link" v-if="page != 1" @click="page--">Previous</button>
                    </li>
                    <li class="page-item">
                      <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" @click="page=pageNumber" :key="pageNumber">{{ pageNumber }}</button>
                    </li>
                    <li class="page-item">
                      <button type="button" class="page-link" @click="page++" v-if="page < pages.length">Next</button>
                    </li>
                  </ul>
                </nav> -->
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

export default {
  name: "ListPelangganView",
  data() {
    return {
      loading: true,
      items: [],
      search: "",
      desa_id: "",
      dusun_id: "",

      item_desa: [],
      item_dusun: [],
      loadingImage: require('../../../../public/rolling.gif')

    };
  },

  methods: {
    async getDesa() {
      try {
        const data_desa = await axios.get(`${ipBackend}/desa/list`);
        this.item_desa = data_desa.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getDusunByDesaId() {
      try {
        const data_dusun = await axios.post(
          `${ipBackend}/dusun/listDusunByDesaId`,
          { desa_id: this.desa_id }
        );
        this.item_dusun = data_dusun.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getPelanggan() {
      try {
        const data_pelanggan = await axios.get(
          `${ipBackend}/pelanggan/list`
        );
        let dp = data_pelanggan.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
        }
        return dp;
      } catch (error) {
        console.log(error);
      }
    },

    // setPages() {
    //   let numberOfPages = Math.ceil(this.items.length / this.perPage)
    //   for (let i = 1; i <= numberOfPages; i++) {
    //     this.pages.push(i)
    //   }
    //   console.log(this.pages.length);
    // },

    // paginate (items) {
    //   let page = this.page 
    //   let perPage = this.perPage
    //   let from = (page * perPage) - perPage
    //   let to = (page * perPage)
    //   return items.slice(from, to)
    // },

    async deletePelanggan(id) {
      try {
        const data_pelanggan = await axios.get(
          `${ipBackend}/pelanggan/detailsById/${id}`
        );
        this.$swal({
          title: "Peringatan !",
          text:
            "Apakah anda yakin akan menghapus data dengan nama " +
            data_pelanggan.data.data[0].nama_pelanggan +
            "?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        }).then(async (hasil) => {
          if (hasil.isConfirmed == true) {
            await axios.post(`${ipBackend}/pelanggan/delete`, { id });
            this.$swal({
              icon: "success",
              title: "Sukses",
              text: "Data pelanggan berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.getPelanggan();
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    this.getDesa();
    this.getDusunByDesaId();
    
    this.items = await this.getPelanggan();
    this.loading = false
  },

  computed: {
    filterPelanggan: function () {
      let filterDesa = this.desa_id;
      let filterDusun = this.dusun_id;
      let filterNama = this.search;
      return this.items.filter((p) => {
        let filtered = true;
        if (filterDesa) {
          filtered = p.desa_id == filterDesa;
        }
        if (filtered) {
          if (filterDusun) {
            filtered = p.dusun_id == filterDusun;
          }
        }
        if (filtered) {
          if (filterNama) {
            filtered = p.nama_pelanggan.toLowerCase().match(filterNama);
          }
        }
        return filtered;
      });
    },

    // filterPelanggan () {
    //   return this.paginate(this.items)
    // },
  },

  // watch: {
  //   items () {
  //     this.setPages()
  //   }
  // },

  // filters: {
	// 	trimWords(value){
	// 		return value.split(" ").splice(0,20).join(" ") + '...';
	// 	}
	// },

  
};
</script>

<style>
.tombol {
  text-align: center;
}
.btn-sm {
  margin: 2px;
}

button.page-link {
	display: inline-block;
}
button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
}

div.load {
  justify-content: center;
  justify-items: center;
  margin: 0 auto;
}
/* .offset{
  width: 500px !important;
  margin: 20px auto;  
} */
</style>