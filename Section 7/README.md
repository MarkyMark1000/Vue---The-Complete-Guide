# NOTES

In this section he went over improving our development environment.   It would be nice to
have a webserver that uses http rather than the file protocol.   It would be good if it
auto reloads when we make changes.

We are going to use the vue command line.   There may be issues installing this.   If we
experience this, replace the scripts entry in our package.json file before running
npm run serve:

Windows:
```
"scripts": {  
  "serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",  
  "build": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",  
  "lint": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint"
},
```

Mac/Linux:
```
"scripts": {  
  "serve": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",  
  "build": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",  
  "lint": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint"
},
```

## Installation
---

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

He then creates a vue app called vue-first-app, using the following command and
selecting appropriate options, but do not save it as a future preset for future
projects:

```
vue create vue-first-app   (or sudo vue ...)
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

This is actually quite important and we will need to run this for all of his downloaded
templates.

There is a public directory with a single page html file that we will edit.

Within the src directory there is a main.js file that has code that looks similar
to what we have been using previously.   There is also an App.vue file that contains
3 sets of data.   <Template>, <Script> and <Style>.   At this point we install a
VSCode Extension called 'Vetur', which makes this template file coloured and more
readable.

I had all sorts of problems trying to get the development server up and running with
this.   These are solutions that I tried:

https://sentry.io/answers/how-do-i-resolve-cannot-find-module-error-using-node-js/#:~:text=Make%20sure%20the%20dependency%20is%20installed%20in%20the%20correct%20place&text=If%20the%20dependency%20is%20in,the%20module%20import%20is%20correct.
```
sudo rm -rf node_modules
sudo rm -f package-lock.json
sudo npm cache clean --force
sudo npm install
```

https://stackoverflow.com/questions/66215112/syntax-error-error-no-eslint-configuration-found-in-when-i-tried-to-npm-run
```
npm init @eslint/config
```

NONE OF THIS SEEMED TO WORK.  WHAT I DID WAS BASICALLY CREATE A NEW VUE PROJECT
FROM SCRATCH AND THEN ADJUSTED IT TO LOOK LIKE HIS.   IT IS CALLED my-new-vue-project.


APARENTLY THERE IS NOW AN ALTERNATIVE WAY OF SETTING UP VUE PROJECTS:

  ```
  npm init vue
  ```
  Also, use the Volar extension instead of Vetur