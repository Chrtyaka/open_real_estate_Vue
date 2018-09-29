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
            <v-flex lg3>
              <v-select
                :items="cities"
                label="Город"
                color = "deep-purple"
                v-model = "filters.common.city"
              ></v-select>

              <v-select
                :items="dateSubmit"
                label="Дата подачи объявления"
                color = "deep-purple"
                v-model = "filters.common.dateSubmit"
              ></v-select>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Цена от"
                    type = "number"
                    min = "0"
                    step = "100000"
                    color = "deep-purple"
                    :max = "filters.common.price.max"
                    v-model = "filters.common.price.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Цена до"
                    type = "number"
                    min = "0"
                    step = "100000"
                    color = "deep-purple"
                    v-model = "filters.common.price.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Цена за м.кв от"
                    type = "number"
                    min = "0"
                    step = "10000"
                    color = "deep-purple"
                    :max = "filters.common.pricePm.max"
                    v-model = "filters.common.pricePm.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Цена за м.кв до"
                    type = "number"
                    min = "0"
                    step = "10000"
                    color = "deep-purple"
                    v-model = "filters.common.pricePm.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Этаж от"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    :max = "filters.common.floor.max"
                    v-model = "filters.common.floor.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Этаж до"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    v-model = "filters.common.floor.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Этажность от"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    :max = "filters.common.countFloors.max"
                    v-model = "filters.common.countFloors.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Этаж до"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    v-model = "filters.common.countFloors.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Общая площадь от"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    :max = "filters.common.totalArea.max"
                    v-model = "filters.common.totalArea.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Общая площадь до"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    v-model = "filters.common.totalArea.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row justify-space-between wrap>
                <v-flex lg5>
                  <v-text-field
                    label="Высота потолков от"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    :max = "filters.common.ceilingHeight.max"
                    v-model = "filters.common.ceilingHeight.min"
                  ></v-text-field>
                </v-flex>
                <v-flex lg5>
                  <v-text-field
                    label="Высота потолков до"
                    type = "number"
                    min = "1"
                    step = "1"
                    color = "deep-purple"
                    v-model = "filters.common.ceilingHeight.max"
                  ></v-text-field>
                </v-flex>
              </v-layout>

            </v-flex>
            <v-flex lg3 offset-lg1>
              <transition
                leave-active-class="animatedFadeOut"
                enter-active-class="animated fadeIn">
                <div v-show="filters.propertyType === 'Квартиры' || filters.propertyType === 'Комнаты'">
                  <v-select
                    :items="typeHouse"
                    label="Тип дома"
                    color = "deep-purple"
                    v-model = "filters.apartments.typeHouse"
                  ></v-select>

                  <v-combobox
                    v-model="filters.apartments.countRooms"
                    :items="countRooms"
                    label="Количество комнат"
                    color = "deep-purple"
                    multiple
                  ></v-combobox>

                  <v-layout row justify-space-between wrap>
                    <v-flex lg5>
                      <v-text-field
                        label="Площадь комнат от"
                        type = "number"
                        min = "1"
                        step = "3"
                        color = "deep-purple"
                        :max = "filters.apartments.roomsArea.max"
                        v-model = "filters.apartments.roomsArea.min"
                      ></v-text-field>
                    </v-flex>
                    <v-flex lg5>
                      <v-text-field
                        label="Площадь комнат до"
                        type = "number"
                        min = "1"
                        step = "3"
                        color = "deep-purple"
                        v-model = "filters.apartments.roomsArea.max"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row justify-space-between wrap>
                    <v-flex lg5>
                      <v-text-field
                        label="Площадь кухни от"
                        type = "number"
                        min = "1"
                        step = "3"
                        color = "deep-purple"
                        :max = "filters.apartments.kitchenArea.max"
                        v-model = "filters.apartments.kitchenArea.min"
                      ></v-text-field>
                    </v-flex>
                    <v-flex lg5>
                      <v-text-field
                        label="Площадь кухни до"
                        type = "number"
                        min = "1"
                        step = "3"
                        color = "deep-purple"
                        v-model = "filters.apartments.kitchenArea.max"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-select
                    :items="bathroom"
                    label="Санузел"
                    color = "deep-purple"
                    v-model = "filters.apartments.bathroom"
                  ></v-select>

                  <v-combobox
                    v-model="filters.apartments.balcony"
                    :items="balcony"
                    label="Балкон"
                    color = "deep-purple"
                    multiple
                  ></v-combobox>

                  <v-layout row justify-space-between align-center >
                    <v-flex lg6>
                      <v-select
                        :items="lift"
                        label="Количество лифтов"
                        color = "deep-purple"
                        v-model = "filters.apartments.lift"
                      ></v-select>
                    </v-flex>
                    <v-flex lg5>
                      <v-checkbox
                        label="Грузовой лифт"
                        v-model="filters.apartments.serviceLift"
                        color = "deep-purple"
                      ></v-checkbox>
                    </v-flex>
                  </v-layout>

                  <v-select
                    :items="parking"
                    label="Парковка"
                    color = "deep-purple"
                    v-model = "filters.apartments.parking"
                  ></v-select>
                </div>
              </transition>


            </v-flex>

            <v-flex lg3 offset-lg1>

              <transition enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <div v-show="filters.propertyType === 'Квартиры' || filters.propertyType === 'Комнаты'">
                  <v-select
                    :items="repairs"
                    label="Ремонт"
                    color = "deep-purple"
                    v-model = "filters.apartments.repairs"
                  ></v-select>

                  <v-select
                    :items="seller"
                    label="Продавец"
                    color = "deep-purple"
                    v-model = "filters.apartments.seller"
                  ></v-select>

                  <v-select
                    :items="windowView"
                    label="Вид из окна"
                    color = "deep-purple"
                    v-model = "filters.apartments.windowView"
                  ></v-select>

                  <v-select
                    :items="heatingApartments"
                    label="Отопление"
                    color = "deep-purple"
                    v-model = "filters.apartments.heating"
                  ></v-select>

                  <v-combobox
                    v-model="filters.apartments.otherParameters"
                    :items="apartmentsOtherParams"
                    label="Дополнительные параметры"
                    color = "deep-purple"
                    multiple
                  ></v-combobox>
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
    export default {
    components : {
      appFooter : Footer,
      appHeader : Header
    },
      data(){
        return {
          name : 'Objects',
          typeObjects : ['Квартиры', 'Комнаты', 'Участки','Гаражи','Офисы','Торговые площади','Склады','Помещения','Здания'],
          cities : ['Москва', 'Волгоград', 'Пенза'],
          dateSubmit : ['За любую дату', 'За час','За сутки', 'За 10 дней', 'За месяц'],
          typeHouse : ['Кирпичный','Деревянный', 'Монолитный', 'Панельный','Блочный','Кирпично-молонитный','Сталинка','Хрущевка'],
          countRooms : [1,2,3,4, '5+'],
          bathroom : ['Вместе', 'Раздельный'],
          balcony : ['Балкон','Лоджия'],
          lift : ['Не важно',1,2,3,4],
          parking : ['Наземная','Подземная','Многоуровневая','На крыше'],
          repairs : ['Евроремонт','Косметический', 'Дизайнерский', 'Без ремонта'],
          seller : ['Агенство','Собственник'],
          windowView : ['Во двор','На улицу'],
          heatingApartments : ['Централизованное','Автономное'],
          apartmentsOtherParams : ['Охрана','Консьерж','Мебель','Кухонный гарнитур','Интернет','Телефон','Кабельное',
            'Кондиционер','Бытовая техника'],


          filters : {
            propertyType : '',
            common : {
              city : 'Волгоград',
              dateSubmit : 'За любую дату',
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
            living : {
              common : {

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
            house : {

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
