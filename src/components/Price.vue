<template>
  <div>
    <app-header :name-component="name"/>
    <v-app id = "price">
      <v-container fluid class = "price-wrapper">
        <v-layout row wrap class ="mt-3">
          <v-flex lg12 class ="price-content__title">
            <h3>Рассчетная стоимость объекта: {{price}}</h3>
          </v-flex>
          <v-flex lg8 class = "price-content">
            <v-layout row wrap>
              <v-container class = "price-content__diagram container mt-2 mr-3">
                <price-chart :chartData="dataChart" :options="optionsChart" :style="{width : '100%'}"/>
              </v-container>
            </v-layout>
            <v-layout row wrap justify-center>
              <h3 class="pt-2" v-bind:style="{color : '#673ab6'}">Похожие объекты</h3>
            </v-layout>
            <v-container>

            </v-container>
          </v-flex>
          <v-flex lg4 style="box-shadow:0 4px 8px 0 rgba(0,0,0,.07)">
            <app-filters/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>

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
              label: "Youtube views",
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

  #price {
    font-family: 'Fira Sans Extra Condensed', sans-serif;
    margin-top: 50px;
    .row {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .price-wrapper {
    padding-left: 5rem;
    padding-right: 5rem;

    .price-content {
      &__title {
        h3 {
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
