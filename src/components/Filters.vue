<template>
    <div>
      <div class="container-fluid z-depth-0">
        <div class="row">
          <h5 style="margin-left: auto; margin-right: auto;" class="mt-2">Средняя цена объекта</h5>
        </div>
        <div class="row mt-3 mb-1">
          <div class="dropdown z-depth-1" @click="showDropDown('typeBuild')">
            <div class="col-10">
              <a>{{dropDowns.typeBuild.title}}</a>
            </div>
            <div class="col-2">
              <i class="fa fa-sort-down fa-2x"></i>
            </div>
            <transition
              enter-active-class="drop-in"
              leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.typeBuild.active">
                <ul>
                  <li v-for="item in dropDowns.typeBuild.values" @click = "selectDropDownItem('typeBuild', item); typeRealEstate = item"><a>{{item}}</a></li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

        <div class="row mt-3">
          <div class="dropdown z-depth-1" @click="showDropDown('city')">
            <div class="col-10">
              <a>{{dropDowns.city.title}}</a>
            </div>
            <div class="col-2">
              <i class="fa fa-sort-down fa-2x"></i>
            </div>
            <transition
            enter-active-class="drop-in"
            leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.city.active">
                <ul>
                  <li v-for="item in dropDowns.city.values"
                      @click = "selectDropDownItem('city', item)"><a>{{item}}</a></li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3 input-filter">
          <div class="row ml-0 input-title">
            <p>Цена</p>
          </div>
          <div class="form-row">
            <div class="col-6">
              <div class="md-form form-sm mt-0 ">
                <input type="number" class="form-control" pattern = "[0-9]" v-model="inputFilters.priceMin" step="100000" placeholder="Мин" min="0"
                       required >
              </div>
            </div>
            <div class="col-6">
              <div class="md-form mt-0 form-sm">
                <input type="number" class="form-control"  v-model="inputFilters.priceMax" step="100000" placeholder="Макс" min="0">
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3 input-filter">
          <div class="row ml-0 input-title">
            <p>Площадь м<sup>2</sup></p>
          </div>
          <div class="form-row">
            <div class="col-6">
              <div class="md-form form-sm mt-0 ">
                <input type="number" class="form-control" v-model="inputFilters.minSquare" placeholder="Мин">
              </div>
            </div>
            <div class="col-6">
              <div class="md-form mt-0 form-sm">
                <input type="number" class="form-control" v-model="inputFilters.maxSquare" placeholder="Макс">
              </div>
            </div>
          </div>
        </div>

        <div v-show="typeRealEstate !== 'Здания' || typeRealEstate !== 'Гаражи'">
          <div class="row mt-3 input-filter">
            <div class="row input-title ml-0">
              <p>Цена за м<sup>2</sup></p>
            </div>
            <div class="form-row ml-0">
              <div class="col-6">
                <div class="md-form mt-0 form-sm">
                  <input type="number" class="form-control" v-model="inputFilters.pricePmMin" placeholder="Мин">
                </div>
              </div>
              <div class="col-6">
                <div class="md-form mt-0 form-sm">
                  <input type="number" class="form-control" v-model="inputFilters.pricePmMax" placeholder="Макс">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="typeRealEstate == 'Комнаты' || typeRealEstate == 'Дома' || typeRealEstate =='Квартиры'">
          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click="showDropDown('typeAdvert')">
              <div class="col-10">
                <a>{{dropDowns.typeAdvert.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.typeAdvert.active">
                  <ul>
                    <li v-for = "item in dropDowns.typeAdvert.values"
                        @click = "selectDropDownItem('typeAdvert', item)"><a>{{item}}</a></li>
                  </ul>
                </div>
              </transition>

            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click="showDropDown('wallMaterial')">
              <div class="col-10">
                <a>{{dropDowns.wallMaterial.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show=" dropDowns.wallMaterial.active ">
                  <ul>
                    <li v-for="item in dropDowns.wallMaterial.values" @click = "selectDropDownItem('wallMaterial', item)">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>

            </div>
          </div>

          <div class="row mt-3">
            <p>Количество комнат</p>
          </div>
          <div class="row">
            <div class="container-fluid">
              <div v-if="typeRealEstate == 'Квартиры'" :key="88">
                <input type="checkbox" class="checkbox"
                       value="Студия"
                       id = "Студия"
                       :key="99"
                       v-model="outputParams.countRooms">
                <label for="Студия">Студия</label>
              </div>
              <div v-for="(item, index) in rooms" :key="index">
                <input type="checkbox" class="checkbox"
                       :id = "item"
                       :value = "item"
                       :key="index"
                       v-model="outputParams.countRooms">
                <label :for="item">{{item}}</label>
              </div>
            </div>
          </div>

          <div class="row mt-3 input-filter">
            <div class="row input-title ml-0">
              <p>Этаж</p>
            </div>
            <div class="form-row">
              <div class="col-6">
                <div class="md-form form-sm mt-0 ">
                  <input type="number" class="form-control" v-model="inputFilters.minFloor" placeholder="Мин" min="1" max="50">
                </div>
              </div>
              <div class="col-6">
                <div class="md-form mt-0 form-sm">
                  <input type="number" class="form-control" v-model="inputFilters.maxFloor" placeholder="Макс" min="2" max="50">
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3 input-filter"  >
            <div class="row input-title ml-0">
              <p>Этажность дома</p>
            </div>
            <div class="form-row">
              <div class="col-6">
                <div class="md-form form-sm mt-0 ">
                  <input type="number" class="form-control" v-model="inputFilters.minFloorHouse" placeholder="Мин" min="1" max="50">
                </div>
              </div>
              <div class="col-6">
                <div class="md-form mt-0 form-sm">
                  <input type="number" class="form-control" v-model="inputFilters.maxFloorHouse" placeholder="Макс" min="2" max="50">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="typeRealEstate == 'Офисы'">

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('layout')">
              <div class="col-10">
                <a>{{dropDowns.layout.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.layout.active">
                  <ul>
                    <li v-for = "item in dropDowns.layout.values" @click = "selectDropDownItem('layout', item)">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

        </div>

        <div v-show="typeRealEstate == 'Торговля' || typeRealEstate == 'Помещения' ">

          <div class="row mt-3">
            <div class="dropdown z-depth-1 " @click = "showDropDown('typePremises','trade')">
              <div class="col-10">
                <a>{{dropDowns.trade.typePremises.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.typePremises.active">
                  <ul>
                    <li v-for = "item in dropDowns.trade.typePremises.values"
                        @click = "selectDropDownItem('typePremises', item, 'trade')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('specialization','trade')">
              <div class="col-10">
                <a>{{dropDowns.trade.specialization.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.specialization.active">
                  <ul>
                    <li v-for="item in dropDowns.trade.specialization.values"
                        @click = "selectDropDownItem('specialization', item, 'trade')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('entrance','trade')">
              <div class="col-10">
                <a>{{dropDowns.trade.entrance.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
              leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.entrance.active">
                  <ul>
                    <li v-for="item in dropDowns.trade.entrance.values"
                        @click = "selectDropDownItem('entrance', item, 'trade')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

        </div>

        <div v-if="typeRealEstate == 'Гаражи'">
          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('typeGarage','garage')">
              <div class="col-10">
                <a>{{dropDowns.garage.typeGarage.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.typeGarage.active">
                  <ul>
                    <li v-for="item in dropDowns.garage.typeGarage.values"
                        @click = "selectDropDownItem('typeGarage', item, 'garage')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('typeConstruct','garage')">
              <div class="col-10">
                <a>{{dropDowns.garage.typeConstruct.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.typeConstruct.active">
                  <ul>
                    <li v-for="item in dropDowns.garage.typeConstruct.values"
                        @click = "selectDropDownItem('typeConstruct', item, 'garage')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('status','garage')">
              <div class="col-10">
                <a>{{dropDowns.garage.status.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.status.active">
                  <ul>
                    <li v-for="item in dropDowns.garage.status.values"
                        @click = "selectDropDownItem('status', item, 'garage')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('heating','garage')">
              <div class="col-10">
                <a>{{dropDowns.garage.heating.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.heating.active">
                  <ul>
                    <li v-for="item in dropDowns.garage.heating.values"
                        @click = "selectDropDownItem('heating', item, 'garage')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>

            </div>
          </div>
        </div>

        <div v-if="typeRealEstate == 'Склады'">
          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('crane','stock')">
              <div class="col-10">
                <a>{{dropDowns.stock.crane.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.stock.crane.active">
                  <ul>
                    <li v-for="item in dropDowns.stock.crane.values"
                        @click = "selectDropDownItem('crane',item,'stock')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1"  @click = "showDropDown('gate','stock')">
              <div class="col-10">
                <a>{{dropDowns.stock.gate.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.stock.gate.active">
                  <ul>
                    <li v-for="item in dropDowns.stock.gate.values"
                        @click = "selectDropDownItem('gate',item,'stock')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div v-if="typeRealEstate == 'Здания'">

          <div class="row mt-3 input-filter">
            <div class="row ml-0 input-title">
              <p>Год постройки</p>
            </div>
            <div class="form-row">
              <div class="col-6">
                <div class="md-form form-sm mt-0 ">
                  <input type="number" class="form-control" v-model="inputFilters.yearConstruction" value="1475" step="1" max="2018" maxlength="4">
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('classBuild','buildings')">
              <div class="col-10">
                <a>{{dropDowns.buildings.classBuild.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.buildings.classBuild.active">
                  <ul>
                    <li v-for="item in dropDowns.buildings.classBuild.values"
                        @click = "selectDropDownItem('classBuild',item,'buildings')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>

            </div>
          </div>

          <div class="row mt-3">
            <div class="dropdown z-depth-1" @click = "showDropDown('lineBuild','buildings')">
              <div class="col-10">
                <a>{{dropDowns.buildings.lineBuild.title}}</a>
              </div>
              <div class="col-2">
                <i class="fa fa-sort-down fa-2x"></i>
              </div>
              <transition enter-active-class="drop-in"
                          leave-active-class="drop-out">
                <div class="dropdown-content z-depth-1" v-show="dropDowns.buildings.lineBuild.active">
                  <ul>
                    <li v-for="item in dropDowns.buildings.lineBuild.values"
                        @click = "selectDropDownItem('lineBuild',item,'buildings')">
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </transition>

            </div>
          </div>

        </div>

        <div v-if="typeRealEstate == 'Участки'" class="row mt-3">
          <div class="dropdown z-depth-1" @click = "showDropDown('typeLand')">
            <div class="col-10">
              <a>{{dropDowns.typeLand.title}}</a>
            </div>
            <div class="col-2">
              <i class="fa fa-sort-down fa-2x"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.typeLand.active">
                <ul>
                  <li v-for="item in dropDowns.typeLand.values"
                      @click = "selectDropDownItem('typeLand',item)">
                    <a>{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

        <div v-if="typeRealEstate == 'Дома' || type == 'Участки'">
          <div class="row mt-3 input-filter">
            <div class="row ml-0 input-title">
              <p>Площадь участка</p>
            </div>
            <div class="form-row">
              <div class="col-6">
                <div class="md-form form-sm mt-0 ">
                  <input type="number" class="form-control"  step="10" placeholder="Мин" min="0">
                </div>
              </div>
              <div class="col-6">
                <div class="md-form mt-0 form-sm">
                  <input type="number" class="form-control"   step="10" placeholder="Макс" min="0">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3" v-if = "typeRealEstate !== 'Помещения'">
          <p>Параметры</p>
        </div>

        <div class="row">
          <div class="container-fluid" v-if="typeRealEstate == 'Квартиры' || typeRealEstate == 'Комнаты'">
            <div v-for="(item,index) in rParameters" :key="index">
              <input type="checkbox" class="checkbox"
                     :value = "item"
                     :key="index"
                     :id = "item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
          <div class="container-fluid" v-if="typeRealEstate == 'Дома' || typeRealEstate == 'Участки'">
            <div v-for="item in hParameters">
              <input type="checkbox" class="checkbox"
                     :id = "item"
                     :value = "item"
                     :key="item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
          <div class="container-fluid" v-if="typeRealEstate == 'Гаражи'">
            <div v-for="item in gParameters ">
              <input type="checkbox" class="checkbox"
                     :id = "item"
                     :value = "item"
                     :key="item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
          <div class="container-fluid" v-if="typeRealEstate == 'Офисы' ||  typeRealEstate == 'Торговля'">
            <div v-for="item in oParameters ">
              <input type="checkbox" class="checkbox"
                     :id = "item"
                     :value = "item"
                     :key="item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
          <div class="container-fluid" v-if="typeRealEstate == 'Склады'">
            <div v-for="item in stParameters ">
              <input type="checkbox" class="checkbox"
                     :id = "item"
                     :value = "item"
                     :key="item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
          <div class="container-fluid" v-if="typeRealEstate == 'Здания'">
            <div v-for="item in bParameters ">
              <input type="checkbox" class="checkbox"
                     :id = "item"
                     :value = "item"
                     :key="item"
                     v-model="outputParams.extraOptions">
              <label :for="item">{{item}}</label>
            </div>
          </div>
        </div>

        <div class="row mt-2  ">
          <button type="button" class="btn btn-deep-purple btn-block" @click = "selectObject">Применить</button>
        </div>
        <div v-if="component != 'Price'">
          <router-link class="routeLink mt-2"
                       tag="a"
                       :to="{name : 'price', params : {tabname : type}}">
            Перейти к расчету цены</router-link>
        </div>
        <router-link class="routeLink mt-2" tag="a" to = "/map">Перейти на карту</router-link>
      </div>
    </div>
</template>

<script>
    export default {
      props : ['type','component'],
      name: "Filters",
      data(){
        return{
          rooms : [1,2,3,4,'5+'],
          filtersValue: {},
          rParameters : ['Лифт','Балкон/Лоджия','Телефон','Интернет','Мусоропровод','Охрана'], // Rooms and flats extra options
          hParameters : ['Электричество','Газ','Канализация','Водоснабжение','Телефон'],       // Houses extra options
          gParameters : ['Электричество', 'Охрана','Система пожаротушения'],                   // Garages extra options
          oParameters : ['Мебель','Охрана','Кондиционер','Интернет','Телефон'],                // Offices and trade are extra options
          stParameters : ['Лифт'],                                                             // Stock extra options
          bParameters : ['Мебель', 'Парковка'],                                                // Buildings extra options
          typeRealEstate: 'Квартиры',
          userCity: '',
          outputParams: {
            countRooms:[],
            extraOptions: []
          },
          dropDowns:{
            typeBuild: {
              title: 'Тип недвижимости',
              active: false,
              values: ['Квартиры','Комнаты','Дома','Участки','Гаражи','Офисы','Торговля','Склады','Здания','Помещения']
            },
            city: {
              title: 'Город',
              active: false,
              values: ['Москва','Волгоград', 'Пенза']
            },
            layout: {
              title:'Планировка',
              active: false,
              values : ['Открытая', 'Кабинетная']
            },
            typeAdvert:{
              title:'Тип объявления',
              active: false,
              values: ['Новостройка', 'Вторичка']
            },
            wallMaterial:{
              title:'Материал стен',
              active:false,
              values: ['Кирпичный','Деревянный','Панельный','Блочный','Монолитный','Кирпично-монолитный','Железобетон']
            },
            trade:{
              typePremises: {
                title:'Тип помещения',
                active: false,
                values: ['Street retail', 'В торговом комплексе']
              },
              specialization:{
                title:'Специализация',
                active: false,
                values: ['Кафе','Кофейня','Минимаркет', 'Офис продаж']
              },
              entrance:{
                title:'Вход',
                active: false,
                values: ['Общий с улицы', 'Общий со двора','Отдельный с улицы','Отдельный со двора']
              }
            },
            garage:{
              typeGarage:{
                title:'Тип гаража',
                active: false,
                values: ['Гараж', 'Машиноместо','Бокс']
              },
              typeConstruct:{
                title:'Тип конструкции',
                active: false,
                values: ['Встроенный', 'Капитальный']
              },
              status:{
                title:'Статус',
                active: false,
                values: ['Собственность', 'Кооператив','По договоренности']
              },
              heating:{
                title:'Отопление',
                active:false,
                values: ['Газовое', 'Угольное']
              }
            },
            stock:{
              crane: {
                title:'Кран',
                active: false,
                values: ['Мостовой кран','Кран балка', 'ЖД кран','Козловой кран']
              },
              gate: {
                title:'Ворота',
                active: false,
                values: ['На пандусе', 'Докового типа', 'На нулевой отметке']
              }
            },
            typeLand:{
              title:'Тип участка',
              active: false,
              values: ['Фермерское хозяйство', 'Садоводство', 'Застройка']
            },
            buildings:{
              classBuild:{
                title:'Класс здания',
                active: false,
                values: ['A','A+','B','B+','C+','D']
              },
              lineBuild:{
                title:'Линия домов',
                active:false,
                values: ['Первая','Вторая']
              }
            },
          },
          inputFilters : {
            priceMin: '',
            priceMax: '',
            minSquare:'',
            maxSquare:'',
            pricePmMin:'',
            pricePmMax:'',
            minFloor: '',
            maxFloor:'',
            minFloorHouse:'',
            maxFloorHouse:'',
            yearConstruction: ''
          },
        }
      },
      methods:{
        /* Method for select object from server and display it*/
        selectObject(){
          this.filtersValue.type = this.sParams.type;
          this.filtersValue.city = this.sParams.city;
          for (let n in this.sParams){
              if (this.sParams[n] != '' || this.sParams[n] != 0){
                this.filtersValue[n] = this.sParams[n]
              }
          }
          if (this.component == 'Objects'){
            this.$http.post('select_list', this.filtersValue).then(response =>{
              this.$store.commit('toCard', response.body)
            })
          }else {
            this.filtersValue.typeQuery = 'price';
            this.$http.post('price', this.filtersValue).then(response =>{
              this.$store.commit('toCard', response.body.obj);
              this.$store.commit('price', response.body.price);
            })
          }
        },
        /* Method for showing dropdown content, and manage it*/
        showDropDown(nameDropDown, groupDropDown){
          if (groupDropDown === undefined){
            this.dropDowns[nameDropDown].active = !this.dropDowns[nameDropDown].active;
          }else {
            this.dropDowns[groupDropDown][nameDropDown].active = !this.dropDowns[groupDropDown][nameDropDown].active;
          }
          for ( let el in this.dropDowns){
            if(this.dropDowns[el].title !== undefined){
              if(el !== nameDropDown){
                this.dropDowns[el].active = false;
              }
            }else {
              for (let x in this.dropDowns[el]){
                if(x !== nameDropDown){
                  this.dropDowns[el][x].active = false;
                }
              }
            }
          }
        },
        /* Function for select dropdowns item and push data to output object*/
        selectDropDownItem(nameDropDown, value, groupDropDown){
          if (groupDropDown === undefined){
            this.dropDowns[nameDropDown].title = value
          }else{
            this.dropDowns[groupDropDown][nameDropDown].title = value
          }
          this.outputParams[nameDropDown] = value
        },
      },
      computed:{
        currentTypeRealEstate:{
          get: function () {
            return this.type
          },
          set: function (newValue) {
            this.$store.commit('changeCurrentTypeRealEstate', newValue);
            this.typeRealEstate = newValue;
          }
        },
      },
      mounted(){
        this.$store.commit('changeCurrentTypeRealEstate', this.type)

      }
    }
</script>


<style lang = "scss" scoped>
  @mixin align-items($align){
    -webkit-align-items: $align;
    align-items: $align;

  }
  @mixin justify-content($justify){
    -webkit-justify-content: $justify;
    justify-content: $justify;
  }

  @mixin animation-name($name){
    -webkit-animation-name: $name;
    -moz-animation-name: $name;
    -o-animation-name: $name;
    animation-name: $name;
  }
  @mixin animation-duration($duration){
    -webkit-animation-duration: $duration ;
    -moz-animation-duration: $duration;
    -o-animation-duration: $duration ;
    animation-duration: $duration ;
  }

  $primary-color-dark:   #512DA8;
  $primary-color:        #673AB7;
  $primary-color-light:  #D1C4E9;
  $primary-color-text:   #FFFFFF;
  $accent-color:         #9E9E9E;
  $primary-text-color:   #212121;
  $secondary-text-color: #757575;
  $divider-color:        #BDBDBD;

  /* Common styles */
  .container-fluid{
    background-color: #fff;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .row{
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  .form-row {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
p{
  font-weight: bold;
}
input[placeholder="Макс"]{
  max-width: 153px;
}
.routeLink{
  display: block;
  text-align: center;
  color: black;
  text-decoration: underline;
}
.routeLink:hover{
  color: #6200ea;
}
label{margin-bottom: 0;}


/* Input styles*/
.input-filter{
  display: flex;
  flex-direction: column;

  .input-title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: inherit;

    p {margin-bottom : 0;}
  }
  .md-form{
    margin-bottom: 0;
  }
  .form-control{
    margin: 0 !important;
    &:focus{
      border-bottom: 2px solid $primary-color !important;
      box-shadow: 0 1px 0 0 $primary-color !important;
    }
  }
}
/* Dropdown styles */
.dropdown{
  display: flex;
  @include align-items(center);
  @include justify-content(space-between);
  position: relative;
  width: 100%;
  height: 45px;
  background-color: $primary-color;
  cursor: pointer;

  a {
    padding-left: .5rem;
    color: $primary-color-text;
    font-size: large;
  }
  a:hover{color:$primary-color-text};
  .col-2 {
    height: inherit;
    display: flex;
    @include align-items(center);
    @include justify-content(center);
    padding: 0;
    border-left: 2px solid $primary-color-text;
    .fa {
      color: $primary-color-text;
      padding-bottom: 10%;
    }
  }


  .dropdown-content {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 3.1rem;
    background-color: $primary-color;
    width: inherit;
    z-index: 2;
    max-height: 150px;
    overflow-y: scroll;
    transition: .2s;


    ul{
      list-style-type:none;
      line-height: 1.5;
      padding-left: .5rem;
      padding-right: .5rem;
      margin-bottom: .5rem;
      margin-top: .5rem;

      li {
        display:flex;
        @include align-items(center);
        @include justify-content(flex-start);

        a {color: $primary-color-text;}
      }
      li:hover{
        background-color: $primary-color-text;
        a {color: $primary-color}
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    background: transparent; /* make scrollbar transparent */
  }
}

/*Dropdown stretch animation classes*/
  .drop-in {
    @include animation-name(stretchIn);
    @include animation-duration(.2s);
    max-height: 150px;
    transition: all .2s;
  }
  .drop-out {
    @include animation-name(stretchOut);
    @include animation-duration(.2s);
    max-height: 0;
    transition: all .2s;
  }

  @-webkit-keyframes stretchIn {
    0%{
      max-height: 0;
    }
    100%{
      max-height: 150px;
    }
  }
  @-webkit-keyframes stretchOut {
    0%{
      max-height: 150px;
    }
    100%{
      max-height: 0;
    }
  }











/*****************************/
.checkbox {
  position: relative;
  margin: 0 1rem 0 0;
  cursor: pointer;
}

.checkbox:before {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  content: "";
  position: absolute;
  left: 0;
  z-index: 1;
  width: 1rem;
  height: 1rem;
  border: 2px solid #6200ea;
}

.checkbox:checked:before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  height: .5rem;
  border-color: #6200ea;
  border-top-style: none;
  border-right-style: none;
}

.checkbox:after {
  content: "";
  position: absolute;
  top: -0.125rem;
  left: 0;
  width: 1.1rem;
  height: 1.1rem;
  background: #fff;
  cursor: pointer;
}


</style>
