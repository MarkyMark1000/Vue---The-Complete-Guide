# Overview

These are notes taken when doing the following udemy tutorial on Vue3:

https://www.udemy.com/course/vuejs-2-the-complete-guide/

It has been updated for Vue3

## Notes
---

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
    data() { return {}; },
    methods: {},
    computed: {},
    watch: {},
});
```

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

#### __v-for='goal in goals'__

This is like a for loop within the html

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

#### __event names__

There are lots of events such as:

```
v-on:input   v-on:keydown.enter     etc
```

WARNING - Try to avoid making data variable names, method, computed function names etc
          the same.   It might stop it from working.

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