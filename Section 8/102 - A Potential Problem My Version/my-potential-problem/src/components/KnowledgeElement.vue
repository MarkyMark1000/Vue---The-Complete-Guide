<template>
  <li>
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>
    <button @click="selectTopic(id)">Learn More</button>
  </li>
</template>

<script>
export default {
  // inject select topic, which contains a function that we are going to
  // emit all the way up to App.vue.   It comes from App.vue
  inject: ['selectTopic'],
  props: ['id', 'topicName', 'description'],
  //emits: ['select-topic'],
};
</script>