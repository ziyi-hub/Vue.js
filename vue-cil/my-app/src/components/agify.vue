<template>
  <div style="background-color:#EEE; padding:20px; margin:10px;">
    <div>
      <h3>Estimation de l'âge</h3>
      <input type="text" v-model="name"/>
      <button v-on:click="search">Ok</button>
    </div>
    <section v-if="errored">
      <p> Désolée, Nous n'avons pas accéder aux données du serveur pour le moment, réessayer plus tard </p>
    </section>

    <section v-else>
      <div v-if="loading">
        <spinner></spinner>
      </div>
      <div v-else>
        <h2>age : {{ info.age }}</h2>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from "axios";
  import Spinner from "./spinner.vue";

  export default{
    components: { Spinner },
    data () {
      return {
        errored : false,
        loading : true,
        name : null,
        info : null,
      }
    },
    methods: {
      search(){
        this.created();
      },

      created(){
        axios
          .get("https://api.agify.io?name=" + this.name)
          .then(response => {
            this.info = response.data;
          })
          .catch(error => {
            this.errored = true;
          })
          .finally(() => this.loading = false);
      }
    },
  }


</script>

<style>

</style>
