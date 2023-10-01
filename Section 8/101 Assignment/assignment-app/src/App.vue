<template>
  <section>
    <user-data @update-user="updateUser"></user-data>
    <active-user :user-name="appUserName" :age="appAge"></active-user>
    <!--
      Key Lesson from this assignment - I need to connect update-user which
      is emitted within the UserData app to the updateUser function, here
      useing the @update-user attribue.
    -->
  </section>
</template>

<script>
import UserData from './components/UserData.vue';
export default {
  components: { UserData },
  data() {
    return {
      appUserName: 'Mark',
      appAge: '49'
    };
  },
  methods: {
    updateUser(uName, uAge) {
      console.log('updateUser called');
      this.appUserName = uName;
      this.appAge = uAge;
    }
  }
}
</script>


<style>
/*
  We add the css for the App.vue template here, which formats the
  look of the page.
  He also added an import for google font's.
*/
  @import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Jost', sans-serif;
  }

  body {
    margin: 0;
  }

  header {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 3rem auto;
    border-radius: 10px;
    padding: 1rem;
    background-color: #58004d;
    color: white;
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }

  #app ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  #app li,
  #app form {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    margin: 1rem auto;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    width: 90%;
    max-width: 40rem;
  }

  #app h2 {
    font-size: 2rem;
    border-bottom: 4px solid #ccc;
    color: #58004d;
    margin: 0 0 1rem 0;
  }

  #app button {
    font: inherit;
    cursor: pointer;
    border: 1px solid #ff0077;
    background-color: #ff0077;
    color: white;
    padding: 0.05rem 1rem;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  }

  #app button:hover,
  #app button:active {
    background-color: #ec3169;
    border-color: #ec3169;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
  }

/* New styles added for NewFriend */
#app input {
  font: inherit;
  padding: 0.15rem;
}
#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}
#app form div {
  margin: 1rem 0;
}
</style>