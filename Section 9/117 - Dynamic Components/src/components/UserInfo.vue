<template>
  <section>
    <base-card>
      <!-- here we inject the html into the header slot in base-card -->
      <template #header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
      <!-- remaining html goes into last/remaining slot - we explicity set it here -->
      <template #default>
        <p>{{ infoText }}</p>
    </template>
    </base-card>
  </section>

</template>

<script>
export default {
  props: ['fullName', 'infoText', 'role'],
};
</script>
