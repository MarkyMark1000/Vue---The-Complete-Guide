# Overview

### Props and Custom Events

You can pass data from a parent to child component using props.   It is good
to define in advance using props: and either an array or object.
You can pass data up with parameters from the child component to the parent
using custom events and the this.$emit(...) function.   Can be declares with
emits.

### Provide and Inject

When you have components that contain components, it can be tedious passing
data from parent/child to child/parent.   You can pass data and event functions
from the App.vue (or a high up component) and then use it in a sub component.
Can be difficult to know where the code is called from, so choose carefully
between the two.