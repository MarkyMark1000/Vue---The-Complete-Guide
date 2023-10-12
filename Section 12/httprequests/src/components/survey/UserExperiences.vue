<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExperiences">Load Submitted Experiences</base-button>
      </div>
      <ul>
        <!-- this should really be a loading spinner -->
        <!-- && results checks for a truthy value -->
        <!-- to test this out, he cleared the firebase database so had no records. -->
        <p v-if="isLoading">Loading ...</p>
        <p v-else-if="!isLoading && error">
            {{ error }}
        </p>
        <p v-else-if="!isLoading && (!results || results.length === 0)">
          No data, please load some.
        </p>
        <survey-result
          v-else-if="!isLoading && results && results.length > 0"
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  //props: ['results'],
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoading: false,
      error: null,
    }
  },
  methods: {
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
    }
  },
  mounted() {
    this.loadExperiences();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>