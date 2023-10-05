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

