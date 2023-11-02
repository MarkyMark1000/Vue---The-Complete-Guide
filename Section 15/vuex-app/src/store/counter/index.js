
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
import counterMutations from './mutations.js';
import counterActions from './actions.js';
import counterGetters from './getters.js';

export default {
    namespaced: true,           // limits how data is accessed
    state() {
        return {
            counter: 0,
        };
    },
    mutations: counterMutations,
    actions: counterActions,
    getters: counterGetters,
};