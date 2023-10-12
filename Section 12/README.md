# OVERVIEW - CHAPTER 12

He setup a firebase backend.   See the videos at the start of the chapter
on how to do this.    It is probably going to be essential.

WE USE A FIREBASE DATABASE ADDRESS TO SEND DATA AND SEE THE UPDATE WITHIN
FIREBASE.   DONT FORGET TO UPDATE THIS ADDRESS IF YOU LOOK AT IT IN THE
FUTURE.

https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/

He added /surveys.json onto the end of it.

There was an alternative library called axios, but he used fetch to send
data to a webserver.   The first bit of code he used was:

```
      fetch(
        'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.enteredName,
            rating: this.chosenRating
          })
        }
        );
```

The next step he showed us how to use promises with fetch to GET data.   By default
fetch uses GET, so no need to declare it, or a body or in fact headers:

```
  methods: {
    loadExperiences() {
      fetch(
        'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
      ).then(
        (response) => {                     // couldn't use function here, 'this' isn't available, need arrow context
          if(response.ok)
          {
            return response.json();
          }
        }
      ).then(
        (data) => {
          console.log(data);
          const results = [];
          for(const id in data)
          {
            results.push({
              id: id,
              name: data[id].name,
              rating: data[id].rating,
            });
          }
          // overwrite existing results.
          this.results = results;
        }
      )
    }
```

It was interesting that the 'this' isn't available if you use traditional function formats
here eg marksFunction() {...}.   Instead he used (data) => with the arrow format.

He adjusted this routine to process errors and update variables if we have an error etc.
It does process code errors, but not server side errors.
```
    loadExperiences() {
      this.isLoading = true;
      fetch(
        // to test this, remove .json from the end to simulate an error.
        // also delete data from the firebase database to test for no data
        'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
      ).then(
        (response) => {                     // couldn't use function here, 'this' isn't available, need arrow context
          if(response.ok)
          {
            return response.json();
          }
        }
      ).then(
        (data) => {
          this.isLoading = false; // goes here once we have the data.
          this.error = null;
          console.log(data);
          const results = [];
          for(const id in data)
          {
            results.push({
              id: id,
              name: data[id].name,
              rating: data[id].rating,
            });
          }
          // overwrite existing results.
          this.results = results;
        }
      ).catch((error)=>{
        console.log(error);
        this.isLoading = false;
        this.error = "Failed to fetch data - please try again later.";
      })
```

This is the final code he used to deal with programming errors and server side
errors.   It is in LearningSurvery.vue rather than UserExperiences.vue.   You
test the programming error by removing .json from the http path we are posting
to.   You test server side errors by removing the JSON.stringify(...) statement
(raises a 400 error).   Both look like good test methods for this, so add to
notes:

```
      fetch(
        // remove .json from end to test for technical errors.
        // remove JSON.stringify to test server errors
        'https://vue-http-demo-77b5f-default-rtdb.europe-west1.firebasedatabase.app/surveys.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({         
            name: this.enteredName,
            rating: this.chosenRating
          })}).then((response)=>{
          if(response.ok){
            // do nothing
          }
          else{
            // This is where we deal with 400 or 500 ish errors
            throw new Error('Could not save data!');
          }
        }).catch((error) => {
          // This is where we deal with programming errors.
          console.log(error);
          this.error = error.message;
        });
```