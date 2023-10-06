<template>
  <div>
    <the-header></the-header>
    <badge-list></badge-list>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
    <course-goals>
      <!-- interesting example, we are passing html to the component that uses
          slots, but we don't have access to the goal variable defined inside
          the component.   Here we use scoped slots
      -->
      <template #default="slotProps">
        <!--
          slotProps is just a name we pick, but we access .item from the slot
          defined within CourseGoals.vue.
        -->
        <h2> {{ slotProps.item }}</h2> 
        <p> {{ slotProps['another-prop'] }}</p>

      </template>
    </course-goals>
  </div>
</template>

<script>
// Local Declaration
import BadgeList from './components/BadgeList.vue';
import UserInfo from './components/UserInfo.vue';
import TheHeader from './components/TheHeader.vue';
import CourseGoals from './components/CourseGoals.vue';

export default {
  // Local Declaration
  components: {
    BadgeList, UserInfo, TheHeader, CourseGoals
  },
  data() {
    return {
      activeUser: {
        name: 'Maximilian Schwarzmüller',
        description: 'Site owner and admin',
        role: 'admin',
      },
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