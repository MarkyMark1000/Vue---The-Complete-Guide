<template>
  <div>
    <the-header></the-header>
    <button @click="activeComponent='active-goals'">Active Goals</button>
    <button @click="activeComponent='manage-goals'">Manage Goals</button>
    <!--
      vue provides a component element that lets you switch between
      the component it displays
    -->
    <keep-alive>
      <component :is="activeComponent"></component>
  </keep-alive>
  </div>
</template>

<script>
// Local Declaration
// import UserInfo from './components/UserInfo.vue';
// import BadgeList from './components/BadgeList.vue';
import TheHeader from './components/TheHeader.vue';
// import CourseGoals from './components/CourseGoals.vue';
import ActiveGoals from './components/ActiveGoals.vue';
import ManageGoals from './components/ManageGoals.vue';
import ErrorAlert from './components/ErrorAlert.vue';

export default {
  // Local Declaration
  components: {
    TheHeader, ActiveGoals, ManageGoals, ErrorAlert
  },
  data() {
    return {
      activeUser: {
        name: 'Maximilian Schwarzmüller',
        description: 'Site owner and admin',
        role: 'admin',
      },
      activeComponent: 'active-goals'
    };
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>