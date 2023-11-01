import { createStore } from 'vuex';

/*
It is possible to split large stores into seperate components:

namespaced allows you to specify that state, mutations etc are
part of a namespace, which is defined by the statement for
including the module, ie:
    modules: {
        numbers: counterModule,
    },
You would then access these features using numbers/increment etc

*/



import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';
import counterModule from './counter/index.js';

const store = createStore({
    // THIS IS USED TO MERGE OTHER MODULES/STORE DEFINTIIONS INTO THIS ONE:
    modules: {
        numbers: counterModule,
    },
    state() {
        return {
            isLoggedIn: false,
        };
    },
    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters
});

export default store;