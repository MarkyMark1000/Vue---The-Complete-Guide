<template>
  <base-container title="Vuex" v-if="isAuth">
    <!-- We can now access this counter from the global state -->
    <TheCounter></TheCounter>
    <FavouriteValue></FavouriteValue>
    <ChangeCounter></ChangeCounter>
    <button @click="addOne">Add 10</button>
  </base-container>
  <base-container title="Auth">
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue';
import ChangeCounter from './components/ChangeCounter.vue';
import FavouriteValue from './components/FavouriteValue.vue';
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavouriteValue,
    UserAuth,
  },
  computed: {
    isAuth() {
        return this.$store.getters.userIsAuthenticated;
    }
  },
  methods: {
    addOne() {
      //this.$store.state.counter += 11;
      // this.$store.commit('increment');
      // this.$store.commit('increase', {value: 10});
      // This will also work:
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10
      // });
      // We stop this from working:
      // this.$store.commit('increase', {value: 10});
      // Now we call an action (for async code)
      //this.$store.dispatch('increment');
      // to dispatch when using the numbers namespace:
      this.$store.dispatch('numbers/increment');
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