export default {
    testAuth(state, getters, rootState) {
        // This won't work because modules have local context
        // return state.isLoggedIn;
        // The way around this is to add rootState and rootGetters
        // arguments to the function (can use _ for unused input
        // variables)
        return rootState.isLoggedIn;
    },
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
};