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

Template Shortcust:
```
:       - v-bind, eg :href="..."
@       - v-on, eg @click
#       - v-slot, eg #header
```

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

It is possible to dynamically style html.   These points are important:

- Use 'style' to override 'class' css attributes.

- It is possible to create styles that are specific to that component using scoped
  styling, ie ```<style scoped>...</style>```

- There are a number of formats for styling html.   It can be useful to use the 'class'
  attribute to keep classes that are not removed and the :class attribute for ones
  that change dynamically.   Examples:

Using an inbuilt dictionary:
```
<div
    class="demo"
    :class="{active: boxCSelected}"
    @click="boxSelected('C')">
</div>
```

Use a computed function that returns a dictionary to control styling, eg return {active: true}
```
<div
    class="demo"
    :class="boxDClasses"
    @click="boxSelected('D')">
</div>
```

A list and be used for multiple complex styling, eg:
```
<div
    :class="['demo', {active: boxESelected}]"
    @click="boxSelected('E')">
</div>
```

It is sensible/good practice to return class attributes as a dictionary in a format
similar to this:
```
myComputedFunction() {
    return {
        hidden: this.isHidden,
        visible: !this.isHidden,
        darkbg: this.isDarkBackground,
        lightbg: !this.isDarkBackground
    };
}
```

#### IN-BUILT EVENTS
---

There are a set of inbuilt events that we can add vue code for the Vue App lifecyle
see video 66 and 67.

These include:
```
beforeCreate(), created()
beforeMount(), mounted()
beforeUpdate(), updated(),
beforeUnmount(), unmounted()
```

In addition to this, when using the composition api, there are some similar functions
that need to be used, eg:   
```
beforeCreated, created => no longer needed   
beforeMount, mounted => onBeforeMount, onMounted   
beforeUpdate, updated => onBeforeUpdate, onUpdated   
beforeUnmount, unmounted => onBeforeUnmount, onUnmounted   
```

#### FULL DETAILS - TEMPLATE, PROPS, ETC ETC.
---
#### Components
We start to split html/styles/javascript into other components that end with the extension
```*.vue``` and are then imported into other components or the core app.

It is good practice to use a naming convention of friendContact and friend-contact
going hand in hand when using and importing components.

Example:
```
const app = Vue.createApp({
    data() {return {};);

// This is the new component
app.component(
    'friend-contact',
    {
        template: `...`,
        data() {return {};},
        methods: {}
    }
);

app.mount('#app');
```

Then within the html of the app, you can call this component, eg:
```
<div>
    <friend-contact></friend-contact>
</div>
```
#### New Development Environment
To start to use Vue effectively we now use the vue command line.

1 - First install the latest version of node js.   This will also install npm (node
package manager), which we will use with this.

2 - You then install vue cli using npm.   Search for 'install Vue cli' in google and
it will give you instructions.   This code may be useful:
```
npm install -g @vue/cli
vue --version
npm update -g @vue/cli   (or sudo npm ...)
vue create vue-first-app   (or sudo vue ...)
```

There were some issues with this, might need to use 'sudo' before npm.   This might
help:   https://stackoverflow.com/questions/62494949/cant-install-vue-cli-macos


If these commands fail with errors (cache folder contains root owned files) this
command can be very useful and may well make everything else work:
```
sudo npm cache clean --force
```

Now you can go into the vue-first-app directory and spin up the web-server
using the following commands:
```
cd vue-first-app
npm run serve           (or sudo npm ....)
```

In the package.json file, there are a set of dependencies that the project depends
upon.   If you are unsure if they are installed and up to date, you can do
```
npm install             (or sudo npm ....)
```

build and minify for production
```
npm run build           (or sudo npm ....)
```

Lint the files
```
npm run lint            (or sudo npm ....)
```

There is more on customizing the configuration:
See [Configuration Reference](https://cli.vuejs.org/config/).


There are 2 VS Extensions used with Vue projects.   Vetur and Volar.   I have found
that Vetur does not work too well with Vue 3 projects.   It will throw errors when
you have multiple template roots, which are allowed in Vue 3 projects.

That being said, there are reports that this issue with Vetur only happens when you don't
open the Vue 3 project as the root folder in VS Code, so the choice is yours.

There is an alternative way of setting up Vue projects, if you need it:
```
npm init vue
```

#### .vue files
The .vue files tend to take the following format:
```
<template>
    Some html (eg <section>) that will be output as part of the component/app.
</template>

<script>
export default {
    data(){ return {...}; },
    methods: {...},
    etc
}
</script>

<style>

</style>
```

Within the main .js file, we now change things slightly to import the
app and components.   This is a global import, you can also import
components to be used within the ```*.vue``` files:

```
import { createApp } from 'vue';
import App from './App.vue';

// This is importing a component
import FriendContact from './components/FriendContact.vue';

const app = createApp(App);

// Register the component with the app
app.component('friend-contact', FriendContact);

app.mount('#app');
```

This is marginally interesting in the ```<style>``` tag, you can import
fonts from Google:
```
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
```

Once you have a component defined, it is possible to pass values down to
the component or capture events passed up.   Within App.vue you would
have something like this:
```
<friend-contact
    v-for="friend in friends"
    :key="friend.id"
    :id="friend.id"
    :name='friend.name'
    :email-address='friend.email'
    @toggle-favourite='toggleFavouriteStatus'
></friend-contact>
```

You bind data to attribues that you pass down, eg :name="..." and when
capturing events you associate it with a routine in App.vue using
@.....="appRoutine" and the event needs to be raised in the component
using $event(....) and preferably declared using ....

By default it will pass values as String, but if you want to pass say
a boolean, you bind the attribute, eg:
    is-favourite='true'  would become   :is-favourite='true'

You can declare a component within the script using the following format,
but I am not sure if it is compulsory.   Perhaps it is when capturing
events:

```
import NewFriend from './components/NewFriend.vue';
export default {
  components: { NewFriend },
  .......
```

#### PROPS and EMITS

These are used in the component and declare variables that can be passed into
or emitted out of the component.   They can be of the following types:
String, Number, Boolean, Array, Object, Date, Function, Symbol
```
<script>
export default {
    props: ['name', 'phoneNumber'],    OR
    props: {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
            validator: function(value) {
                // validator function to ensure input is reasonable.
                return value==='0' || value==='1';
            }
        },
        ...
```

There is a similar system for declaring events that can be emitted by the
component up to the parent component/app.   This uses $emits, eg:

```
emits: ['toggle-favourite']     OR
emits: {
'toggle-favourite': function(id) {
    if(id){ return true;}
    else{
        console.warn('id missing from toggle-favourite');
        return false;
    }
}}

// the declared event is then emitted from a method that
// is connected to something like @click as follows:
toggleFavourite() {
    this.$emit('toggle-favourite', this.id);
}
```

Within forms he got them to work by preventing the submit event
using the following format:
```
@submit.prevent="submitData"
```

You can emit objects/dictionaries and quite often this might be a better
option.

__WARNING__:   don't forget to connect the emit to the parent component method
using something like @my-event="myEvent" in the parent app/component.

#### PROVIDE and INJECT

There is a bit of a problem with props and emits.   When you have applications
that have components dependent upon components, you have to capture and pass
the props down or the emit events up through each component.

Provide and Inject get around this.   I believe they are more like constants
where the value passes down, but there isn't an update method to pass changes
in value back up (like emit).   It can also be difficult to track down where
the code is called from, so use sensible judgement when choosing between
these and props.

It looks like you can also provide functions to the sub components.

Example:
```  
provide() {
    return {
        // We provide the topics dictonary to sub components
        topics: this.topics,
        // We provide the activateTopic METHOD to sub components
        // as selectTopic
        selectTopic: this.activateTopic
    };
},
```

We can then use this in sub components using something like this:
```
    <knowledge-element
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
    ></knowledge-element>

    <button @click="selectTopic(topic.id)">Learn More</button>
</template>

<script>
    export default {
    inject: ['topics', 'selectTopic']
    };
</script>
```

__NOTE__ Provide() goes in the high level app/component and Inject: goes into the
sub components.

#### Global vs Local Registration

Any components imported and added within main.js tend to be global.   It is also
possible to import then within App.vue or any .vue component, where they are
local.   Typical examples are:

Global:
```
import TheHeader from './components/TheHeader.vue';

const theApp = createApp(.....);
theApp.component(TheHeader);            // NOT TRIED OUT YET!
theApp.mount(...);
```

Local:
```
import TheHeader from './components/TheHeader.vue';
...
components: {
    'the-header': TheHeader
}
or
components: {
    TheHeader
}
```

#### Scoped Styling (Good Practice in non App.vue components)

css defined within the ```<style>``` section of any component applies globally.   If you
want to limit the scope of the style to the template the ```<style>``` tag is within you
use this:
```
<style scoped>
```

When rendered this gives your html a unique identifier and modifies the css to
use something like this:
```
<header data-v-988832>
```

#### Slots

Used if you want to wrap some html with another component eg:
```
<my-wrapper-component>
...html....
</my-wrapper-component>
```

Use ```<slot></slot>``` within the my-wrapper-component template to represent
where the html goes.   You can have more than one slot pair within a component,
but only one 'default' component does not need a name, eg:
```
<slot name="header"></slot>
```

Use the 'name' attribute of slots to give them a name.   Then, to inject html
into a 'named' slot, you use v-slot: (not equal) or # as a shortcut:
```
<template v-slot:header>
.....html to inject into header <slot> .....
</template>
```

Use v-slot:default to specify the default slot.

You can also specify default html for the slot, eg:
```
<slot name="header">
   Header is missing
<slot>
```

$slots is available within javascript and you can use it to only display
html if a slot is provided, eg:
```
<!-- only shows if header html is injected -->
<header v-if="$slots.header"> .... </header>
```

There is a shortcut for v-slot.   Use #, eg <template #header>

__WARNING__
There is something call scoped slots (tutorial 116) which didn't work on my
computer.   It is a way for a parent component to pass html to a sub
component that contains <slot></slot>, but the parent has access to
variables used within the sub-component.

You might see things like:
```
<template #default="slotProps">
then access slotProps.item or slotProps['something']
<course-goals #default="slotProps"></course-goals>
```

#### Dynamic Components

Within vue templates you can add the component tab and get it to switch between
displaying different components, eg:
```
<component :is="activeComponent"></component>
```

The component displayed is taken from the activeComponent variable, which can
be changed by buttons etc.

There is a problem with this.   When you switch between components, they are
destroyed, so if you have something like an input box, the entered text will
got to zero.   You can solve this by wrapping it in <keep-alive>:
```
<keep-alive>
    <component :is="activeComponent"></component>
</keep-alive>
```

#### Teleport

See video 119 where he created a dialog using a new vue component and ```<slot>```
instead of an alert button.

The html went in the wrong place semantically, so he demonstrated using the
teleport tags to move the postion of the dialog box to say the body tag or
specific css selectors:
```
<teleport to="body">
    <dialog>
        <slot><slot>
    </dialog>
</teleport>
```

He did not show you how to open the dialog box in its own box, so research this
at some point.   I'm sure there are working examples in this directory structure
somewhere.

#### Fragments

Top level ```<template>``` can have multiple elements, in vue2, everything needed
one element, eg ```<div></div>```.   This can cause some issues when using Vue 3
with Vetur.

#### Style Guide

Vue has some strongly recommended style guides that it might be worth getting
used to.   Google 'Vue Style Guides' or try this:

https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files

#### Extra Interesting Points

v-model will look at the input type (number, text etc) and convert the javascript
variable into that variable type.   Using $refs does not and returns a string.
Also v-model has some input modifiers that can be useful, eg
    v-model.trim, v-model.number, v-model.lazy (less frequent updates)
  
You need a v-model on each checkbox/radio button group with the same name to point
at the same variable.

For checkboxes you need an array, which will end up with the values checked.   Also you
need to add distinct values to each of the checkboxes/radio buttons in the html so that
they have a value to assign to it.
If you work with a single checkbox in a group, then you can use a single variable rather
than an array and it will need/have a value of true or false.

He has an example of validating user input using the blur event on the input box.

In Video 147, there is a really interesting point.   He was pointing out that it
is possible to bind things (say in TheForm.vue) to sub component values using
v-model.   You need to have specific props/events within the sub-component:
```
'modelValue' and 'update:modelValue'
```
You then use modelValue within the component and emit a 'update:modelValue' event when
necessary.


## API INTERACTION - FETCH ETC - VERY IMPORTANT
---
This is an important topic, so I have given it it's own section.   He setups
up a firebase backend to accept and return javascript fetch requests.
See the videos at the start of the chapter.

Don't forget to update the firebase address if you look at this in the future.

https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/

There was an alternative library called axios, but he used fetch to send
data to a webserver.   The first bit of code he used was:

```
fetch(
'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: this.enteredName,
    rating: this.chosenRating
    })
}
);
```

The next step he showed us how to use promises with fetch to GET data.   By default
fetch uses GET, so no need to declare it, or a body or in fact headers:

```
methods: {
loadExperiences() {
    fetch(
    'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
    ).then(
    (response) => {   
        // couldn't use function here, 'this' isn't available, need arrow context
        if(response.ok)
        {
        return response.json();
        }
    }
    ).then(
    (data) => {
        console.log(data);
        const results = [];
        for(const id in data)
        {
        results.push({
            id: id,
            name: data[id].name,
            rating: data[id].rating,
        });
        }
        // overwrite existing results.
        this.results = results;
    }
    )
}
```

__Warning__: it was interesting that the 'this' isn't available if you use traditional function formats here eg marksFunction() {...}.   Instead he used (data) => with the
arrow format.

He adjusted this routine to process errors and update variables if we have an error etc.
It does process code errors, but not server side errors.
```
loadExperiences() {
    this.isLoading = true;
    fetch(
    // to test this, remove .json from the end to simulate an error.
    // also delete data from the firebase database to test for no data
    'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
    ).then(
    (response) => {
        // couldn't use function here, 'this' isn't available, need arrow context
        if(response.ok)
        {
        return response.json();
        }
    }
    ).then(
    (data) => {
        this.isLoading = false;
        // goes here once we have the data.
        this.error = null;
        console.log(data);
        const results = [];
        for(const id in data)
        {
        results.push({
            id: id,
            name: data[id].name,
            rating: data[id].rating,
        });
        }
        // overwrite existing results.
        this.results = results;
    }
    ).catch((error)=>{
    console.log(error);
    this.isLoading = false;
    this.error = "Failed to fetch data - please try again later.";
    })
```

__Important__: This is the final code he used to deal with programming errors
and server side errors.   It is in LearningSurvery.vue rather than UserExperiences.vue.
You test the programming error by removing .json from the http path we are posting
to.   You test server side errors by removing the JSON.stringify(...) statement
(raises a 400 error).   Both look like good test methods for this, so add to
notes:

```
fetch(
// remove .json from end to test for technical errors.
// remove JSON.stringify to test server errors
'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({         
    name: this.enteredName,
    rating: this.chosenRating
    })}).then((response)=>{
    if(response.ok){
    // do nothing
    }
    else{
    // This is where we deal with 400 or 500 ish errors
    throw new Error('Could not save data!');
    }
}).catch((error) => {
    // This is where we deal with programming errors.
    console.log(error);
    this.error = error.message;
});
```

#### Async/Await

There is another method for asyncronous queries to api's that might be worth
looking at in the future.   He uses this within section 16, within Vuex
actions.   The general format is something like this:
```
async fetchRequests(context) {
    ... setup variables etc ...
    const response = await fetch(`https://vue-http-demo-85e9e.firebaseio.com/requests/${coachId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch requests.');
        throw error;
    }
    ...
}
```

## ROUTING
---

##### Installation

```
npm install --save vue-router@next
```

##### Overview

He suggested having two directories for big projects, one containing
components for routing (eg 'pages') and one for re-usable components
(eg 'components').

Example Template Code:
```
<router-view></router-view>
<router-link to="/teams">Teams</router-link>
```

Example javascript code:
```
this.$router.push('/users');
this.$router.back();
this.$router.forward();
```

##### App and Vue

Within main.js, add this near the top:
```
import { createRouter, createWebHistory } from 'vue-router';
```

Later on in main.js:
```
const router = createRouter({
    history: createWebHistory(),
    routes: [
        //our-domain/teams   => TeamsList component
        {path: '/teams', component: TeamsList},
        //our-domain/users   => UsersList component
        {path: '/users', component: UsersList}
    ],
});
```

You also have to tell app to use this router:
```
app.use(router);
```

Within App.vue, you then tell it where to load this router component using a new
special tags:
```
<router-view></router-view>
```

You can now try it out and have sharable links .../teams and .../users, but the main page
is a bit blank.   Also the navigation doesn't work, so we need to navigate differently 
and adjust 'App.vue' and 'TheNavigation.vue'.

We now replace button navigation with a special tag that comes with the router:
```
<router-link to="/teams">Teams</router-link>
```
The 'to' feature is important and tells it which url in the router to navigate to.
This renders an anchort (```<a>```) tag, so if you need to style it, do it with a tags.

There is now a class that you can use to format these tags within css:
```
a.router-link-active {      /* NOTE THE dot */

}
```
There is another one called ```router-link-exact-active```, which is for paths that fully match
the path.   Important when passing in id's as arguments.   We haven't covered this yet.

If you don't like these names, you can change them in the main.js section using this:
```
linkActiveClass: 'active'
```
In this case router-link-active is replaced by active.

You might want to navigate programatically after hitting a button or something, you tend to use
this within the code ($router becomes available as router has been installed):
```
this.$router.push('/users');
```
There are other commands and more in the official docs:
```
this.$router.back();
this.$router.forward();
```

The router can support paths with variable arguments.   ORDER IS IMPORTANT BECAUSE THE
URL'S CAN GET CONFUSED. eg:
```
routes: [
    {path: '/teams/:teamId'},       // has teamId argument.
    {path: '/teams/new'}            // might get confused with previous route
],
```

To use the parameter, he used this code:
```
created() {
    // This is where we get the parameter passed to the component:
    const teamId = this.$route.params.teamId;
    ...
}
```

There is a problem with the previous bit of code.   If you have another a url to 
the page, the componenet does not rebuild because the component is not actually
recreated.   Instead he adds a watcher onto this.$ref to look for changes in the
url value:
```
  watch: {
    $route(newRoute) {
      // This is how we get around 
      this.loadTeamMembers(newRoute);
    }
  }
```

There is another problem.   We have built in a dependency on the $route.   It would
be nice if we could pass in the parameter as a prop.   You need to have an extra
argument to pass the parameters as props within main.js:
```
{path: '/teams/:teamId', component: TeamMembers, props: true}
```
[I think you still need props['teamId'] within the TeamMembers.vue code]
PROBABLY GOOD PRACTICE !!!


Sometimes you want to redirect url's to a different path with the router, so you can
use something like this within :
```
{path: '/', redirect: '/teams'},            // redirects '/' to '/teams'
```

There is also another option - an alias, which loads the same component for an
alias path, eg
```
{path: '/teams', component: TeamsList, alias: '/'},,
```

You might need to handle invalid path inputs, you can add something like this AS THE
LAST URL:
```
{path: '/:notFound(.*)', component: NotFound}   // needs to be last
```
[It doesn't have to be notFound, could be invalid, missing etc, its the .* that matches it.]

It is possible to create routes that are children of another route, for example:
```
{path: '/teams', component: TeamsList, children: [
    {path: '/teams/:teamId', component: TeamMembers, props: true}
]},  
```
You might need to add the new component (<router-view></router-view>) into the TeamsList
component template for this to work.   Nested routes are useful for complex interfaces
showing different components based upon different url paths.
You can also have children: [...] within child routes themselves.

It is possible to replace hard-coded url paths with an object version if you give the
routes in main.js a name, eg:
```
return { name: 'team-members', params: {teamId: this.id }};
```
It is also possible to give them query parameters, eg:
```
return { name: 'team-members', params: {teamId: this.id }, query: {sort: 'asc'}};
```
You then access the query parameters within javacript using this:
```
this.$route.query
```

It is possible to have multiple components in a route and give the components
names.   You can then specify multiple components in the main.js section eg:
```
  <main>
    <!-- The default component -->
    <router-view></router-view>
  </main>
  <footer>
    <!-- The footer component -->
    <router-view name="footer"></router-view>
  </footer>
```
Within main.js you then have something like this:
```
{
    name: 'team', path: '/teams', components: {
        default: TeamsList, footer: TeamsFooter
            }
}
```

It is possible to control scroll behaviour within the router.   You can add
the following function to the router in main.js and it could be worth logging
the 3 input arguments.
```
scrollBehavior(to, from, savedPosition) {
    // to and from are router objects, savedPostion stores previous location
    // so you can do something like this:
    if (savedPosition){
        return savedPosition;   // scrolls to previous position
    }
    return {left: 0, top: 0};   // scroll to top.
}
// BEWARE SPELLING ON THIS, I HAD TO CHANGE IT TO GET IT TO WORK
```

Navigation Guards:
It is possible to call a function whenever you navigate to or from a router
object.   You add something like this to the main.js:
```
router.beforeEach(function(to, from, next) {
    console.log(to, from);
    if(to.name=='team-members'){
        next();
    }
    else {
        next({name: 'team-members', params: { teamId: 't2'}});
    }
    next();   // call next(false) to cancel the navigation
});
```
These routines can be useful to ensure a user has been validated/logged in
otherwise pushing the user onto another page.   USER VALIDATION!

It is possible to create navigation guards for specific url's.   You can do
this by adding it to the router in main.js, something like this(beforeEnter
instead of beforeEach):
```
beforeEnter(to, from, next) {
    console.log(to, from);
    next();
}
```
Typical orders are:
```
beforeEach => beforeEnter => beforeRouteEnter
```

beforeEach is global for app, beforeEnter is added to router beforeRouteEnter
is within the component (I think).   There are other options:

```
beforeRouteUpdate(to, from, next) => called inside a component before it is re-used.
router.afterEach(to, from) => no next, after navigation has happened and inside main.js
                              could be used to say log user navigation in an api.
beforeRouteLeave(to, from, next) => inside a component before leaving it.   Example,
                              show a dialog when leaving a form to warn the user it
                              has not been saved.
```

Metadata:
It is possible to pass metadata into routes, eg:
```
{name: 'teams', path: '/teams', meta: {needsAuth: true}, ...}
```
You can access this from within the code (eg Navigation Guards) using $route and then
make decisions based upon that meta data.

__Important__: VIDEO 188 - Had a nice suggestion of putting the router setup into a seperate file called router.js and then importing it into main.   Makes the code more distinct and readable.
He also suggested having a 'pages' and 'components' directory so that we can add some
components into the pages directory that are router specific (could use 'routes' instead
of 'pages'), and some into the components directory, which are re-usable components.

__Important__ There is a modal dialog box that works in Video 192, which could be a useful
resource in the future.

## VUEX
---
This is a bit important topic, so I have given it it's own section.   When I tried my
first Vue app, I had difficulty transitioning information between different components.
Vuex is a way of having the state managed in an almost global level.   You then provide
a set of mutations, getters, actions for updating the global state.
[An action allows asyncronous tasks, mutations do not.   It is good practice for
a component to call an action then a mutation afterwards when doing async tasks.]

These are the basic setup instructions for Vuex:

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

```
const store = createStore({
    state() {
        // Global state variables.
        return {... list of variables ...};
    },
    mutations: {
        // Mutations must be syncronous
        ... list of functions ...
    },
    actions: {
        // Actions are for anyn code (eg http request).   It is good
        // practice to call a mutation once a mutation is complete.
        ... list of functions ...
    },
    getters: {
        // Getters are for retrieving values
        ... list of functions ...
    }
});
```

A mutation might have code like this:
```
increment(state) {
    state.counter = state.counter+10;
},
increase(state, payload) {
    state.counter += payload.value;
},
```
They can then be called from anywhere within the Vue project using something like this:
```
this.$store.commit('increment');
```

These are examples of getters:
```
finalCounter(state) {
    return state.counter;   // use state to return a value.
},
normalizedCounter(state, getters) {
    const finalCounter = getters.finalCounter+10; // call another getter
    return finalCounter;
},
```
You can then access getters using something like this:
```
this.$store.getters.normalizedCounter
```

An action might work like this:
```
increase(context, payload) {
    // some async code 
    // call a mutation once the async code is finished, eg:
    context.commit('increase', payload);
    context.commit('setAuth', {isAuth: true});
},
```
You would then call the action using dispatch, something like this:
```
this.$store.dispatch('increment');
```

I believe it is possible to do things like dispatch another action
within an action, access getters or mutations.

There are other forms of calling these getters, mutations etc:
```
this.$store.commit({
  type: 'increase',
  value: 10
});
```

There is a concept of namespacing large stores of getters, mutations
and actions into different areas.   You use the modules statement, eg:
```
modules: {
    numbers: counterModule,
}
```

The 'numbers' would then be the new namespace and counterModule would
be a dictionary similar to the original store.   The namespaced argument
restricts access to the different components:
```
export default {
    namespaced: true,           // limits how data is accessed
    state() {...}
    ......
```
SEE VIDEO 224 ON SPLITTING A LARGE SYSTEM UP INTO SEPERATE FOLDERS.

When you use namespaces, you call/access the getters etc from within
a component in a slightly different way, eg:
```
this.$store.getters['numbers/normalizedCounter'];
```

In addition to this, it is possible to map getters, actions etc within
the components so that you don't have to create seperate computed properties
whenever you want to call them.   You import some specific functions and do
something like this:
```
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

// These go in the computed section of the component
...mapGetters(['finalCounter'])
...mapGetters('numbers',['finalCounter'])     // numbers namespace

// These go in the method section of the component
...mapActions({
            inc: 'numbers/increment',       // alias increment to inc
            increase: 'numbers/increase'
        })
```

Sometimes you might want to access the root state from within a namespaced
module.   You cannont normally access this, because they are seperate, but
there is a way around this:
```
testAuth(state, getters, rootState, rootGetters) { ... }
  // use rootState and rootGetters and _ for any unused argument variables
  // to avoid errors.
```


## COMPOSITION API
---

For large projects it can be a bit annoying having the same or similar code in
different sections and components.

With the composition api, data(), methods, computed and watch  are merged into
a setup() routine.

You need to import a new ref and then instead of using data, methods etc, you do
something like this:
```
import { ref } from 'vue';

  setup() {
    const uName = ref('Mark');

    return {
      userName: uName,
    }
  }

```

There is a shortcut method of doing this, using script setup:
```
<script setup>
import { ref } from 'vue';

const uName = ref('Mark');

</script>
```

What is really nice is being able to do this with objects, however there
is a specific 'reactive' command for returning objects:
```
import { reactive } from 'vue';
const user = reactive({
  name: 'Mark',
  age: 49
});
// make sure returning object - you can make it not reactive passing the values.
return {user: user};        // might be able to use js shortcut notation.
```

What is and isn't reactive can get confusing.   There are some useful helper
functions to test if something is a ref or reactive:
```
import { isRef, isReactive, toRefs } from 'vue';
```

There is also another function, toRefs that converts an objects properties into
reactive elements.

You can also define functions within the setup() routine and return them, which
is how composition replaces methods:
```
import { ref } from 'vue';

  setup() {
    const uName = ref('Mark');

    function setNewName() {
      uName.value = 'Bob';
    };

    return {
      userName: uName,
      setNewName: setNewName
    }
  }

```

To make a function computed within the composition api, you use a computed function:
```
import { computed } from 'vue';

const uName = computed(function() {
  return firstName.value + lastName.value;
});

// This is then returned within setup, or just made available in <script setup> version.
```

Similarly for watchers, there is a watch function.   You pass what is being watched and
a function to execute in the event that it changes.   If you need to watch more than
one thing, you can use a list, eg:
```
watch(uName, function(before, after) {

});
watch([uName1, uName2], function() {

})
```

refs:
previously we would access html elements marked with ref= using ```this.$refs```
This doesn't work here instead, you create a ref element and then return it
from the setup
```
const lastNameInput = ref(null);

return {
  ...
  lastNameInput,
  ...
}
```
You would then access this within the function using something like this (the
.value.value looks weird but works)
```
function setLastName() {
  lastName.value = lastNameInput.value.value;
}
```

props:
key point: it is possible to mix composition api and options api.
you can add props in the normal way, but they are generally not
available within the javascript code.   You need to use the first
argument to the function to work with props, eg:
```
setup(props, context) {

  const uName = computed(function() {
    return props.firstName + ' ' + props.lastName;

    console.log(context);
  })
```

The second argument, 'context', has things like 'attrs', 'emit', 'slots'
that give you access to various properties (attrs are values that fall
through).   Interesting: if you want to emit something, you would do it
using something like this:
```
  context.emit(...);      // not this.$emit()
```

provide/inject
You can import some provide/inject functions.   You might for example
add provide to app.vue:
```
import { ref, provide } from 'vue';
setup() {
  const uAge = ref(31);
  provide('userAge', uAge);
}

```
And within another component, inject the value:
```
import { inject } from 'vue';
setup() {
  const userAge = inject('userAge');

  return {userAge: userAge};      // give access to the template 
}
```

Lifecycle hooks:
beforeCreated and created are no longer needed, but you basically import them
from view and call the functions within the setup.
```
beforeMount, mounted => onBeforeMount, onMounted
beforeUpdate, updated => onBeforeUpdate, onUpdated
beforeUnmount, unmounted => onBeforeUnmount, onUnmounted
```

Routing (video 301):
With the composition api, we lose access to this.$route, so we need some alternative
strategies.

1 - We could pass arguments in as props, eg:
```
  { path: '/products/:pid', component: ProductDetails, props: true}
```

2 - We can import a special function from vue-router:
```
import { useRoute } from 'vue-router';
...
const route = useRoute();
console.log(route);
...
```

Vuex:
There is something similar for using vuex with the composition api:
```
import { useStore } from 'vuex';
...
const store = useStore();
...
    return store.getters.counter;
...
```


## FURTHER DEVELOPMENT
---
This covers development areas that require some knowledge of the previous sections.

#### SECTION 16 - BIG PROJECT
---

I thought it was worth discussing section 16 because it is a good example of a big
project that uses lots of the theory covered so far.   I suggest you use the readme
file in this directory.
I got everything working up to and including 15, but from that point onwards
it used the firebase database, which I couldn't be bothered to use.

Some interesting things that I noticed were:

He uses a new async await format for fetching data from backend databases, which
might be worth a look.

He also uses a <base-spinner>, which is interesting.

He added some code to prevent things refreshing from the database all of the time,
you have to force it using a refresh button.

He also added some transition/animation to the dialog box which made it look good,
and some nice transitions when we move between different routes.

#### Transitions and Animation
---

There is a view specific element used for transitions.   It has some css classes that can
be specified to control the behaviour such as *-enter-from, *-enter-to and *-enter-active, 
*-leave-from, *-leave-to and *-leave-active.   They can be used to animate the addition
and removal of elements.   It is useful when you use things like v-if.

You should only have one element within the transition UNLESS you can guarantee that only
one element will be visible at one time.

You can make the transition work with classes such as .para-enter-from rather than
.v-enter-from by giving the transiton a name, eg:
```
<transition name="para">....</transition>
```

You can specify exact classes to use instead of .v-enter-from in the following way:      
```
<transition enter-to-class="some-class" enter-active-class="...">
```

You can tell Vue not to look for these css classes (can use javascript) using this:
```
<transition :css="false">...</transition>
```

Within the original version of the App in chapter 14 he has plenty of examples of
using css to animate or transition data.    Using keyframes.   He also has an example
where you can specify specific javascript functions to run when entering etc:
```
<transition
  :css="false"
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @before-leave="beforeLeave"
  @after-leave="afterLeave"
  @leave="leave"
  @enter-cancelled="enterCancelled"
  @leave-cancelled="leaveCancelled">
```

It is possible to transition elements of a group, such as list items within an unordered
list using a similar but slightly different Vue element called <transition-group>:
```
<transition-group tag="ul" name="user-list">
    <li v-for="user in users" :key="user" @click="removeUser(user)">
        {{  user }}
    </li>
</transition-group>
```

You need to remove the element that they were rendered in originally (```<ul>```)
and specify this in the 'tag' attribute of the transition-group.
Again name can be used to control which css classes are used to control the
transition.

Finally you can also transition between router views.   There is some unusual
syntax for this with the component:
```
<router-view v-slot="slotProps">
    <transition name="fade-button" mode="out-in">
        <component :is="slotProps.Component"></component>
    </transition>    
</router-view>
```

Also, to prevent jumping around at the start, you might want to only mount the
app when the router is ready.   Adjust main.js to use this:
```
router.isReady().then(function() {
    app.mount('#app');
});
```

I cannot remember the exact reason, but I think I would avoid transitioning
router-view's until I have more experience.

#### Authentication
---

This is an important section, however he uses the project built in section 16,
which I cannot be bothered to get working fully (uses firebase).   I think this
is something it would be best to build in my own personal project later on.
That being said, when I hit authentication, this section of videos is worth
watching.   It's very relevant because it uses a token sent from the server,
not your traditional django login etc, which is controlled by the server.   It's
probably very relevent when using things like our SSO (Single Sign On) and
JWT tokens.

He uses the ... operator and !!, investigate these further at some point.

He demonstrates getting a token, using it, saving it in local storage etc.
Important section, but really need a server on the back of it.   He also
auto logs out before the token expires.

#### Optimizing and Deploying Vue Apps
---

With large Vue apps, you have lots of components and some of them may never be
used by the user.   There is something called Async Components, where you load
a component only when it is needed.
In routes.js or where you need it, do something like this:
```
import { defineAsyncComponent } from 'vue';
```

You then use something like this within the code:
```
const CoachDetail = defineAsyncComponent(() =>
  import('./components/mycomponent.vue')
)
```

He has a section stating that you can use async components with routing, but
at the end of this a statement suggesting that this is not recommended for
routing.   I would investigate this further before I used it, but instead he
suggests using something like this for all routes:
```
const CoachDetail = () => import('./components/mycomponent.vue');
```

Deployment of an app is important.   You need to build the app, which creates
a 'dist' folder with optimized javascript code that can be deployed on a web
server:
```
npm build
```

There is an important concept when deploying to a real webserver.   By default
most web servers do not ignore the path provided in the url and will look in
the directory structure for the files.   Vue uses the path within the index.html
file, so you need a webserver where you can tell it to process everything through
this file.

YOU NEED TO CONFIGURE THE WEBSERVER AS A SINGLE PAGE APP !!!

It looks like you can deploy single page apps to AWS.   It uses S3 buckets and
cloudfront for https, so you need to find examples on the web.

#### Re-using Functionality
---

Components are great for re-using html, styles and some scripts
but if you have two components with similar scripts, its difficult
to share code.   Mixins in the composition api are useful for this.

He seperates out code such as refs, computed functions etc into a 
seperate javascript file within a mixins directory.   He then imports
that code and adds it into the setup using a mixins argument:
```
import alertMixin from '../mixins/alert.js';
...
export default {
  mixins: [alertMixin,]
}
...
```

Component configuration cannot be shared, so ```components:``` has to be
removed from the alert.js file and moved back to the original components.

It is possible to create global mixins.   Example adding a logger to the
mounted() of all components.   You import the mixin within main.js and
then add it to the app using:
```
app.mixin(loggerMixin);
```

Downwide of mixins is that it can be difficult in big projects to understand
what is happening.   If importing multiple mixins, the code is completely
seperated from the component and it can be tricky to understand.

Composition API has a nicer way to share code.


NEED TO REVISIT THE TUTORIAL - URGHH, I DIDN'T MAKE NOTES HERE !!!