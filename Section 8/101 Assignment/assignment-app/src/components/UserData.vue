<template>
    <form @submit.prevent = "enterUserUpdate">
        <label>Username:</label>
        <input type="text" v-model="inputUserName"/><br>
        <label>Age:</label>
        <input type="text" v-model="inputAge"/><br>
        <button>Submit</button>
    </form>
</template>

<script>
    export default {
        emits: [
            'update-user'
        ],
        data() {
            return {
                inputUserName: '',
                inputAge: ''
            };
        },
        methods: {
            enterUserUpdate() {
                console.log('about to emit update-user: ' + this.inputUserName + this.inputAge);
                this.$emit(
                    'update-user',
                    this.inputUserName,
                    this.inputAge
                );
            }
        }
    };
</script>