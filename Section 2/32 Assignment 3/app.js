const app = Vue.createApp({
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
        add(input_number){
          this.counter += input_number;
        },
    },
    computed: {
        calculateOutput(){
          if(this.counter===0){
                return '';
              };
          if(this.counter<37)
          {
            return 'Not there yet!';
          }
          else if(this.counter>37)
          {
            return 'Too much!';
          }

          return 37;
        }
      },
      watch: {
        counter(newvalue, oldvalue){
          const that = this;
          setTimeout(
            function(){
              that.counter = 0;
            },
            5000
          );
        }
      },
  });
  
  app.mount('#assignment');
  