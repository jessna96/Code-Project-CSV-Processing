<template>
  <div class="container-fluid">
    <div :ref="chart.uuid" class="chartdiv"></div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist/plotly';
export default {
  props: {
    chart: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.chart.uuid);
    Plotly.newPlot(
      this.$refs[this.chart.uuid],
      this.chart.data,
      this.chart.layout
    );
  },
  watch: {
    chart: {
      handler() {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.data,
          this.chart.layout
        );
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.chartdiv {
    height: 100%;
    width: 100%;
}
</style>