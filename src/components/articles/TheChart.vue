<template>
  <div>
    <h2>Chart</h2>
    <div class="select">
      <select v-model="chartArticleProp">
        <option selected disabled :value="null">Bitte wählen...</option>
        <option v-for="prop in artProps" :key="prop" :value="prop">
          {{ prop }}
        </option>
      </select>
    </div>
    <the-reactive-chart
      :chart="chart"
      v-if="!!chartArticleProp"
    ></the-reactive-chart>
    <p v-else>Bitte wähle zunächst eine Kategorie!</p>
  </div>
</template>

<script>
import TheReactiveChart from '../layout/TheReactiveChart.vue';

export default {
  data() {
    return {
      chartArticleProp: '',
    };
  },
  components: { TheReactiveChart },
  computed: {
    articles() {
      return this.$store.getters['getArticles'];
    },
    artProps() {
      return Object.keys(this.$store.getters['getArticles'][0]);
    },
    chart() {
      let property = this.chartArticleProp;
      const propArray = this.articles.map(function (article) {
        return article[property];
      });
      const occurrences = propArray.reduce(function (acc, curr) {
        if (curr == '') {
          return acc['- leer -'] ? ++acc['- leer -'] : (acc['- leer -'] = 1), acc;
        } else {
          return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
        }
      }, {});
      let values = Object.values(occurrences);
      let labels = Object.keys(occurrences);
      return {
        uuid: 'pieChart',
        data: [
          {
            values: values,
            labels: labels,
            type: 'pie',
          },
        ],
        layout: { title: this.chartArticleProp },
      };
    },
  },
};
</script>

<style scoped>
.center {
  justify-content: center;
  text-align: center;
  width: 70%;
}
</style>