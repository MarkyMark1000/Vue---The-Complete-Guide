<template>
  <base-container :title="Vuex">
    <!-- We can now access this counter from the global state -->
    <!--
    <h3>{{ $store.state.counter }}</h3>
    <button @click="addOne">Add 1</button>
    -->
    <h1>blah de blah</h1>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';

export default {
  components: {
    BaseContainer,
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    addOne() {
      this.$store.state.counter ++;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>