const app = Vue.createApp({
    data() {
        return {
            name: 'Mark',
            age: 49,
            googleImage: 'https://hexomatic.com/academy/wp-content/uploads/2022/07/how_to_download_images_from_urls_tutorial.jpg',
        };
    },
    methods: {
        favouriteNumber(){
            const randomNumber = Math.random();
            return randomNumber;
        }
    }
});

// Tell Vue which piece of html to associate code with.
app.mount('#assignment');