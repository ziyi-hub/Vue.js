<template>
  <div style="background-color:palegreen; padding:20px; margin:10px; border:1px solid black;">
    <h2>{{count}}</h2>
    <button v-on:click="count += 10">
      Vous m'avez clique {{count}} fois
    </button>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        count : 0
      }
    }
  }

</script>

<style>

</style>
