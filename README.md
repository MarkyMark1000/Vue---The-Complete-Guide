# Overview

These are notes taken when doing the following udemy tutorial on Vue3:

https://www.udemy.com/course/vuejs-2-the-complete-guide/

It has been updated for Vue3

## Key Notes
---

WARNING - Try to avoid making data variable names, method, computed function names etc the same. It might stop it from working.

```
vue --version
vue create vue-first-app   (or sudo vue ...)
npm run serve           (or sudo npm ....)
npm install             (or sudo npm ....)
npm run build           (or sudo npm ....)
```

This can be very useful if create command doesn't work without errors (cache folder contains root owned files):

```
// clears cache of out of date files
sudo npm cache clean --force

// reinstalls npm with latest version
npm install -g npm
```

### Javascript
---

You tend to create a view app within javascript and then mount
that app onto a particular piece of html.   In this case the
html with id user-goal:

```
const app = Vue.createApp({});
app.mount('#user-goal');
```

There are certain arguments that you can pass to createApp which
can be used to dynamically format the page:

```
const app = Vue.createApp({
    props: [] or {},
    data() { return {}; },
    methods: {},
    computed: {},
    watch: {},
    emits: [] or {},
});
```

__props__: These are using in components and declare attributes that can be passed
    down to the component.
__data__: This returns a dictionary of variables that we will associate with this
      global app.   
__methods__: This is a dictionary of functions that are generally associated
         with 'events' OR 'results that you want to calculate whenever the
         page is recalcaluted'.   
__computed__: This is a dictionary of functions that are only calculated
         when a variable that they depend upon is updated.   More efficient
         than methods.   Should return a value.   
__watch__: This is a dictionary of functions with the names of variables or
       computed functions.   They listen to changes in these and then
       execute code.   They are useful for doing things like resetting variables
       once they exceed a certain value.   They are not good when you have
       multiple watchers on one variable.
__emits__: Used in component to declare what events the component can raise and so
    what the parent app/component can listen for with @.   It is used in conjunction
    with this.$event('blah-blah', ...)

Within a method, computed function or watch, you must refer to the variables
using 'this':

```
const app = Vue.createApp({
    data() { return {name: 'mark'}; },
    methods: {changeName(){ this.name = 'bob'; return this.name; }},
});
```

Within a method, you can access the value of the calling object from the first
argument of the function:

```
changeName(event, arg1){ this.name = event.target.value + arg1; }
```

You can then use the long format when binding this event to something within
the html:

```
v-on:click="changeName($event, 'Wilson'):
```

With a watcher you can access the value before and after, eg:

```
counter(newvalue, oldvalue)
```

He had an interesting trick of accessing this from functions that are not
part of the Vue app using that instead of this:

```
const that = this;
```

### HTML
---

#### __v-model='...'__

Used for 2 way binding.   This is very useful with things like input boxes
and associates the value of the input box with a variable name.
Both should update when the input or variable are changes.
Very nice shortcut, use often.

#### __v-on:click='...' OR @click='...'__

This is how to associate events with methods (generally not computed functions).

#### __v-bind:href="..." OR :href='...'__

If you want a variable, computed function or method to be used within html
attributes you need to use the v-bind followed by the particular attribute.

#### __v-if="...." followed by v-else-if="..." or v-else__

If else etc within the template.   The v-else-if and v-else must follow
a v-if statement.

There is a weird error, see video 47, so it is good practice to use the
:key="..." to uniquely identify a record.   It's a good practice to get
into.

#### __v-show="..."__

This is similar to v-if but doesn't have the else if/else functionality.
When you use v-if, it adds/removes the html.   The v-show just hides the
html on the page and so is much quicker.

#### __v-bind:disabled="..." or :disabled="...___"

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

### __Dynamic Styling__
---

It is possible to dynamically style html.   This looks quite important and there are
a couple of things to note:

- Use 'style' to override 'class' css attributes.

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

Using a computed function that returns a dictionary, eg return {active: true}
```
    <div
        class="demo"
        :class="boxDClasses"
        @click="boxSelected('D')">
    </div>
```

Using an array
```
    <div
        :class="['demo', {active: boxESelected}]"
        @click="boxSelected('E')">
    </div>
```

It would be sensible to return class attributes as a dictionary in a format
similar to:

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

### Inbuilt Events
---

There are a set of inbuilt events that we can add vue code for the Vue App lifecyle
see video 66 and 67.

These include:
  beforeCreate(), created(), beforeMount(), mounted(), beforeUpdate(), updated(),
  beforeUnmount(), unmounted()

### Components
---

This is quite a new are and quite a big change.   We start to add other bits of html
onto the core app that has it's own functionality.
    
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

IT IS GOOD PRACTICE TO USE A NAMING CONVENTION OF friendContact AND
friend-contact GOING HAND IN HAND FOR COMPONENTS ETC. 

Typically you will build either a page that contains multiple
vue apps that are independent of each other OR Single Page Applications that
use a single vue app, but multiple components.   It's not create to
combine multiple apps and components because they can't inter-communicate.

#### New Development Environment

To start to use this effectively we now use the vue command line.

1 - First install the latest version of node js.   This will also install npm (node
package manager), which we will use with this.

2 - You then install vue cli using npm.   Search for 'install Vue cli' in google and
it will give you instructions.   Currently it is:

```
npm install -g @vue/cli
```

There were some issues with this, might need to use 'sudo' before npm.   This might
help:   https://stackoverflow.com/questions/62494949/cant-install-vue-cli-macos

Confirm with
```
vue --version
```

To upgrade, use:
```
npm update -g @vue/cli   (or sudo npm ...)
```

```
vue create vue-first-app   (or sudo vue ...)
```

If this command fails with errors (cache folder contains root owned files) this
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


This is actually quite important and we will need to run this for all of his downloaded
templates.

There is a public directory with a single page html file that we will edit.

The main.js and App.vue file contain the core code that is useful.   At this point we
install a VSCode Extension called 'Vetur', which makes this template file coloured
and more readable.

I had all sorts of problems trying to get the development server up and running with
this.   I ended up using sudo for a while, but I will update this when I have a good
solution:

APARENTLY THERE IS NOW AN ALTERNATIVE WAY OF SETTING UP VUE PROJECTS:

  ```
  npm init vue
  ```
  Also, use the Volar extension instead of Vetur

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
app and components:

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

This is marginally interesting in the <style> tag, you can import
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

#### props and emits

These are used in the component and declare variables that can be used
within the component.   They can be of the following types:
String, Number, Boolean, Array, Object, Date, Function, Symbol

They are used like this:

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
// The blah-blah to blahBlah format is commonly used and a
// good habit to get into.
...
```

Within forms he got them to work by preventing the submit event
using the following format:

```
@submit.prevent="submitData"
```

You can emit objects/dictionaries and quite often this might be a better
option.

Key Lesson from the assignment - I dont' forget to connect the emit to the
parent method using something like @my-event="myEvent" in the parent
app/component.

#### provide and inject

There is a bit of a problem with props and emits.   When you have applications
that have components dependent upon components, you have to capture and pass
the props down or the emit events up through each component.

This is where provide and inject come in useful.   It can however be difficult
to track down where the code is called for, so use sensible judgement when
choosing between the two.

Within the main app, or high level component, itis possible to use provide: {...}
to provide variables that can be accessed into the sub components, but it replicates
data declared in data(){...}   We can use a function version:

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

KEY: Provide() goes in the high level app/component and Inject: goes into the
    sub components.


IMPORTANT - NEXT
Try to figure out how to get rid of the sudo/admin problem, it is a real
pain in the backside.