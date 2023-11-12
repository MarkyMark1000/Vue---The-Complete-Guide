<template>
  <h2>My Course Goal</h2>
  <!-- Task 1: Output your main course goal with help of the composition API -->
  <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
  <h3 v-if="visible">{{ goal }}</h3>
  <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
  <button @click="toggleGoalVisibility">Toggle Goal</button>
  <!-- Task 3: Manage data in three ways -->
  <!-- => Separate refs -->
  <!-- => Ref Object -->
  <!-- => Reactive Object -->
  <!-- Task 4: Also solve the assignment with the Options API -->
</template>


// <script setup>
// I wanted to try this format out.
// import { ref } from 'vue';
// import { reactive } from 'vue';

// const courseGoal = ref('To learn Vue!!');
// const goalVisible = ref(true);
// function toggleGoalVisibility() {
//       goalVisible.value = !goalVisible.value;
// }

// const courseInfo = ref({
//   goal: 'To learn Vue!!!',
//   visible: true
// });
// function toggleGoalVisibility() {
//   courseInfo.value.visible = !courseInfo.value.visible;
// }

// const courseInfo = reactive({
//   goal: 'To learn Vue!!!',
//   visible: true
// });
// function toggleGoalVisibility() {
//   courseInfo.visible = !courseInfo.visible;
// }

// </script>

// Using options api
<script>

export default {
  data() {
    return {
      goal: 'To learn Vue!!!',
      visible: true,
    };
  },
  methods: {
    toggleGoalVisibility() {
      this.visible=!this.visible;
    }
  }
}
</script>

<style>

</style>
<style>
html {
  font-family: sans-serif;
}
body {
  margin: 3rem;
  text-align: center;
}
</style>