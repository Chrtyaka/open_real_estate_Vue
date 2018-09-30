<template>
    <div>
      <app-header :name-component="name"/>
      <v-app id = "full-filters">
        <v-container fluid class = "full-filters-wrapper">
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
                color = "deep-purple"
                v-model = "filters.propertyType"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <!-- Common filters column -->
            <v-flex lg3>
              <common-filters v-model="filters.common" :typeObject = "filters.propertyType"/>
            </v-flex>
            <!-- Special filters -->
            <v-flex lg3 offset-lg1>

              <transition
                leave-active-class="animatedFadeOut"
                enter-active-class="animated fadeIn">
                <div v-show="filters.propertyType === 'Квартиры' || filters.propertyType === 'Комнаты' ||
                filters.propertyType === 'Дома'">
                  <apartments-first v-model="filters.apartments" :typeObject = "filters.propertyType"/>
                </div>
              </transition>

              <div v-show="filters.propertyType === 'Участки'">
                <app-gardens v-model="filters.gardens"/>
              </div>
            </v-flex>

            <!-- Special filters -->
            <v-flex lg3 offset-lg1>

              <transition enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <div v-show="filters.propertyType === 'Квартиры' || filters.propertyType === 'Комнаты'
                  || filters.propertyType === 'Дома'">
                  <apartments-second v-model="filters.apartments" :typeObject  ="filters.propertyType"/>
                </div>
              </transition>

            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-btn large color="deep-purple" class = "white--text">Применить</v-btn>
          </v-layout>
        </v-container>
      </v-app>
      <appFooter nameComponent = "Объекты"></appFooter>
    </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
  import Common from "../components/FullFilters/Common"
  import ApartmentsFirst from "../components/FullFilters/ApartmentsFirst"
  import ApartmentsSecond from  "../components/FullFilters/ApartmentsSecond"
  import Garden from "../components/FullFilters/Gardens"
    export default {
    components : {
      appFooter : Footer,
      appHeader : Header,
      commonFilters : Common,
      apartmentsFirst : ApartmentsFirst,
      apartmentsSecond : ApartmentsSecond,
      appGardens : Garden
    },
      data(){
        return {
          name : 'Objects',
          typeObjects : ['Квартиры', 'Комнаты','Дома', 'Участки','Гаражи','Офисы','Торговые площади','Склады','Помещения','Здания'],



          filters : {
            propertyType : '',
            common : {
              city : 'Волгоград',
              dateSubmit : 'За любую дату',
              status : 'Вторичка',
              price : {
                min : 100000,
                max : 2000000
              },
              pricePm : {
                min : 10000,
                max : 100000
              },
              floor : {
                min : 1,
                max : 50
              },
              countFloors : {
                min : 1,
                max : 50
              },
              totalArea : {
                min : 1,
                max : 1000
              },
              ceilingHeight : {
                min : 2,
                max : 10
              }
             },
            apartments : {
              typeHouse : '',
              countRooms : [],
              roomsArea : {
                min : 1,
                max : 500
              },
              livingArea : {
                min : 1,
                max : 500
              },
              kitchenArea : {
                min : 1,
                max : 500
              },
              bathroom : '',
              balcony : [],
              lift : '',
              serviceLift : false,
              parking : '',
              repairs : '',
              seller : '',
              windowView : '',
              heating : '',
              otherParameters : []
            },
            gardens : {
              typeGarden : '',
              otherParameters : []
            }
          }
        }
      },

      mounted(){
        this.filters.propertyType = 'Квартиры'
      }
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
  .full-filters {
    height: 100%;

    &__type-object {
      padding-top: 2rem;
    }
  }

</style>
