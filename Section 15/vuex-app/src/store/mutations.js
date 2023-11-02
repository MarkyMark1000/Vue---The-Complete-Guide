export default {
    // Mutations must be syncronous, you cannot execute code that can take
    // a long time.
    setAuth(state, payload) {
        state.isLoggedIn = payload.isAuth;
    }
};