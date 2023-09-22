const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      confirmedName: '',
    };
  },
  methods: {
    confirmInput(){
      self.confirmedName = self.name;
    },
    submitForm(event){
      alert('Submitted!');
      // an alternative:
      // this.name = 'Submitted and all signed up!';
    },
    setName(event, lastName){
      this.name = event.target.value + ' ' + lastName;
    },
    remove(){
      this.counter--;
    },
    adjust(num){
      this.counter += num;
    }
  },
});

app.mount('#events');
