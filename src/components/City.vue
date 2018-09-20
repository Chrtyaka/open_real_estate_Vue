<template>
  <div>
    <app-header/>
    <div class="container-fluid city-wrapper">
      <div class="row">
        <div class="col-lg-8">
          <div class="container diagram-wrapper mt-3">
            <city-chart :chart-data="chartData" :options="optionsChart" :style="{width: '100%', height : '100%'}"/>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="filters-wrapper mt-3">
            <form>
              <div class="form-row filters-wrapper__year-inputs">
                <div class="col">
                  <div class="md-form filters-wrapper__year-inputs--from">
                    <input type="number" class="form-control" placeholder="От" min="2010"
                           max="2017"
                           step="1"
                           v-model="filters.yearMin">
                  </div>
                </div>
                <div class="col">
                  <div class="md-form filters-wrapper__year-inputs--to">
                    <input type="number" class="form-control" placeholder="До" min="2010"
                           max="2017"
                           step="1"
                           v-model="filters.yearMax">
                  </div>
                </div>
              </div>
            </form>
            <div class="row filters-wrapper__title">
              <h6>Критерии</h6>
            </div>
            <div class="row filters-wrapper__checkbox">
              <div class="filters-wrapper__checkbox__container">
                <div class="row" v-for="(item, index) in criteriaList.features">
                  <input type="checkbox" class="checkbox"
                         :id="'feature' + index"
                         :key = "index"
                         :value = "item.feature_name"
                         v-model="filters.checkedFeature"
                  >
                  <label :for="'feature' + index">{{item.feature_name}}</label>
                </div>
              </div>
            </div>

            <div class="row filters-wrapper__title">
              <h6>Регионы</h6>
            </div>
            <div class="row filters-wrapper__checkbox">
              <div class="filters-wrapper__checkbox__container">
                <div class="row" v-for="item in regions.area">
                  <input type="checkbox" class="checkbox"
                         :id="'area' + item.area_id"
                         :value = "item.area_name"
                         :key = "item.area_id"
                         v-model="checkedRegions"
                         @change = "loadLocality"
                  >
                  <label :for="'area' + item.area_id">{{item.area_name}}</label>
                </div>
              </div>
            </div>
            <div class="row filters-wrapper__title">
              <h6>Города</h6>
            </div>
            <div class="row filters-wrapper__checkbox">
              <div class="filters-wrapper__checkbox__container">
                <div class="row" v-for="(item, index) in localities">
                  <input type="checkbox" class="checkbox"
                         :id="index"
                         :value = "item.locality_name"
                         :key = "index"
                         v-model = "filters.checkedCity"
                  >
                  <label :for="index">{{item.locality_name}}</label>
                </div>
              </div>
            </div>
            <div class="row filters-wrapper__buttons">
              <div class="col-md-6 filters-wrapper__buttons--purple">
                <button type="button" class = "btn btn-block" @click = "updateDiagram">Показать</button>
              </div>
              <div class="col-md-6 filters-wrapper__buttons--default">
                <button type="button" class = "btn btn-default btn-block">Отчет</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer/>
  </div>
</template>

<script>
  import Header from "../components/Header"
  import CityChart from "../components/City/CityStatChart"
  import Footer from  "../components/Footer"

  export default {
    name: "City",
    components: {
      appHeader: Header,
      cityChart: CityChart,
      appFooter : Footer
    },
    data(){
      return {
        criteriaList: [],
        regions : [],
        checkedRegions : [],
        localities : [],
        filters : {
          checkedCity : [],
          checkedFeature : [],
          yearMin : '2010',
          yearMax : '2017'
        },
        dataChart: {
          labels: ['January', 'February'],
          datasets: [
            {
              label: 'GitHub Commits',
              borderColor: '#f87979',
              backgroundColor: 'rgba(248, 119, 119, 0.54)',
              data: [3000000, 2000000],
              fill: true,
              borderWidth: 1
            },
            {
              label: "Pornhub views",
              borderColor: '#673ab6',
              backgroundColor: 'rgba(103, 58, 182, 0.54)',
              data: [6000000, 7500000],
              borderWidth: 1
            }
          ]
        },
        optionsChart: {
          responsive : true,
          maintainAspectRatio : false
        }
      }
    },
    computed: {
      chartData() {
        return this.dataChart
      }
    },
    methods: {
      loadLocality() {
        this.localities = [];
        let arr = {
          "area_name": ""
        };
        if (this.checkedRegions.length !== 0) {
          for (let n in this.checkedRegions) {
            arr.area_name = this.checkedRegions[n];
            this.$http.post('get_locality', arr).then(response => {
              let res = response.body;
              for(let el in res.locality){
                this.localities.push(res.locality[el])
              }
            });
          }
        }
      },
      updateDiagram(){
        this.$http.post('get_feature_locality', this.filters).then(response => {
          let result = response.body;
          this.dataChart = {}
          this.dataChart['labels'] = result.labels
          this.dataChart['datasets'] = []
          for (let el in result.datasets) {
            result.datasets[el]['backgroundColor'] = this.pickColor()
            result.datasets[el]['fill'] = true
            result.datasets[el]['borderWidth'] = 1

            this.dataChart.datasets.push(result.datasets[el])
          }
        })
      },
      pickColor(){
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
      }
    },
    mounted(){
      this.$http.get('get_feature').then(response => {
        this.criteriaList = response.body;
      });
      this.$http.post('get_area').then(response => {
        this.regions = response.body;
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/main";

  .city-wrapper {
    padding-left: 3rem;
    padding-right: 3rem;
    margin-top: 50px;
    background-color: #f3f5f6;
    height: calc(100vh - 108px);
  }

  .diagram-wrapper {
    display: flex;
    position: relative;
    @include align-items(center);
    height: 75vh;
    background-color: $primary-color-text;
    @include box-shadow(0, 4px, 8px, 0, rgba(0, 0, 0, .07))
  }

  .filters-wrapper {
    height: 75vh;
    background-color: $primary-color-text;
    @include box-shadow(0, 4px, 8px, 0, rgba(0, 0, 0, .07));

    &__title {
      display: flex;
      @include align-items(center);
      @include justify-content(center);
      margin-left: 0;
      margin-right: 0;
      text-align: center;

      h6 {
        margin-bottom: 0;
        padding: 5px;
      }
    }

    &__year-inputs {

      .md-form {
        margin: 0 !important;
      }

      &--from {
        padding-left: 1rem;
      }
      &--to {
        padding-right: 1rem;
      }
    }

    &__checkbox {
      margin-right: 0;
      margin-left: 0;

      &__container {
        width: 100%;
        height: 15vh;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-right: 1rem;
        margin-left: 1rem;

        .row {
          display: flex;
          @include align-items(center);
          flex-wrap: nowrap;
          margin-right: 0;
          margin-left: 0;

          label {
            margin-bottom: 0;
          }
        }
      }
    }

    &__buttons {
      margin-top: .5rem;
      &--purple {
        padding-left: 2rem;
        padding-right: 1rem;

        button {
          background-color: $primary-color;
        }
      }

      &--default {
        padding-right: 2rem;
      }
    }
  }

</style>
