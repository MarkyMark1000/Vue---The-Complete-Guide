import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

/*
After doing a Vue project, this concept would have been very useful.   A global
state that can be updated by any component, ie the counter.   It is possible but
bad practice to update the state directly.   We try to create mutations that
can be called to change the state using something like this:
        this.$store.commit('increment');
Mutations are considered good practice rather than changing state within code.

*/
const store = createStore({
    state() {
        return {
            counter: 0
        };
    },
    mutations: {
        increment(state) {
            state.counter = state.counter+2;
        },
        increase(state, payload) {
            state.counter += payload.value;
        }
    }
});

const app = createApp(App);

app.use(store);

app.mount('#app');