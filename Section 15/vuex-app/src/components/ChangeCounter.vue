<template>
    <!--
    <button @click="addOne">Add 2</button>
    -->
    <button @click="inc">Add 10</button>
    <button @click="increase({value: 11})">Add 11</button>

</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        // addOne() {
        //     this.$store.commit('increment');
        //     this.$store.dispatch('increment');
        //     //this.$store.state.counter++;
        // }
        // quick way of mapping actions rather than using
        // functions such as the one above.
        // ...mapActions(['increment', 'increase'])
        // Can also map this with an object:
        // ...mapActions({
        //     inc: 'increment',
        //     increase: 'increase'
        // })
        // to use the numbers namespace:
        ...mapActions({
            inc: 'numbers/increment',
            increase: 'numbers/increase'
        })
    },
}
</script>
