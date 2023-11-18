# OVERVIEW

This is based upon the following tutorial:
https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/

## NOTES
---

```
npm create vite@latest test-from-scratch --template vue
cd test-from-scratch
npm install
npm run dev
```

Warning, I found this a bit flaky to start off with.   The following might work:
```
sudo npm cache clean --force           and then npm install
following the link to the log file
follow the path to the thing that it cannot download in the web browser.
removing the node_modules directory and then npm install
```

Install Vitest:
```
npm install -D vitest
```
Again, you may have similar issues to those mentioned above.

Within package.json there should be a "scripts" section, add this into it:
```
"test": "vitest",
```

Next I added a 'vitest.config.js' file and then addes this into it:
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
 test:{
   globals:true,
 }
})
```

Next run this:
```
npm install --save-dev @vue/test-utils
```

And then this:
```
npm install happy-dom@6.0.4
```

After this add --dom to the "scripts" section in the package.json file:
```
"test": "vitest --dom", 
```

Then add happy-dom to the vite.config.js file in the "test" section:
```
environment: 'happy-dom',
```

EXCELLENT, THIS TUTORIAL DOESN'T WORK EITHER.   HHMMM VERY DODGY.

