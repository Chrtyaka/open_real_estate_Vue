import {Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props : ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  // computed: {
  //   chartData: function() {
  //     return this.data;
  //   }
  // },
  // methods : {
  //   renderLineChart() {
  //     this.renderChart(this.chartData, this.options)
  //   }
  // },
  // watch: {
  //   data: function() {
  //     this.$data._chart.destroy();
  //     this.renderChart(this.data, this.options);
  //   }
  // }
}
