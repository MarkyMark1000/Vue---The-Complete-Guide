<template>
  <ul>
    <!--
      2 - This uses the passthrough from ActiveElement to bind some data and can
      raise the event select-topic

      We remove select-topic when passing events all the way up to App.vue

    <knowledge-element
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
      @select-topic="$emit('select-topic', $event)"
    ></knowledge-element>

    -->
    <knowledge-element
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
    ></knowledge-element>
  </ul>
</template>

<script>
export default {
  // Use inject to pass data down without needing to declare it in every
  // sub component that uses it.
  inject: ['topics']
  //props: ['topics'],
  //emits: ['select-topic']
};
</script>