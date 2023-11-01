<template>
    <h3>{{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        // counter() {
        //     // return this.$store.state.counter;
        //     // We now use a getter to access data
        //     return this.$store.getters.finalCounter;
        // },

        // It is possible to just map specific getters without
        // the need to use functions such as those above.
        // ...mapGetters(['finalCounter'])
        // If using a namespace with mapGetters pass it in as
        // the first argument:
        ...mapGetters('numbers',['finalCounter'])
    }
}
</script>
