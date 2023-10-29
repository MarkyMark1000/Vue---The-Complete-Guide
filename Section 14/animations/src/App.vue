<template>
  <div class="container">
    <div class="block" :class="{animate: animatedBlock}"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <!--
      NEW VUE SPECIFIC ELEMENT
      has *-enter-from, *-enter-to and *-enter-active css classes
      which are used to animate addition of element
      has *-leave-from, *-leave-to and *-leave-active css classes
      which animate the removal of element.
      VUE will read the transition, duration etc of these classes
      and only really remove the element once complete.
      <transition> only necessary when using things like v-if
      
      It is possible to change the transition class so that instead
      of working with .v-enter-from etc, it works with .para-enter-from
      You achieve this by using the name property, eg:
      <transition name="para">....
      You can also specify exact classes to use with .v-enter-from etc
      <transition enter-to-class="some-class" enter-active-class="...">

      Key thing - transition is expecting one element inside to attach
      the classes to.   Problem when using custom components that actually
      contain multiple elements next to each other.
    -->
    <transition>
      <p v-if="paraIsVisible"> This is only sometimes visible</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>  

<script>
export default {
  data() {
    return { 
      animatedBlock: false,
      dialogIsVisible: false,
      paraIsVisible: false,
    };
  },
  methods: {
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /*transition: transform 0.3s ease-out;*/   /* USED TO SET THE TIME OF THE ANIMATION */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /*transform: translateX(-150px);*/ /* DEFINES THE ACTUAL ANIMATION */
  animation: slide-fade 0.3s ease-out forwards;
}

.v-enter-from {
  /* opacity: 0;
  transform: translateY(-30px); */
}
.v-enter-active {
  /* transition: all 0.3s ease-out; */
  /* can also use animations, but don't need to/from */
  animation: slide-fade 0.3s ease-out;
}
.v-enter-to {
  /* opacity: 1;
  transform: translateY(0); */
}
.v-leave-from {
  /* opacity: 1;
  transform: translateY(0); */
}
.v-leave-active {
  /* transition: all 0.3s ease-in; */
  animation: slide-fade 0.3s ease-in;
}
.v-leave-to {
  /* opacity: 0;
  transform: translateY(-30px); */
}

/* A MORE DETAILED TRANSFORMATION */
@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-120px) scale(1.1);
  }
  100% {
    transform: translateX(-150px) scale(1);
  }
}

</style>