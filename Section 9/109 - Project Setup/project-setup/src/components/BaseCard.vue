<template>
    <div>
        <!--
            We use slots when we want to use our vue component as a wrapper
            for some other html and in this case apply specific style to it
            The <slot> represents the html enclosed within the component, ie
            <base-card>
                html that will effectively go into slot.
            </base-card>
        -->
        <slot></slot>
    </div>
</template>

<style scoped>
div {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>