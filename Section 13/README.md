# ROUTING

## Installation
---

@next is the latest version.
```
npm install --save vue-router@next
```

## Development
---

### App and Vue

Within main.js, add this near the top:
```
import { createRouter, createWebHistory } from 'vue-router';
```

Later on in main.js:
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/teams', component: TeamsList},      //our-domain/teams   => TeamsList component
        {path: '/users', component: UsersList}      //our-domain/users   => UsersList component
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
This renders an anchort (<a>) tag, so if you need to style it, do it with a tags.

There is now a class that you can use to format these tags within css:
```
a.router-link-active {              /* NOTE THE dot */

}
```
There is another one called ```router-link-exact-active```, which is for paths that fully match
the path.   Important when passing in id's as arguments.   We haven't covered this yet.

If you don't like these names, you can change them in teh main.js section using this:
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