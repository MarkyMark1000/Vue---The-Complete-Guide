# VUEX
---

To install, run this:
```
npm install --save vuex@next
```

You need to add some code into main.js to set this up:
```
import { createStore } from 'vuex';

....

const store = createStore({
    state() {
        return {
            counter: 0
        };
    }
});

...

app.use(store);
```