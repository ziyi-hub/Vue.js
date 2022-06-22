<template>
  <div class="box">
    <h1>Cette page se trouve dans le component Homepage.vue</h1>
    <img :src="$parent.picsPath + imagePath" style="width:80%;">
  </div>
</template>

<script>
  export default{
    data(){
      return {
        imagePath: "img1.jpg"
      }
    }

  }
</script>

<style>
  .box{
    margin: 10px;
    padding: 20px;
    background-color: lightgray;
    border: 1px solid darkgray;
  }
</style>
