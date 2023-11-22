<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  {{ fullName }}
  {{ greeting }}
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  props: {
    greeting: {type: String}
  },
  data() {
    return {
      firstName: 'Mark',
      lastName: 'Wilson'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
