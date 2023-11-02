export default {
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
};