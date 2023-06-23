<template>
  <div class="offset">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>First Name</th>
          <!-- <th>Last Name</th>
          <th>User ID</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedPosts" :key="item">
          <td>{{ item.nama_pelanggan }}</td>
          <!-- <td>{{ item.last }}</td>
          <td>{{ item.suffix }}</td> -->
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-if="page != 1"
            @click="page--"
          >
            Previous
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            @click="page = pageNumber"
            :key="pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            @click="page++"
            v-if="page < pages.length"
            class="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
      
      
<script>
import axios from "axios";
export default {
  name: "PaymentView",

  data() {
    return {
      posts: [""],
      page: 1,
      perPage: 9,
      pages: [],
    };
  },
  methods: {
    async getPosts() {
      let data = [];
      // for (let i = 0; i < 50; i++) {
      //   this.posts.push({ first: "John", last: "Doe", suffix: "#" + i });
      // }
      try {
        const data_pelanggan = await axios.get(
          "http://localhost:3001/pelanggan/list"
        );
        let dp = data_pelanggan.data.data;
        for (let i = 0; i < dp.length; i++) {
          dp[i].no = i + 1;
        }
        this.posts = dp;
      } catch (error) {
        console.log(error);
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  created() {
    this.getPosts();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>
      

<style>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
</style>