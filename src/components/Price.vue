<template>
  <div>
    <app-header :name-component="name"/>
      <div class="container-fluid price-wrapper">
        <div class="row pt-3 ">
          <div class="col-md-8">
            <div class="price-title-wrapper">
              <h4 class="font-weight-bold">Расчетная стоимость объекта: {{price}} руб.</h4>
            </div>
            <div class="diagram-wrapper mt-3">
              <highcharts class="chart" :options="chartOptions"></highcharts>
            </div>
            <div class="analogs-title-wrapper mt-3 mb-3">
              <h5 class="font-weight-bold pt-2">Аналоги</h5>
            </div>
            <div v-for="item in objects">
              <appCard :object = "item"></appCard>
            </div>
          </div>
          <div class="col-md-4">
            <appFilters :component = "name" :type="type"></appFilters>
          </div>
        </div>
      </div>
      <appFooter nameComponent = "Цена"></appFooter>
  </div>
</template>

<script>
  import Filters from "../components/Filters"
  import {Chart} from "highcharts-vue"
  import Footer from "../components/Footer"
  import Card from "../components/Cards"
  import Header from  "../components/Header"
    export default {
    components: {
      appFilters : Filters,
      highcharts : Chart,
      appFooter : Footer,
      appCard : Card,
      appHeader : Header
    },
      data(){
        return{
          name: "Price",
          type: "",
          chartOptions: {
            series: [{
              data: [1,2,3] // sample data
            }]
        }
      }
    },
      computed:{
        objects(){
          return this.$store.state.listObjects
        },
        price(){
          return this.$store.state.price
        },
      },
  };
</script>

<style lang = "scss"scoped>

@mixin align-items($align){
  -webkit-align-items: $align;
          align-items: $align;

}
@mixin justify-content($justify){
  -webkit-justify-content: $justify;
          justify-content: $justify;
}
@mixin title-wrappers(){
    display: flex;
    @include align-items(center);
    @include justify-content(center);
    background-color: #fff;
    height: 50px;
}


.price-wrapper{
  margin-top: 50px;
  background-color: #ecf0f1;

  .price-title-wrapper{
    @include title-wrappers;

    h4 {margin-bottom: 0;}

  }
  .analogs-title-wrapper{@include title-wrappers;}
}
</style>
