<template>
  <form @submit.prevent="submitForm">
    <div class="form-control"  :class="{invalid: userNameValidity ==='invalid'}">
      <label for="user-name">Your Name</label>
      <input id="user-name" name="user-name" type="text" v-model="userName" @blur="validateUsername"/>
      <p v-if="userNameValidity === 'invalid'">Please enter a valid username</p>
    </div>
    <div class="form-control">
      <label for="age">Your Age (Years)</label>
      <input id="age" name="age" type="number" v-model="userAge" ref="ageInput"/>
    </div>
    <div class="form-control">
      <label for="referrer">How did you hear about us?</label>
      <select id="referrer" name="referrer" v-model="referrer">
        <option value="google">Google</option>
        <option value="wom">Word of mouth</option>
        <option value="newspaper">Newspaper</option>
      </select>
    </div>
    <div class="form-control">
      <h2>What are you interested in?</h2>
      <div>
        <input id="interest-news" name="interest" value="news" type="checkbox" v-model="interest"/>
        <label for="interest-news">News</label>
      </div>
      <div>
        <input id="interest-tutorials" name="interest" value="tutorials" type="checkbox" v-model="interest"/>
        <label for="interest-tutorials">Tutorials</label>
      </div>
      <div>
        <input id="interest-nothing" name="interest" value="nothing" type="checkbox" v-model="interest"/>
        <label for="interest-nothing">Nothing</label>
      </div>
      <div>
        <input id="interest-nothing" name="confirm" v-model="confirm" type="checkbox" />
        <label for="interest-nothing">Confirm</label>
      </div>
    </div>
    <div class="form-control">
      <h2>How do you learn?</h2>
      <div>
        <input id="how-video" name="how" value="video" key="" type="radio" v-model="how"/>
        <label for="how-video">Video Courses</label>
      </div>
      <div>
        <input id="how-blogs" name="how" value="blogs" type="radio" v-model="how"/>
        <label for="how-blogs">Blogs</label>
      </div>
      <div>
        <input id="how-other" name="how" value="other" type="radio" v-model="how"/>
        <label for="how-other">Other</label>
      </div>
    </div>
    <div>
      <RatingControl v-model="rating"></RatingControl>
    </div>
    <div>
      <button>Save Data</button>
    </div>
  </form>
</template>

<script>
/*
  v-model will look at the input type (number, text etc) and convert the javascript
  variable into that variable type.   Using $refs does not and returns a string.
  Also v-model has some input modifiers that can be useful, eg
    v-model.trim, v-model.number, v-model.lazy (less frequent updates)
  
  Shows how to use v-model with select boxes and checkbox/radio buttons.   You need a v-model on
  each radio button group with the same name to point at the same variable.

  For checkboxes you need an array, which will end up with the values checked.   Also you
  need to add distinct values to each of the checkboxes/radio buttons in the html so that
  they have a value to assign to it.
  If you work with a single checkbox in a group, then you can use a single variable rather
  than an array and it will need/have a value of true or false.

  He has an example of validating user input using the blur event on the input box.
*/
import RatingControl from './RatingControl.vue';

export default {
  components: {
    RatingControl,
  },
  data() {
    return {
      userName: '',
      userAge: null,
      referrer: 'wom',
      interest: [],
      how: null,
      confirm: false,
      userNameValidity: 'valid',
      rating: null,
    };
  },
  methods: {
    validateUsername() {
      if(this.userName.trim()<1){
        this.userNameValidity='invalid';
      }
      else{
        this.userNameValidity='valid';
      }
    },
    submitForm() {
      console.log('Username: '+this.userName);
      this.userName = '';
      console.log('User age:');
      console.log(this.userAge+5);
      console.log(30);
      console.log(this.$refs.ageInput.value+5);   // Output is unexpected because it's a string
      this.userAge = null;
      console.log('Referrer:');
      console.log(this.referrer);
      console.log('Checkboxes');
      console.log(this.interest);
      console.log('Radio buttons');
      console.log(this.how);
      this.interest=null;
      this.how=null;
      console.log('Confirm?');
      console.log(this.confirm);
      this.confirm=false;
      console.log('Rating:');
      console.log(this.rating);
      this.rating=null;
    }
  }
}
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}

.form-control.invalid input {
  border-color: red;

}

.form-control.invalid label {
  color: red;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>