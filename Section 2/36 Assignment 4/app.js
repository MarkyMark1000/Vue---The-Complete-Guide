debugger;
/*
He's solution to this was more elegant.   For a start, with the
paragraphStyle function, he used dictionaries more elegantly and
returned something like this:
return {
    user1: this.inputClass==='user1',
    user2: this.inputClass==='user2,
    visible: this.visible,
    hidden: !this.visible,
};
He also used v-model more for the input boxes.   To change the
background color he had something like this in the html:
:style="{backgroundColor: color}"
*/

const app = Vue.createApp({
    data() {
        return {
            inputClass: '',
            visible: true,
            color: ''
        };
    },
    methods: {
        updateInputClass(event) {
            this.inputClass = event.target.value;
        },
        updateVisibility(){
            this.visible = !this.visible;
        },
        updateColor(event){
            this.color = event.target.value;
        }
    },
    computed: {
        getColor(){
            return {backgroundColor: this.color};
        },
        paragraphStyle(){
            if (this.visible)
            {
                if(this.inputClass==='user1')
                {
                    return {user1: true, visible: true};
                }
                else if(this.inputClass==='user2')
                {
                    return {user2: true, visible: true};
                }
                else
                {
                    return {visible: true};
                }
            }
            else
            {
                return {hidden: true};
            }
        }
    },
});

app.mount('#assignment');