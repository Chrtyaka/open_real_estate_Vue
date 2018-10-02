<template>
  <div>
    <app-header :name-component="name"/>
    <v-app id="full-filters">
      <v-container fluid class="full-filters-wrapper">
        <v-layout row wrap
                  justify-center
                  align-center>
          <v-flex lg2>
            <h3>Все фильтры</h3>
          </v-flex>
          <v-flex lg3>
            <v-select
              :items="typeObjects"
              label="Тип недвижимости"
              color="deep-purple"
              v-model="filters.propertyType"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
          <!-- Common filters column -->
          <v-flex lg3>
            <common-filters v-model="filters.common" :typeObject="filters.propertyType"/>
          </v-flex>
          <!-- Special filters -->
          <v-flex lg3 offset-lg1>

            <apartments-first v-model="filters.apartments"
                              v-show="residentialType.includes(filters.propertyType) && filters.propertyType !== 'Участки'"
                              :typeObject="filters.propertyType"/>

            <app-gardens v-model="filters.gardens" v-show="filters.propertyType === 'Участки'"/>

            <app-building v-model="filters.commercial.buildings" v-show="filters.propertyType === 'Здания'"/>

            <app-garage v-model="filters.commercial.garages" v-show="filters.propertyType === 'Гаражи'"/>

            <commercial-first v-model = "filters.commercial.common"
                              v-show="commercialType.includes(filters.propertyType) && filters.propertyType !== 'Гаражи'"
                              :typeObject = "filters.propertyType"/>

            <app-offices v-model="filters.commercial.offices" v-show="filters.propertyType === 'Офисы'"/>

            <app-premises v-model="filters.commercial.premises" v-show="filters.propertyType === 'Помещения'"/>

            <app-stock v-model="filters.commercial.stocks" v-show="filters.propertyType === 'Склады'"/>


          </v-flex>

          <!-- Special filters -->
          <v-flex lg3 offset-lg1>

            <apartments-second v-model="filters.apartments"
                               :typeObject="filters.propertyType"
                               v-show="residentialType.includes(filters.propertyType) && filters.propertyType !== 'Участки'"/>

            <buildings-second v-model="filters.commercial.buildings"
                              v-show="commercialType.includes(filters.propertyType) && filters.propertyType !== 'Гаражи'"/>

          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-btn large color="deep-purple" class="white--text" @click = "updateData">Применить</v-btn>
        </v-layout>
      </v-container>
    </v-app>
    <appFooter nameComponent="Объекты"></appFooter>
  </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  import Common from "../components/FullFilters/Common"
  import ApartmentsFirst from "../components/FullFilters/ApartmentsFirst"
  import ApartmentsSecond from "../components/FullFilters/ApartmentsSecond"
  import Garden from "../components/FullFilters/Gardens"
  import Building from "../components/FullFilters/Buildings"
  import Garage from "../components/FullFilters/Garages"
  import CommercialFirst from "../components/FullFilters/CommercialFirst"
  import BuildingsSecond from "../components/FullFilters/BuildingsSecond"
  import Offices from  "../components/FullFilters/Offices"
  import Premises from "../components/FullFilters/Premises"
  import Stock from "../components/FullFilters/Stock"

  export default {
    components: {
      appFooter: Footer,
      appHeader: Header,
      commonFilters: Common,
      apartmentsFirst: ApartmentsFirst,
      apartmentsSecond: ApartmentsSecond,
      appGardens: Garden,
      appBuilding: Building,
      appGarage: Garage,
      commercialFirst: CommercialFirst,
      buildingsSecond : BuildingsSecond,
      appOffices: Offices,
      appPremises : Premises,
      appStock : Stock
    },
    data() {
      return {
        name: 'Objects',
        residentialType : ['Квартиры', 'Комнаты', 'Дома', 'Участки'],
        commercialType : ['Гаражи', 'Офисы', 'Склады', 'Помещения', 'Здания'],
      }
    },
    methods : {
      updateData(){
        this.$store.commit('changeFiltersData', this.filters)
      }
    },
    computed : {
      typeObjects(){
        return this.residentialType.concat(this.commercialType)
      },
      filters(){
        return this.$store.getters.filtersData
      }
    },
    mounted() {
      this.filters.propertyType = 'Квартиры'
    },
  };
</script>

<style lang="scss" scoped>

  @import "../css/main";

  #full-filters {
    font-family: 'Fira Sans Extra Condensed', sans-serif;

    .row {
      margin-left: 0;
      margin-right: 0;
    }
  }

  .full-filters-wrapper {
     width: 100%;
     background-color: $primary-color-text;
     margin-top: 50px;
   }

</style>
