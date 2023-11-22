# OVERVIEW



This is based upon the following tutorials (basic setup):
https://www.youtube.com/watch?v=vHOMSq3-KMY
This was the second video after the one above
(testing components, computed properties, props, DOM Updates and emit):
https://www.youtube.com/watch?v=36PLEEHVfOU
Next (testing vuex):

testing routing:
https://www.youtube.com/watch?v=Ffbbmlwo0UE
snapshot testing:
https://www.youtube.com/watch?v=_roc9rdRv7Y
There is more advanced stuff on end to end testing:

This is related to the previous tutorials, but looks like a really useful step
into Vite and Vitest:
https://www.youtube.com/watch?v=T7NztKiaX20

(These tutorial are excellent and free, 5* to KoderHQ)

I'm not going to finish this course, but the one after this was Vuex route management
and i'm sure they have things on the router and other methods.   

Excellent, have basic Jest working, just need to pracice.

Is there coverage for Jest ???

This is a useful reference:
https://jestjs.io/docs/api


## NOTES
---

I FOUND THE FOLLOWING INSTALLATION DID NOT WORK.   SOMETHING ABOUT AN INVALID RESPONSE
POSSIBLY DUE TO BAD NETWORK SETTINGS OR BEING BEHIND A PROXY.   I COULD TRY IT WHEN
I AM AT HOME, BUT BECAUSE jest ISN'T THE RECOMMENDED UNIT TEST SOLUTION, I AM GOING TO
LEAVE IT FOR NOW !

When setting up a project using ```vue create someapp```, it is possible to select manual setup.   Within this
section include ```Unit Testing``` and then select ```Jest```.

This installs the following:
- Jest
- Vue CLI Unit Jest Plugin
- Vue-Jest
- Vue Testing Utilities

It also creates the following:
  tests/unit - directory for tests
  jest.config.js - config file for jest

Unit test file names must be similar to the following:
- name.spec.js
- name.spec.ts          // typescript tests
- name.test.js
- name.test.ts          // typescript tests

NEXT STEP - CREATE A PROJECT CALLED example_app_built_with_tests USING THE INSTRUCTIONS ON THE VIDEO AND THEN
COMPARE THE DIRECTORIES AND WHAT IS REQUIRED TO SET THIS UP AFTER CREATING A PROJECT.

## NEWEST TECHNIQUE
[new_example_app]

After mucking around with different things, I decided to try a different technique with
this tutorial.

Firstly npm seems to be really flaky and lots of people seem to recommend yarn.

It turns out that yarn is already packaged with node, you just need to enable it.  There
are of course other options for installation:
https://yarnpkg.com/getting-started/install

```
corepack enable
```

I then created a project from scratch using these settings:
```
vue create new_example_app
manual
babel, linter and unit testing
ESLint with error prevention only
Lint on save
Jest
config files go into package.json
N   to save preset for future projects
```
The first time I did this it asked me what I was going to use as a package manager
and I specified yarn.   Might need to adjust this feature somehow if the option doesn't
appear.

Next steps:
```
cd new_example_app
yarn serve
```

You can then use these commands and they all worked successfully for me:
```
yarn install
yarn serve
yarn build
yarn test:unit
yarn lint
```

The previous notes on what is installed and unit test files names is still valid.

There is a full list of jest matcher in the docs:
https://jestjs.io/docs/expect

Components need to be mounted before they can be tested.   Can use these methods:
```
mount
shallowMount
```

mount uses the component with all of its sub components.   shallowMount replaces
imported components in test component with stubs.   Try mount first, if you
cannot get it to work, then try shallowMount.

Examples of how to test if an element exists:
```
// test an element exists
expect(wrapper.find('element').exists()).toBeTruthy()
// test a class exists
expect(wrapper.find('.class_name').exists()).toBeTruthy()
// test an id exists
expect(wrapper.find('#id_name').exists()).toBeTruthy()
// or, can use true instead of toBeTruthy
expect(wrapper.find('[attribute='value']').exists()).toBe(true)
```

Example:
```
const wrapper = mount(App);
if(expect(wrapper.find('p').exists()).toBeTruthy())
{
  expect(wrapper.text()).toContain('For a guide');
}
```

To find specific components within a test, use these methods:
```
getComponent()
findComponent()
findAllComponents()
```

You can try to find a component and see if the component contains a child.
Examples:
```
const wrapper = mount(parent_component)

// pass the imported component directly
wrapper.findComponent(child_component)

// search by name
wrapper.findComponent({name: 'child_component'})

// by querySelector
wrapper.findComponent('child_component')
wrapper.findComponent('.child_component_class')
wrapper.findComponnet('#child_component_id')     // etc
```

This is how to test that a p component is contained within a child component
and contains 'Hello World':
```
  it('renders hello world within a child', () => {
    const wrapper = mount(App);
    const greet = wrapper.getComponent({name: 'GreetingMessage'});
    
    if(expect(greet.find('p').exists()).toBe(true)) {
      expect(greet.text()).toBe('Hello World');
    }
  })
```

#### Computed Properties

If we want to test computed properties, we have two options:
mount()     - tests within the component
call()      - test directly

mount example:
```
  it('Contains computed property Mark Wilson', () => {
    const wrapper = mount(App);
    // this will fail if 'Mark Wilson' is not within the text
    // of the component
    expect(wrapper.text()).toContain('Mark Wilson');
  }),
```

call example:
```
  it('Contains computed value John Doe', () => {
    // cannot use this, not defined yet, so create sample values
    const testValues = {
      firstName: 'John',
      lastName: 'Doe'
    };
    expect(App.computed.fullName.call(testValues)).toBe('John Doe');
  })
```

#### Props

Have two options again
mount()     - tests within the component
props()      - test directly in child component

mounted example:
```
  it('New Greeting prop', () => {
    // This fails if greeting prop isn't within App
    const wrapper = mount(App, {
      props: {
        greeting: 'Blah de Blah'
      }
    })
    expect(wrapper.text()).toContain('Blah de Blah')
  })
```

We test the child component and its prop directly
expect(child_wrapper.props('prop_name')).toBe(prop_value)

example:
```
it('Renders message in prop', {
  const wrapper = mount(App);
  const greet = wrapper.getComponent({
    name: 'GreetingMessage'
  });
  expect(greet.props('greeting')).toBe('Hello World');
})
```

#### DOM Updates

Quite often you will get situations where you hit a button and it performs
some action.   Unfortunately the dom does not update instantly, so you may
need to use await:
NOTE async AND await
```
it('increments counter when button is clicked', async () => {
  const wrapper = mount(App);
  await wrapper.find('button').trigger('click');
  expect(wrapper.text()).toBe('Clicks: 1');
})
```

#### Emit

Emitted data has the following format:
```
{
  event_name: [[value]],
  event_type: [[[type]]]
}
```
If an event is triggered multiple times it will be tracked in the outer arrays,
if an event passes multiple values, it will be tracked within the inner arrays.

We track the value like this:
```
emitted().event_name[0][0].toBe(['value']);
```

Example:
```
it('emit count event with correct payload', async () => {
  const wrapper = mount(App);

  // trigger emit twice
  await wrapper.find('button').trigger('click');
  await wrapper.find('button').trigger('click');

  console.log(wrapper.emitted());

  expect(wrapper.emitted()[0][0].toBe(1));
  expect(wrapper.emitted()[1][0].toBe(2));
})
```

#### coverage

This is a section that I added due to interest.

I found that to get coverage working you need to add this into the package.json file:
```
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
    "coverageDirectory": "./coverage",
    "collectCoverageFrom": ["./src/**"]
  },
```
You could also add an npm shortcut for coverage if you are going to use npm, eg:
```
"coverage": "vue-cli-service test:unit --coverage",
```

You then run the coverage report using something like this:
```
yarn jest --coverage
npm run coverage
```

It tells you what directory to look at and where to put the output directory.   Need
to research more.   Some people indicate it may fail with updates if you don't use
jest file directly etc.   Read more.

#### TESTING VUEX

Example:
```
import { createStore } from 'vuex';
import store from '@/store/index';

describe('Vuex', () => {
  // Useful, resets the state before each test, so tests don't interfer
  // with each other
  beforeEach(() => {
    store.state.coumt = 0;
  })

  it('test-summary', () => {

    // commit mutation
    store.commit('mutation_function');

    // test its effect
    expect(store.state.value).toBe(value);
  })

  // Another problem is when you test components that import the
  // store and can potentially adjust the data.   We create a local
  // verstion of the store.
  // I'm not really sure of the benefit of this because we are just
  // creating the code here.   Research this later.
  // PERHAPS I CAN IMPORT CONFIG FILES FOR THE TEST.
  it('mutation count with local store', () => {
    const store = createStore({
      state: {
        count: 0
      },
      mutations: {
        increment(state) {
          state.count += 1;
        }
      }
    });

    store.commit('increment');

  })

  // WE CAN ALSO TEST GETTERS BY ADJUSTING THE DATA AND THEN TESTING GETTERS, EG
  expect(store.getters.getCount).toBe(1);

})
```

#### TESTING ROUTING

Similar to previous section, need to create a local version of the router (IDEA:
TRY DOING THIS BY IMPORTING THE .js CONFIG FILES).
It has to be done asyncronously so the router has time to navigate to the page.

```
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import App from '../../src/App.vue';
import AboutView from '../../srv/views/AboutView.vue';

describe('App', () => {
  it('renders a component via routing', async () => {
    // potentially import files rather than create locally!!
    const router = createRouter({
      history: createWebHistory(),
      routes: [{
        path: '/about',
        name: 'About',
        component: AboutView
      }]
    });

    router.push('/about');
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    });

  })
})


```

#### SNAPSHOT TESTING

The idea here is that you take a snapshot image of a component and then compare
it to a previous snapshot image of a component.   If there are any changes the
test fails.

Typically, pages display differently in different size browsers, so jest records
the image as a serialized string.   It's not a test for specific features.

You should try to limit it to one test per component.   Components are subject to
change and can fail quite easily.

The first time we run the test, it creates a snapshot file of the output in a
__snapshots__ directory.   The second time we run it, the test is run and then
the output is compared to the most recent snapshot.
Because we can legitimately change snapshots, we need to add a new command to
the config 
```
"test:unit:update": "vue-cli-service test:unit -u",
```
You then run the command:
```
npm run test:unit:update
```

Example test:
```
import {mount} from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('Hello World', () => {
  it('renders correctly', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.element).toMatchSnapshot();
  })
})
```

#### END TO END TESTING

This involves simulating the actions that a user is expected to perform, eg:
- open a browser
- press a button to increase a counter
- select the element that contains the counter and compare the new/old value
- end the test and display the result.

There are problems with end to end testing:
- tests are slow
- tests are more difficult to debug
- tests can depend upon external api's or features and fail unexpectedly

cypress is used for this in the tutorial and it isn't covered here.

