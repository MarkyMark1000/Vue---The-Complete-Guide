export default {
    // Important concept.   This is where we run asyncronous code such as
    // http requests.   It is considered good practice to always put an
    // action between a component and a mutation, not call within the component.
    login(context) {
        context.commit('setAuth', {isAuth: true});
    },
    logout(context) {
        context.commit('setAuth', {isAuth: false});
    }
};