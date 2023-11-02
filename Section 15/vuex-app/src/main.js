import { createApp } from 'vue';

import App from './App.vue';

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

// THERE IS A GOOD VIDEO 224 THAT SHOWS HOW TO BREAK THE CODE DOWN
// INTO A store FOLDER AND CREATE THE vuex SYSTEM.

import store from './store/index.js';

const app = createApp(App);

app.use(store);

app.mount('#app');