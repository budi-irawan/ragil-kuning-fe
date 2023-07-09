<template>
  <div id="app">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <p>Add One or More Contacts</p>
        <div class="form-group row" v-for="(input, index) in inputs" :key="input">
          <div class="col-lg-3">
            <input type="text" :name="'contact[' + index + '][name]'" class="form-control" placeholder="Contact name">
          </div>
          <div class="col-lg-3">
            <input type="text" :name="'contact[' + index + '][phone]'" class="form-control" placeholder="Phone">
          </div>
          <div class="col-lg-3">
            <input type="text" :name="'contact[' + index + '][email]'" class="form-control" placeholder="Email">
          </div>
          <div class="col-lg-3">
            <button type="button" @click="deleteRow(index)" class="btn btn-outline-danger rounded-circle">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-12">
            <button type="button" @click="addRow" class="btn btn-outline-secondary">Add Row</button>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-lg-12">
            <button class="btn btn-primary">Submit</button>
          </div>
        </div>
        <p>Credits:<br>
          <a href="https://mattstauffer.com/blog/a-little-trick-for-grouping-fields-in-an-html-form/">A little trick for grouping fields in an HTML form</a><br>
          <a href="https://stackoverflow.com/a/42508565/2192679">Dynamic DOM elements add/remove with Vue</a>
          
          
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    created() {
    this.addRow();
  },
  data: {
    inputs: []
  },
  methods: {
    addRow() {
      this.inputs.push({
        name: "",
        phone: "",
        email: ""
      });
    },
    deleteRow(index) {
      this.inputs.splice(index, 1);
    }
  }
}
</script>

<style>

</style>