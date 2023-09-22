const app = Vue.createApp({
    data() {
        return {
            courseGoalA: 'Finish the course and learn Vue!',
            // When outputting html, you need to use th v-html attribute
            // within the html
            courseGoalB: 'Master Vue and build amazing Apps',
            vueLink: 'https://vuejs.org/'
        };
    },
    methods: {
        outputGoal(){
            const randomNumber = Math.random();
            if(randomNumber<0.5)
            {
                // This is how we refer to data/variables within Vue data
                return this.courseGoalA;
            }
            else
            {
                // how to refer to data/variables within Vue data
                return this.courseGoalB;
            }
        }
    }
});

// Tell Vue which piece of html to associate code with.
app.mount('#user-goal');