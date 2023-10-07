# Notes on Chapter 9

## Global vs Local Registration
---

Originally in this project the components were all imported within main.js, but
he moved the import from there into App.vue, within the javascript.
A components section was then added to define which components are imported
locally.   You can use a format such as this:

```
components: {
    'the-header': TheHeader
}
```

However, you can also use TheHeader directly or just TheHeader is the equivalent
of TheHeader: TheHeader, eg

```
components: {
    TheHeader
}
```

He also mentioned that this still allows you to use <the-header><the-header> format
within the template, but you can also use <TheHeader> or <TheHeader />, which isn't
available for the <the-header> format.

## Scoped Styling
---

css defined within the <style> section of any component applies globally.   If you
want to limit the scope of the style to the template the <style> tag is within you
use this:

<style scoped>

I THINK IT WILL BE VERY GOOD PRACTICE TO USE scoped STYLING WITHIN ALL COMPONENTS IN
THE components DIRECTORY AND USE global STYLES IN App.vue, IE, THE MAIN APP.

The way that this works in practice is that vue changes each of your components and
gives them a unique identifier, eg:

<header data-v-988832>, it then modifies the css to use header and this unique
identifier to uniquely identify what it is applying to.

## Slots
---

If you want to use a component to wrap other pieces of html, but add things like
formatting, you can use <slot></slot> to represent where the html that the component
wraps goes.   Then in another component, you would use something like this:

<my-wrapper-component>
...html....
</my-wrapper-component>

The ...html... goes into the <slot></slot> section of the code.   You can have more
than one slot in a component, but you must give them names and only have 1 or 0
without a name, eg <slot name="header"></slot>

Within the template/html that uses the 'named' slot, you would inject it using
<template> tags and the v-slot attribute with colon, : not equal:

<template v-slot:header>
.....html.....
</template>

YOU CAN USE v-slot:default, WHICH IS GOOD PRACTICE TO SPECIFY THAT YOU WANT IT TO
GOTO A DEFAULT SLOT.   You can also provide DEFAULT HTML that appears if not
HTML is provided between the <slot></slot> tags, eg
<slot name="header">
   Header is missing
<slot>

You can specify that bits of code only display if a slot is provided, eg:
<header v-if="$slots.header"> will only show if there is a  header passed into
the component, via <template v-slot:header>

There is a shortcut for v-slot.   Use #, eg <template #header>

There is something on scoped slots (see tutorial 116), but it didn't seem to
workon my computer.   It is a way for a parent component to pass html to
a sub component that contains <slot></slot>, but the parent component has
access to the variables used within the sub-component.

You might see things like
<template #default="slotProps"> then access slotProps.item or slotProps['something']
You could also put it in the component name, eg
<course-goals #default="slotProps"></course-goals>

It's an advanced and neich feature.

## Dynamic Components
---

Within vue templates you can add the component tab and get it to switch between
displaying different templates, eg:

<component :is="activeComponent"></component>

The component displayed is linked to the variable activeComponent, which can
be changed by buttons etc.

There is a problem with this.   When you switch between components, they are
destroyed, so if you have something like an input box, the entered text will
got to zero.   You can solve this by wrapping it in <keep-alive>:

<keep-alive>
    <component :is="activeComponent"></component>
</keep-alive>

He went through an example in video 119 where he created a dialog using a
new vue component and <slot> instead of an alert button.   The html ended
up going in the wrong place semantically, so he demonstrated using the
teleport tags to move the postion of the dialog box:

This moves the dialog html at the start of the body element.   You can use
any css selectors.

<teleport to="body">
    <dialog>
        <slot><slot>
    </dialog>
</teleport>

HE DID NOT SHOW YOU HOW TO OPEN IT IN ITS OWN BOX, SO RESEARCH THIS AT
SOME POINT !!!

## Fragments
---

Top level <template> can have multiple elements, in vue2, everything needed
one element, eg <div></div>

## Style Guide
---

Vue has some strongly recommended style guides that it might be worth getting
used to.   Google 'Vue Style Guides' or try this:

https://vuejs.org/style-guide/rules-strongly-recommended.html#component-files

He also discussed directory structures.   It is a good plan to add sub
directories to the components directory to make the components easier to
find and manage.