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
            counter: 0,
            isLoggedIn: false,
        };
    },
    mutations: {
        // Mutations must be syncronous, you cannot execute code that can take
        // a long time.
        increment(state) {
            state.counter = state.counter+10;
        },
        increase(state, payload) {
            state.counter += payload.value;
        },
        setAuth(state, payload) {
            state.isLoggedIn = payload.isAuth;
        }
    },
    actions: {
        // Important concept.   This is where we run asyncronous code such as
        // http requests.   It is considered good practice to always put an
        // action between a component and a mutation, not call within the component.
        increment(context) {
            // Call async code and then run 'increment' mutation.
            setTimeout(function() {
                context.commit('increment');
            }, 2000);
        },
        increase(context, payload) {
            /*
            You can see that context has a number of other properties/methods.
            In particular 'dispatch'.   You can dispatch another actoin from
            within an action.   Can also access getters and state etc.
            */
            console.log(context);
            context.commit('increase', payload);
        },
        login(context) {
            context.commit('setAuth', {isAuth: true});
        },
        logout(context) {
            context.commit('setAuth', {isAuth: false});
        }
    },
    getters: {
        finalCounter(state) {
            return state.counter;
        },
        normalizedCounter(state, getters) {
            const finalCounter = getters.finalCounter;
            if(finalCounter<0){
                return 0;
            }
            else if(finalCounter > 100){
                return 100;
            }
            return finalCounter;
        },
        userIsAuthenticated(state) {
            return state.isLoggedIn;
        }
    }
});

const app = createApp(App);

app.use(store);

app.mount('#app');