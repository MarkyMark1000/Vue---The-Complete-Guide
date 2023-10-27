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

The router can support paths with variable arguments.   ORDER IS IMPORTANT BECAUSE THE
URL'S CAN GEN CONFUSED. eg:
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

beforeRouteUpdate(to, from, next) => called inside a component before it is re-used.
router.afterEach(to, from) => no next, after navigation has happened and inside main.js
                              could be used to say log user navigation in an api.
beforeRouteLeave(to, from, next) => inside a component before leaving it.   Example, show
                               a dialog when leaving a form to warn the user it has not
                               been saved.


Metadata:
It is possible to pass metadata into routes, eg:
```
{name: 'teams', path: '/teams', meta: {needsAuth: true}, ...}
```
You can access this from within the code (eg Navigation Guards) using $route and then
make decisions based upon that meta data.

VIDEO 188 - Had a nice suggestion of putting the router setup into a seperate file called
router.js and then importing it into main.   Makes the code more distinct and readable.

HE ALSO SUGGESTED HAVING A pages AND components DIRECTORY SO THAT WE CAN ADD SOME COMPONENTS
INTO THE pages DIRECTORY, WHICH ARE ROUTER SPECIFIC AND SOME INTO THE components DIRECTORY
WHICH ARE RE-USABLE COMPONENTS.
