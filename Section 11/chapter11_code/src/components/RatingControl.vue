<template>
    <ul>
        <li :class="{active: modelValue==='poor'}"><button type="button" @click="activate('poor')">Poor</button></li>
        <li :class="{active: modelValue==='great'}"><button type="button" @click="activate('great')">Great</button></li>
        <li :class="{active: modelValue==='average'}"><button type="button" @click="activate('average')">Average</button></li>
    </ul>
</template>

<script>
/*
Ch 147 - Useful/Interesting:   There is a really interesting point here.   he was pointing out
that it is possible to bind thigs (say in TheForm.vue) to sub component values using v-model.
You need to have specific props/events within the sub-component.
'modelValue' and 'update:modelValue'
*/
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    
    // can't use this anymore.   need to reference modelValue!

    //data() {
    //    return {
    //        activeOption: this.modelValue,      //initialized to modelValue prop
//
    //    }
    //},
    methods: {
        activate(option) {
            this.activeOption = option;
            console.log('activeOption:');
            console.log(this.activeOption);
            this.$emit('update:modelValue', option);       // updateModelValue emits.
        }
    }
}
</script>


<style scoped>
.active {
  border-color: #a00078;
}

.active button {
  color: #a00078;
}

ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
}

li {
  margin: 0 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>