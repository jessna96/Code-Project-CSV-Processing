<template>
  <div class="container">
    <the-articles></the-articles>
    <the-chart></the-chart>
  </div>
</template>

<script>
import TheArticles from './TheArticles.vue';
import TheChart from './TheChart.vue';

export default {
  components: { TheArticles, TheChart },
};
</script>