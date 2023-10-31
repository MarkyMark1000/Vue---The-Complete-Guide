<template>
  <base-container title="Vuex">
    <!-- We can now access this counter from the global state -->
    <TheCounter></TheCounter>
    <ChangeCounter></ChangeCounter>
    <button @click="addOne">Add 10</button>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue';
import ChangeCounter from './components/ChangeCounter.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter
  },

  methods: {
    addOne() {
      //this.$store.state.counter += 11;
      // this.$store.commit('increment');
      this.$store.commit('increase', {value: 10});
      // This will also work:
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10
      // });
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