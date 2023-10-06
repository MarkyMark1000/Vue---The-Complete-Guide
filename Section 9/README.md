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