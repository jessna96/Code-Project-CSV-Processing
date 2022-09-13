<template>
  <div :ref="chart.uuid"></div>
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