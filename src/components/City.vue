<template>
  <div>
    <app-header/>
    <div class="container-fluid city-wrapper">
      <div class="row">
        <div class="col-lg-8">
          <div class="container diagram-wrapper mt-3">
            <city-chart
                :chart-data="chartData"
                :options="optionsChart"
                :style="{width: '100%', height : '89%'}"
                v-show="pickedContent === 'diagram'"
              />
            <div class="map-container" v-show="pickedContent === 'map'">
              <l-map ref="map" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-circle v-for="item in mapData"
                          :lat-lng = "item.coord"
                          :radius = "2500"
                          :color = "circleOptions.color"
                          :fillColor = "circleOptions.fillColor"
                >
                  <l-popup>
                    <h5>{{item.city}}</h5>
                    <span v-for="el in Object.keys(item.values)">{{el + ':' + item.values[el]}}<br/></span>
                  </l-popup>
                </l-circle>
                <div class="cssload-container" v-show="load">
                  <div class="cssload-speeding-wheel"></div>
                </div>
              </l-map>
            </div>
            <div class="row btn-switch">
              <div class="btn-group" data-toggle="buttons">
                <label class="btn active" @click = "pickedContent = 'diagram'">
                  <input type="radio" name="options" autocomplete="off">Диаграмма
                </label>
                <label class="btn" @click = "initMap()">
                  <input type="radio" name="options" autocomplete="off"> Карта
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="filters-wrapper mt-3">
            <div class="row filters-wrapper__title">
              <h6 class="pb-0">Период</h6>
            </div>
            <form>
              <div class="form-row filters-wrapper__year-inputs mt-1">
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
            <div class="row filters-wrapper__title" v-show="pickedContent === 'map'">
              <h6 v-bind:style="{color : '#673AB7'}"><sup>*</sup>Выберите один критерий</h6>
            </div>
            <div class="row filters-wrapper__checkbox">
              <div class="filters-wrapper__checkbox__container"
                   v-bind:style="{height: criteriaListHeight, overflowY : pickedContent === 'map' ? 'hidden': 'scroll'}">
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
            <div v-show="pickedContent === 'diagram'">
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
            </div>
            <div class="row filters-wrapper__buttons mt-2">
              <div class="col-md-6 filters-wrapper__buttons--purple">
                <button type="button" class = "btn btn-block" @click = "updateContent">Показать</button>
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
  import {LMap, LTileLayer, LCircle,LPopup} from 'vue2-leaflet';

  export default {
    name: "City",
    components: {
      LMap,
      LTileLayer,
      LCircle,
      LPopup,
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
        pickedContent : 'diagram',
        mapData : [],
        circleOptions : {
          color : '#673AB7',
          fillOpacity: '0.5',
          fillColor : ''
        },
        load: false,
        zoom: 3,
        center : [66.25, 94.14],
        url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2hydHlha2EiLCJhIjoiY2ptYzMxeWtvMDQ3ZzN2bzlpd3BlZnFmdiJ9.ybOJY_NY-PPYXv7bVUm1jQ',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        filters : {
          checkedCity : [],
          checkedFeature : [],
          yearMin : '2010',
          yearMax : '2017'
        },
        dataChart: {
          labels: [],
          datasets: []
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
      },
      criteriaListHeight(){
        return this.pickedContent === 'diagram' ? '15vh' : '49vh'
      }
    },
    methods: {
      loadLocality() {
        this.localities = [];
        this.filters.checkedCity = [];
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
      updateContent(){
        if (this.pickedContent === 'diagram'){
          this.$http.post('get_feature_locality', this.filters).then(response => {
            let result = response.body;
            this.dataChart = {};
            this.dataChart['labels'] = result.labels;
            this.dataChart['datasets'] = [];
            for (let el in result.datasets) {
              result.datasets[el]['backgroundColor'] = this.pickColor();
              result.datasets[el]['fill'] = true;
              result.datasets[el]['borderWidth'] = 1;

              this.dataChart.datasets.push(result.datasets[el])
            }
          })
        }else {
          this.load = true;
          this.$http.post('init_map', this.filters).then(response => {
            this.mapData = response.body;
            let color = this.pickColor();
            this.circleOptions.color = color;
            this.circleOptions.fillColor = color;
            this.load = false
          })
        }

      },
      pickColor(){
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
      },
      initMap(){
        this.pickedContent = 'map';
        if (this.mapData.length === 0) {
          this.load = true;
          if(this.filters.checkedFeature.length === 0){
            this.filters.checkedFeature.push('Численность населения')
          }
          this.$http.post('init_map', this.filters).then(response => {
            this.mapData = response.body;
            let color = this.pickColor()
            this.circleOptions.color = color;
            this.circleOptions.fillColor = color;
            this.load = false
          })
        }
      }
    },
    mounted(){
      this.$http.get('get_feature').then(response => {
        this.criteriaList = response.body;
      });
      this.$http.post('get_area').then(response => {
        this.regions = response.body;
      });

    },
    updated() {
      this.$refs.map.mapObject.invalidateSize()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../css/main";

  .md-form, .form-control {
    margin: 0 !important;
  }
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
    padding: 0;
    @include align-items(flex-start);
    flex-direction: column;
    height: 78vh;
    background-color: $primary-color-text;
    @include box-shadow(0, 4px, 8px, 0, rgba(0, 0, 0, .07));

    .map-container {
      width: 100%;
      height: 89%;
      position: relative;
      z-index: 5;
    }

    .btn-switch {
      display: flex;
      width: 100%;
      @include align-items(center);
      @include justify-content(center);

      .btn {
        background-color: $primary-color-light;
      }
      .active {
        background-color: $primary-color;
      }

      input {
        display: none;
      }
    }
  }

  .filters-wrapper {
    height: 78vh;
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
