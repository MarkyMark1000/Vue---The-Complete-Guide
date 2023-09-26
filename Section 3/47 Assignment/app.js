const app = Vue.createApp({
    data (){
        return {
            txtInput: '',
            tasks: [],
            showList: true,
        };
    },
    methods: {
        clickButton(){
            this.tasks.push(this.txtInput);
        },
        toggleListDisplay(){
            this.showList = !this.showList;
        }
    }
});
app.mount("#assignment");