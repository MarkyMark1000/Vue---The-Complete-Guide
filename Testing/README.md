# OVERVIEW

This is not part of the 'Vue - The Complete Guide' tutorial.   However testing is pretty
important in any programing language, so I wanted to spend some time here.

vuejs.or has a section on testing:
https://vuejs.org/guide/scaling-up/testing.html

Within this document, it recommends that you pay consideration to the following types
of tests:

__Unit__: Checks that inputs to a given function, class, or composable are producing the expected output or side effects.
__Component__: Checks that your component mounts, renders, can be interacted with, and behaves as expected. These tests import more code than unit tests, are more complex, and require more time to execute.
__End-to-end__: Checks features that span multiple pages and makes real network requests against your production-built Vue application. These tests often involve standing up a database or other backend.

It gives an example of creating a unit test, but doesn't show you how to run it.

#### Recommendations for testing:

Vitest - created by the Vue/Vite team members.   Vite is a local development server written
by the author of Vue.   It is Good for components or composables that render headlessly.   Components and DOM can be tested using ```@vue/test-utils```

Peeky -  a fast unit test runner with first-class Vite integration. It is also created by a Vue core team member and offers a GUI-based testing interface.

Jest - seems to be a popular online option, but it isn't recommended unless you have a
Jest based project already.

Cypress Component Testing - for components whose expected behavior depends on properly rendering styles or triggering native DOM events. It can be used with Testing Library via @testing-library/cypress.





The main differences between Vitest and browser-based runners are speed and execution context. In short, browser-based runners, like Cypress, can catch issues that node-based runners, like Vitest, cannot (e.g. style issues, real native DOM events, cookies, local storage, and network failures), but browser-based runners are orders of magnitude slower than Vitest because they do open a browser, compile your stylesheets, and more. Cypress is a browser-based runner that supports component testing