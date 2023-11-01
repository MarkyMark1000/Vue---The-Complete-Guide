<template>
    <h3>{{ counter }}</h3>
    <p>We do more ...</p>
</template>

<script>

export default {
    computed: {
        counter() {
            // return this.$store.state.counter;
            // We now use a getter to access data
            // return this.$store.getters.normalizedCounter;
            // We can use a namespace to access data.   numbers
            // is used to add the module into vue in main.js:
            return this.$store.getters['numbers/normalizedCounter'];
        },
    },
}
</script>
