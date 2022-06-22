<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <increment></increment>
    <message>
      Intégrer un component dans vue-cil
    </message>
    <increment></increment>
    <agify></agify>
  </div>
</template>

<script>
import Message from "./components/message.vue";
import Increment from "./components/increment.vue";
import Spinner from "./components/spinner.vue";
import Agify from "./components/agify.vue";

export default {
  name: 'app',
  components: {Increment, Message, Spinner, Agify },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
