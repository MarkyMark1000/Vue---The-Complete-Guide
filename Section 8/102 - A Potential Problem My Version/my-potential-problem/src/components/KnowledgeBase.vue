<template>
  <section>
    <h2>Select a Topic</h2>
    <!--
      1 - This is just a pass-through component that pushes events and data onto knowledge-grid. 
      This is something that can happen in production code.

      This is the key problem.   This code is basically redundant and just passes data and
      events through this component.   There is a solution to this called provide and inject.

      <knowledge-grid :topics="topics" @select-topic="$emit('select-topic', $event)"></knowledge-grid>  
    -->
    <knowledge-grid :topics="topics"></knowledge-grid>
  </section>
</template>

<script>
export default {
  props: ['topics'],
  //emits: ['select-topic'],
};
</script>