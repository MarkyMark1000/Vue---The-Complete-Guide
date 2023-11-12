# NOTES ON VUE

These are notes taken when doing the following udemy tutorial on Vue3:

https://www.udemy.com/course/vuejs-2-the-complete-guide/

It has been updated for Vue3

## USEFUL COMMANDS
---

These commands are some of the core commands used with a Vue project, once you
have it installed:
```
vue --version
vue create vue-first-app   (or sudo vue ...)
npm run serve           (or sudo npm ....)
npm install             (or sudo npm ....)
npm run lint            (or sudo npm ....)
npm run build           (or sudo npm ....)
```

This command is particularly useful when debugging Vue projects, but without the
linter throwing an error:
```
debugger; // eslint-disable-line
```

Sometimes, especially after the initial installation of npm or the vue command line
you get errors, these have been useful in the past:
```
npm install -g npm                    // reinstall npm with the latest version
sudo npm cache clean --force          // clears out the cache
```

There are some Vue apps that you should consider installing at the start of a new
project.   The commands are listed below:
```
npm install --save vue-router@next    // install router for multiple urls.
npm install --save vuex@next          // vuex great for communication between components

```

Code Formatting:
Right click and format document if using Volar or Vetur.   If you have 'Format in context menus'
installed, right click multiple documents and select 'format'.

## INITIAL INSTALLATION
---

This should only need to be done once.

Install the latest version of node js.   This will also install npm (node
package manager), which we will use with this.

Then install vue cli using npm.   Search for 'install Vue cli' in google and
it will give you instructions.   Currently it is:
```
npm install -g @vue/cli
vue --version               // to confirm the installation/version
```

There were some issues with this and to start with I ended up using 'sudo'
before npm.   However this seemed to fix the issue more permanently:
```
sudo npm cache clean --force
```

To upgrade, use:
```
npm update -g @vue/cli   (or sudo npm ...)
```

## INITIAL SETUP
---

#### CODE FORMATTING
---

There are 2 VS Extensions used with Vue projects.   Vetur and Volar.   I have found
that Vetur does not work too well with Vue 3 projects.   It will throw errors when
you have multiple template roots, which are allowed in Vue 3 projects.

You can format any individual document by right clicking it and using .Format Document'.
During this process you may need to set Volar as the default Vue 3 formatter.

That being said, there are reports that this issue with Vetur only happens when you don't
open the Vue 3 project as the root folder in VS Code, so the choice is yours.

There is a VS Code extension called 'Format in context menus' that allows you to select
multiple files and format them at once.

You can set VS Code to automatically format code upon save for a user (global) or a 
workspace (project specific).   Goto code => settings => settings and then either pick
'User' or 'Workspace' or the folder.   Search for 'format' and then 'format on save'
should be in the list somewhere.

There are code formatters such as 'Prettier' available, but i'm not sure this is useful
at this stage.

It also looks like it is possible to setup eslint checking and prettier within
pre-commit, which could be useful for controling code standards within a multi
developer project.

#### TYPICAL PROJECT DIRECTORY STRUCTURE
---

```
/node_modules
/public
/src
  - assets                                      Images etc
  - components                                  Used for general components
      - .......
  - router or pages                             Used for router focused components
      - .......
      NotFound.vue
  - store                                       Used for Vuex focused code
      - ........
        index.js
        actions.js                              These could be within a single file!
        getters.js
        mutations.js
      index.js                                  Main import file for dirs below
  - views                                       Optional - not sure what these are yet.
  - docs                                        Optional - documentation directory
  - mixins or composables                       Optional - mixins/composables ie reusable code 
  - helpers                                     Optional - in/out reusable functions.
  globals.js                                    Can be handy for global variables (not many)
```

## DEVELOPMENT OVERVIEW
---

Within the very top level you tend to create an app and then mount it onto a unique
id within the index.html file:
```
const app = Vue.createApp({});
app.mount('#user-goal');
```

#### SUMMARY OF VUE APP - OPTION API
---

There are certain arguments that you can pass to createApp which can be
used to dynamically format the page:

```
const app = Vue.createApp({
    components: {},
    props: [] or {},
    data() { return {}; },
    methods: {},
    computed: {},
    watch: {},
    emits: [] or {},
    provide() { return {}; },
    inject: [] possibly {},
});
```

__components__: This declares components imported locally into the script
    section of the template.   You typically import the component file at
    the top of the script section, then add the component here.   
__props__: These are used in components and declare attributes that can be passed
    down to the component.   
__data__: This returns a dictionary of variables that we will associate with this
    global app or component.   
__methods__: This is a dictionary of functions that are generally associated
    with 'events' OR 'results that you want to calculate whenever the page is
    recalcaluted'.   
__computed__: This is a dictionary of functions that are only calculated
    when a variable that they depend upon is updated.   More efficient
    than methods.   Should return a value.   
__watch__: This is a dictionary of functions with the names of variables or
    computed functions.   They listen to changes in these and then
    execute code when they change.   They are useful for doing things like
    resetting variables once they exceed a certain value.   They are not good
    when you have multiple watchers on one variable.   
__emits__: Used in component to declare what events the component can raise and so
    what the parent app/component can listen for with @.   It is used in conjunction
    with this.$event('blah-blah', ...)   
__provide__: Used when you don't want to use props and emits on every component and
    sub component.   Can save time, but can be difficult to track down where
    change came from.   
__inject__: Used with __provide__, it provides a reference to the provided variable
    or function.   I believe they act more like constants and are not very dynamic.

Within a method, computed function or watch, you must refer to the variables
using 'this'.
As a warning: there are some tricky issues with this in functions.   Somethimes
you can get around issues by defining ```const that = this;``` and using that,
or using ```() =>``` functions instead of ```function () { ... }```.

#### SUMMARY OF VUE APP - COMPOSITION API
---

There are a couple of options with this, I have found the second quite good
for quick solutions to save time.

Traditional Method:
```
import { ref, reactive, computed, watch, provide, inject } from 'vue';

  setup(props, context) {
    const uName = ref('Mark');
    const user = reactive({
        name: 'Mark',
        age: 49
    });
    const cName = computed(function() {
    return firstName.value + lastName.value;
    });
    watch(uName1, function() {
        // can watch multiple variables with list eg [uName1, uName2]
    });

    // props argument provides access to props
    // context can 'emit' and access 'attrs', 'slots' etc

    const uAge = ref(31);
    provide('userAge', uAge);

    // don't forget to return this for template access
    const userAge = inject('userAge');  

    return {
      userName: uName,
      user,
      cName,
      userAge: userAge
    }
  }

```

Shortcut Method:
```
<script setup>
import { ref, reactive, computed, watch, provide, inject } from 'vue';

const uName = ref('Mark');
const user = reactive({
    name: 'Mark',
    age: 49
});
const cName = computed(function() {
return firstName.value + lastName.value;
});
watch(uName1, function() {
    // can watch multiple variables with list eg [uName1, uName2]
});

// At present I am unsure how to deal with props, emit, slots etc

const uAge = ref(31);
provide('userAge', uAge);

// don't forget to return this for template access
const userAge = inject('userAge');  

</script>
```

#### USEFUL JAVASCRIPT
---

```
// access value of calling object from first argument, eg:
changeName(event, arg1){ this.name = event.target.value + arg1; }
// Within Templates use $event, eg:
v-on:click="changeName($event, 'Wilson'):
// Watchers have before/after value:
counter(newvalue, oldvalue)
```   

## DEVELOPMENT
---

#### TEMPLATE
---

#### __v-model='...'__
Used for 2 way binding.   This is very useful with things like input boxes

#### __v-on:click='...' OR @click='...'__
This is how to associate events with methods (generally not computed functions).

#### __v-bind:href="..." OR :href='...'__
If you want a variable, computed function or method to be used within html
attributes you need to use the v-bind followed by the particular attribute.

#### __v-if="...." followed by v-else-if="..." or v-else__
If else etc within the template.   The v-else-if and v-else must follow
a v-if statement.

#### Warning:
There is a weird error, see video 47 and v-if.   It is good practice to use the
:key="..." to uniquely identify a record.

#### __v-show="..."__
This is similar to v-if but doesn't have the else if/else functionality.
When you use v-if, it adds/removes the html.   The v-show just hides the
html on the page and so is much quicker.

#### __v-bind:disabled="..." or :disabled="..."__
I thought I would mention this as well as v-show because he uses it to
disable an element using a data value or function.

#### __v-for='goal in goals'__
This is like a for loop within the html.   There are lots of supported
formats, these are some examples:
```
<li v-for="(goal, index) in goals">{{ goal }}</li>
<li v-for="(value, key) in {'name': 'mark', 'age': 49}">{{ key }}: {{ value }}</li>
<li v-for="(value, key, index) in {'name': 'mark', 'age': 49}">{{ key }}: {{ value }}</li>
<li v-for="num in 10">{{ num }}</li>
```

#### __{{ ... }}__
This is how you output variables, method results or computed function results within
the html.   You can also do basic calculations within them.   Examples:
```
{{ myVariable }}
{{ outputOfFunction() }}
{{ outputOfFunction }}
{{ 1 + 1 }}
```

#### __v-html__
Used for outputting html to the page from variables, methods etc.

#### ___v-once___
Rarely used attribute, see section 2.   Makes a counter calculate once
and then doesn't change after that.

#### __event names__
There are lots of events such as:

```
v-on:input   v-on:keydown.enter     etc
@click.stop - prevents click working on an element which is inside something that
              does have @click
```

WARNING - Try to avoid making data variable names, method, computed function names etc
          the same.   It might stop it from working.

#### __refs__
He talks about ref's.   This is a view property that lets view know that you want access
to the element as and when you need it.   There is then a special way of accessing the data
within app.js.   Within the html you would declare it like this:
```
<input type="text" ref="userText">
```

Within the javascript you would access it like this:

```
setText() {
    console.log(this.$refs.userText);
},
```

#### DYNAMIC STYLING
---

#### IN-BUILT EVENTS
---

#### FULL DETAILS - TEMPLATE, PROPS, ETC ETC.
---

#### DYNAMIC COMPONENTS
---

## API INTERACTION - FETCH ETC
---
This is an important topic, so I have given it it's own section.

## ROUTING
---
This is a bit important topic, so I have given it it's own section

## VUEX
---
This is a bit important topic, so I have given it it's own section

## COMPOSITION API
---
This is a bit important topic, so I have given it it's own section

## FURTHER DEVELOPMENT
---
This covers development areas that require some knowledge of the previous sections.

#### Transitions and Animation
---

#### Authentication
---

#### Optimizing and Deploying Vue Apps
---

#### Re-using Functionality
---
