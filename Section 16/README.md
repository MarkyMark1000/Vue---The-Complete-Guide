# IMPORTANT OVERVIEW

Within this section, I didn't want to enter the code line by line
as he went through the project.   This isn't about learning it is
about applying things that we have learn't.    I went through the
video's and made sure I could build a version of his code bit by
bit.

These commands are generally important for installation of the router
and vuex:
```
vue create vue-first-app
npm install
npm install --save vue-router@next
npm install --save vuex@next
npm run serve
```

##### my_code/02
This doesn't do too much, he just added routers.

##### my_code/03
Doesn't even compile without errors.

##### my_code/04
I have got this doing something, but it isn't much.

##### my_code/05
I have got this doing something, but it isn't much.

##### my_code/06
I got this working, a bit more to it with some people in the list.

##### my_code/07
More progess - got it working.

##### my_code/08
More progess - got it working.

##### my_code/09
More progess - got it working.

##### my_code/10
More progess - got it working.

##### my_code/11
More progess - got it working.

##### my_code/12
More progess - got it working.

##### my_code/13
More progess - got it working.

##### my_code/14

##### my_code/15
More progess - got it working.

From now onwards we need to update the code so that it can talk to a firebase
database that we have setup.   The code that needs to be adjusted is:
store => module => coaches => actions.js

He uses a new async await format for fetching data from backend databases, which
might be worth a look.   He also uses a <base-spinner>, which is interesting.

He added some code to prevent things refreshing from the database all of the time,
you have to force it using a refresh button.

He also added some transition/animation to the dialog box which made it look good,
and some nice transitions when we move between different routes.

##### my_code/17, 18, 19 etc.
This doesn't work, I can't be bothered to debug it.
I think its because the database is missing.


