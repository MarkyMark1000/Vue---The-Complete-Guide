# OVERVIEW

This is based upon the following tutorials:
https://www.youtube.com/watch?v=vHOMSq3-KMY


## NOTES
---

I FOUND THE FOLLOWING INSTALLATION DID NOT WORK.   SOMETHING ABOUT AN INVALID RESPONSE
POSSIBLY DUE TO BAD NETWORK SETTINGS OR BEING BEHIND A PROXY.   I COULD TRY IT WHEN
I AM AT HOME, BUT BECAUSE jest ISN'T THE RECOMMENDED UNIT TEST SOLUTION, I AM GOING TO
LEAVE IT FOR NOW !

When setting up a project using ```vue create someapp```, it is possible to select manual setup.   Within this
section include ```Unit Testing``` and then select ```Jest```.

This installs the following:
- Jest
- Vue CLI Unit Jest Plugin
- Vue-Jest
- Vue Testing Utilities

It also creates the following:
  tests/unit - directory for tests
  jest.config.js - config file for jest

Unit test file names must be similar to the following:
- name.spec.js
- name.spec.ts          // typescript tests
- name.test.js
- name.test.ts          // typescript tests

NEXT STEP - CREATE A PROJECT CALLED example_app_built_with_tests USING THE INSTRUCTIONS ON THE VIDEO AND THEN
COMPARE THE DIRECTORIES AND WHAT IS REQUIRED TO SET THIS UP AFTER CREATING A PROJECT.