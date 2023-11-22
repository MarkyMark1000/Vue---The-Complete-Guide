# OVERVIEW

This is to practice setting up a vite only project using the instructions here:
https://vitejs.dev/guide/
and then
https://vitest.dev/guide/

TESTED:   ALL OF THIS WORKS WHEN I TRIED IT OUT.

```
npm create vite@latest
or
or something similar to:
npm create vite@latest my-vue-app -- --template vue
```

THIS SEEMS NICE AND EASY AND FOLLOWING THE FIRST VERSTION WORKED.   BEWARE
THE EXTRA -- IN THE SECOND VERSION, IT'S NEW AND MAY HAVE BEEN THE CAUSE OF
PREVIOUS ISSUES.

```
cd test_app
npm install
npm run dev
```

Then this:
```
npm install -D vitest
```

I then created a tests directory and helpers directory in src and added
the helper file and unit test in the appropriate areas using the appropriate
paths.

Next add "test" into the "scripts" area of package.json:
```
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run this to execute the changes.   It leaves the server up and running so
you can do dev work:
```
npm run test
```

Extra commands that may be useful:
```
vite build                  # build release version for static webserver

```

Extra installations that may be useful:
```
npm i -D @vitest/ui
npm run test --ui
```

### coverage
---

I noticed this in the documentation, so tried to work out how to use it:

Add the following into package.json:
```
"coverage": "vitest run --coverage"
```

Try running this:
```
npm run coverage
```

It then tells you what dependency you are missing.   Try installing it:
```
npm install @vitest/coverage-v8
```

This tends to only test files that have unit tests associated with them.
You can get it to cover all files and exclude certain areas by updating
vite.config.js to include something like this:
```
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/**',
        'src/utilities/**',
        'dist/**',
        'public/**',
    ],
      reporter: ['text', 'json', 'html'],
    },
  },
```

I don't think the reporter option is necessary.   When you run coverage, it
will add a 'coverage' directory with an html report in if you have the 'html'
reporter enabled.   I guess you can delete the 'coverage' directory or
exclude it within .gitignore.

#### Extra Packages that Might be useful:
---

__VITE__

npm add -D @vitejs/plugin-legacy                # lets vite build for legacy browsers.
https://vitejs.dev/guide/using-plugins.html

Deploying to a static website:

Make sure you have these build and preview scripts setup within your config:
```
"scripts": {
    "build": "vite build",
    "preview": "vite preview"       // for previewing the build locally 
}
```

You then use these to try them out:
```
npm run build
npm run preview
```

__GITHUB PAGES/AWS ETC__

Interesting and potentially useful:

This is interesting.   You can create a website that display directly from github when the
code is pushed up:
https://pages.github.com

Apparently there are configuration settings for vite on github pages, but it also has
instructions on deploying SPA's on Amazon Amplify (see close to bottom of page):

https://vitejs.dev/guide/static-deploy.html

## BACK TO TESTING WITH VITEST
---

It is possible to run scripts concurrently, ie in parallel, to speed things up:
```
import { describe, it } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
  it('serial test', async () => { /* ... */ })
  it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
})
```

If you use it on a suite, every test in it will be run in parallel:
```
import { describe, it } from 'vitest'

// All tests within this suite will be run in parallel
describe.concurrent('suite', () => {
  it('concurrent test 1', async ({ expect }) => { /* ... */ })
  it('concurrent test 2', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 3', async ({ expect }) => { /* ... */ })
})
```
https://vitest.dev/guide/features.html#running-tests-concurrently

It talks about snapshot, which looks like a mechanism for making sure a
website doesn't change unexpectedly:
https://vitest.dev/guide/features.html#snapshot

There is a section on mocking and this seems to talk about two extra things
that may need to be installed, 'happy-dom' and 'jsdom'.

There are a number of things discussed within this document, but it doesn't
really give you a tutorial:
https://vitest.dev/guide/features.html


It is possible to specify timeouts on tests:
```
import { test } from 'vitest'

test('name', async () => { /* ... */ }, 1000)
```
or
```
import { beforeAll } from 'vitest'

beforeAll(async () => { /* ... */ }, 1000)
```
https://vitest.dev/guide/filtering.html#specifying-a-timeout

You can skip tests and suites:
```
import { assert, describe, it } from 'vitest'

describe.skip('skipped suite', () => {
  it('test', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})

describe('suite', () => {
  it.skip('skipped test', () => {
    // Test skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```
https://vitest.dev/guide/filtering.html#skipping-suites-and-tests



THERE IS AN ENTIRE SECTION ON MOCKING HERE (WILL BE USEFUL IN FUTURE):
https://vitest.dev/guide/mocking.html


__VITEST UI__

IMPORTANT - VITEST PROVIDES A USER INTERFACE WHICH CAN BE USEFUL FOR DEBUGGING
BUT YOU NEED TO INSTALL IT:
https://vitest.dev/guide/ui.html


__DEBUGGING (ESP IN VSCODE)__

IMPORTANT

They have an interesting section on debugging here:
https://vitest.dev/guide/debugging.html

Apparently within VSCode you can open a terminal (like zsh, bash, rosetta etc)
called 'Javascript Debug Termina'.
You open a new one of these and then type ```npm run test``` or ```vitest```.
It should then stop on breakpoints etc


__MAIN API REFERENCE__

IMPORTANT

https://vitest.dev/api/




## NEXT STEPS ##

I suggest going through these and trying to build them without installing any extra
packages and see what can be achieved.   Then add the extra packages as required
so that I get a feel for exactly what they do:

https://vueschool.io/articles/vuejs-tutorials/start-testing-with-vitest-beginners-guide/
https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/
https://testdriven.io/blog/vue-unit-testing/

## start-testing-with-vitest-beginners-guide
---

I used this to initiate the project:
```
npm init vue@3      (vue and javascript and eslint)
cd start-testing-with-vitest-beginners-guide
npm install
npm run dev
```

IMPORTANT:   This installation technique seemed to be the only one I could find that would let
me install eslint and vitest at the same time.





This was added to scripts:
```
"test": "vitest"
```

I also added eslint:
```
npm init @eslint/config
```


A new test was added in a new tests/unit directory called HelloWorld.spec.js:
```
import {describe, it, expect} from 'vitest';
//import {mount} from '@vue/test-utils';
import HelloWorld from '../../components/HelloWorld.vue';

describe("HelloWorld", () => {
    it("renders properly", () => {
        const wrapper = mount(HelloWorld, {props: {msg: 'Hello Vitest'}});
        expect(wrapper.text()).toContain('Hello Vitest');
    })
})
```