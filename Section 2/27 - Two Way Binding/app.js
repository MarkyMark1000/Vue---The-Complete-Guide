const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: ''
    };
  },
  watch: {
    /*
      Watchers are interesting, the name shouild be the same as
      a specific data variable.   They are useful if you want to
      change data values under certain conditions.   Not very
      good when you have multiple watchers on different variables
    */
    counter(newvalue, oldvalue){
      if(newvalue>50){
        this.counter=0;
      }
    }
  },
  computed: {
    fullname(){
      /*
        This is used in the html as an alternative to
        outputFullName to prevent it being recalculated whenver
        one of the other buttons is hit
      */
      if(this.name===''){
        return '';
      };
      return this.name + ' ' + 'Wilson';
    }
  },
  methods: {
    outputFullName(){
      if(this.name===''){
        return '';
      };
      return this.name + ' ' + 'Wilson';
    },
    setName(event, lastName) {
      this.name = event.target.value;
    },
    resetInput(){
      this.name = '';
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    }
  }
});

app.mount('#events');
