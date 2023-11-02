export default {
    increment(state) {
        state.counter = state.counter+10;
    },
    increase(state, payload) {
        state.counter += payload.value;
    },
};