<template>
  <div>
    <app-header :name-component="name"/>
    <div class="container-fluid price-wrapper">
      <div class="row pt-5">
        <div class="col-lg-8 price-content">
          <div class="price-content__title">
            <h4>Расчетная стоимость объекта: {{price}} руб.</h4>
          </div>
          <div class="price-content__diagram container mt-3">
            <price-chart :chartData="dataChart" :options="optionsChart" :style="{width : '100%'}"/>
          </div>
          <div class="price-content__analogs mt-3 mb-3">
            <h5 class="pt-2">Похожие объекты</h5>

          </div>
        </div>
        <div class="col-lg-4 filters-wrapper" style="box-shadow:0 4px 8px 0 rgba(0,0,0,.07);">
          <appFilters :component="name" :type="type"></appFilters>
        </div>
      </div>
    </div>
    <appFooter nameComponent="Цена"></appFooter>
  </div>
</template>

<script>
  import Filters from "../components/Filters"
  import Footer from "../components/Footer"
  import Card from "../components/Cards"
  import Header from "../components/Header"
  import PriceChart from "./Price/PriceChart"

  export default {
    components: {
      appFilters: Filters,
      appFooter: Footer,
      appCard: Card,
      appHeader: Header,
      priceChart: PriceChart
    },
    data() {
      return {
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
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Динамика цен',
            fontSize: 20,
            fontColor: '#673ab6',
          }
        },
        name: "Price",
        type: ""
      }
    },
    computed: {
      objects() {
        return this.$store.state.listObjects
      },
      price() {
        return this.$store.state.price
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../css/main";

  .price-wrapper {
    padding-left: 5rem;
    padding-right: 5rem;
    margin-top: 50px;
    background-color: #f4f5f6;

    .price-content {
      &__title {
        h4 {
          color: $primary-color;
          margin-bottom: 0;
        }
      }
      &__diagram {
        display: flex;
        position: relative;
        @include align-items(center);
        height: 450px;
        background-color: $primary-color-text;
        @include border-radius(10px, 10px, 10px, 10px);
        @include box-shadow(0, 4px, 8px, 0, rgba(0, 0, 0, .07))
      }
      &__analogs {
        h5 {
          color: $primary-color;
        }
      }
    }

    .filters-wrapper {
      margin-top: 2.8rem;
      padding-left: 0;
      padding-right: 0;
    }
  }

</style>
