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
