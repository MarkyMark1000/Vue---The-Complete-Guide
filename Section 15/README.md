# VUEX
---

### QUICK NOTE
---

With respect to his challenge, ie video 225 onwards, I didn't do it here.

### NOTES ON VUEX
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

Good Practice at the Start:
There is a good video (224) that shows how to break large vuex
based projects down into a store folder.   You then create an
index.js, mutations.js, getters.js and actions.js file.   After
that you can use folders to break this global list into sub sections.


