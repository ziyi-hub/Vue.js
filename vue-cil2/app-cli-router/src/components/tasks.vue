<template>
  <div>
    <h1>Task List</h1>
    <img :src="$parent.picsPath + imagePath" style="width: 80%;">
  </div>
</template>

<script>
  export default{
    data(){
      return {
        imagePath: "img2.jpg"
      }
    }
  }
</script>

<style>

</style>
