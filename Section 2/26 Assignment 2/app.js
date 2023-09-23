debugger;
const app = Vue.createApp({
    data() {
        return {
            keydownText: '',
            keydownEnterText: '',
        };
    },
    methods: {
        clickButton() {
            alert('The button has been clicked');
        },
        keydownEvent(event) {
            this.keydownText = event.target.value;
        },
        keydownEnterEvent(event) {
            this.keydownEnterText = event.target.value;
        }
    },
});

app.mount('#assignment');
