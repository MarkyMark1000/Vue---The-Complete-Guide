const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      this.message = this.currentUserInput;
      // THIS IS HOW WE ACCESS REF'S IN JAVASCRIPT/VUE.
      console.log(this.$refs.userText);
    },
  },
  /*
  There are a set of inbuilt events that we can add vue code for the Vue App lifecyle
  see video 66 and 67.   These include:
  beforeCreate(), created(), beforeMount(), mounted(), beforeUpdate(), updated(),
  beforeUnmount(), unmounted()
  */
 beforeCreate(){
  console.log('beforeCreate()');
 }
});

app.mount('#app');
