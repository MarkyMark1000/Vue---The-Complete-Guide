<template>
    <div class="container">
        <h4> The counter is {{ countResults }}</h4>
        <button @click="addToCounter">Add 1</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const countResults = ref(0);

function addToCounter() {
    countResults.value +=1;
}

</script>

<style scoped>

.container {
    margin: auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
}

</style>