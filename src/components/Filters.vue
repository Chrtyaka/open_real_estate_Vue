<template>
  <div>
    <div class="container-fluid z-depth-0">
      <div class="row">
        <h5 style="margin-left: auto; margin-right: auto;" class="mt-2">Средняя цена объекта</h5>
      </div>
      <div class="row mt-3 mb-1">
        <label for="typeRealty">Тип недвижимости</label>
        <div class="dropdown" @click="showDropDown('typeBuild')" id="typeRealty">
          <div class="col-12 dropdown-title-wrapper">
            <a class="dropdown-title">{{dropDowns.typeBuild.title}}</a>
            <i class="fa fa-angle-down"></i>
          </div>
          <transition
            enter-active-class="drop-in"
            leave-active-class="drop-out">
            <div class="dropdown-content z-depth-1" v-show="dropDowns.typeBuild.active">
              <ul class="dropdown-list">
                <li class="dropdown-list-item" v-for="item in dropDowns.typeBuild.values"
                    @click="selectDropDownItem('typeBuild', item); typeRealEstate = item">
                  <a class="dropdown-list-item-value">{{item}}</a>
                </li>
              </ul>
            </div>
          </transition>

        </div>
      </div>

      <div class="row mt-3">
        <label for="city">Город</label>
        <div class="dropdown" @click="showDropDown('city')" id="city">
          <div class="col-12 dropdown-title-wrapper">
            <a class="dropdown-title">{{dropDowns.city.title}}</a>
            <i class="fa fa-angle-down"></i>
          </div>
          <transition
            enter-active-class="drop-in"
            leave-active-class="drop-out">
            <div class="dropdown-content z-depth-1" v-show="dropDowns.city.active">
              <ul class="dropdown-list">
                <li v-for="item in dropDowns.city.values"
                    @click="selectDropDownItem('city', item)" class="dropdown-list-item">
                  <a class="dropdown-list-item-value">{{item}}</a>
                </li>
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
              <input type="number" class="form-control" pattern="[0-9]" v-model="inputFilters.priceMin" step="100000"
                     placeholder="Мин" min="0"
                     required>
            </div>
          </div>
          <div class="col-6">
            <div class="md-form mt-0 form-sm">
              <input type="number" class="form-control" v-model="inputFilters.priceMax" step="100000" placeholder="Макс"
                     min="0">
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
          <label for="typeAdvert">Тип объявления</label>
          <div class="dropdown" @click="showDropDown('typeAdvert')" id="typeAdvert">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.typeAdvert.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.typeAdvert.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.typeAdvert.values"
                      @click="selectDropDownItem('typeAdvert', item)"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

        <div class="row mt-3">
          <label for="wallMaterial">Материал стен</label>
          <div class="dropdown" @click="showDropDown('wallMaterial')" id="wallMaterial">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.wallMaterial.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show=" dropDowns.wallMaterial.active ">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.wallMaterial.values"
                      @click="selectDropDownItem('wallMaterial', item)"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

        <div class="row mt-3">
          <label for="countRooms">Количество комнат</label>
          <div class="container-fluid" id="countRooms">
            <div v-if="typeRealEstate == 'Квартиры'" :key="88">
              <input type="checkbox" class="checkbox"
                     value="Студия"
                     id="Студия"
                     :key="99"
                     v-model="outputParams.countRooms">
              <label for="Студия" style="color: #212121">Студия</label>
            </div>
            <div v-for="(item, index) in rooms" :key="index">
              <input type="checkbox" class="checkbox"
                     :id="item"
                     :value="item"
                     :key="index"
                     v-model="outputParams.countRooms">
              <label :for="item" style="color: #212121">{{item}}</label>
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
                <input type="number" class="form-control" v-model="inputFilters.minFloor" placeholder="Мин" min="1"
                       max="50">
              </div>
            </div>
            <div class="col-6">
              <div class="md-form mt-0 form-sm">
                <input type="number" class="form-control" v-model="inputFilters.maxFloor" placeholder="Макс" min="2"
                       max="50">
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3 input-filter">
          <div class="row input-title ml-0">
            <p>Этажность дома</p>
          </div>
          <div class="form-row">
            <div class="col-6">
              <div class="md-form form-sm mt-0 ">
                <input type="number" class="form-control" v-model="inputFilters.minFloorHouse" placeholder="Мин" min="1"
                       max="50">
              </div>
            </div>
            <div class="col-6">
              <div class="md-form mt-0 form-sm">
                <input type="number" class="form-control" v-model="inputFilters.maxFloorHouse" placeholder="Макс"
                       min="2" max="50">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="typeRealEstate == 'Офисы'">

        <div class="row mt-3">
          <label for="offLayout">Планировка</label>
          <div class="dropdown" @click="showDropDown('layout')" id="offLayout">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.layout.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.layout.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.layout.values"
                      @click="selectDropDownItem('layout', item)"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

      </div>

      <div v-show="typeRealEstate == 'Торговля' || typeRealEstate == 'Помещения' ">

        <div class="row mt-3">
          <label for="tradeTypePren">Тип помещения</label>
          <div class="dropdown" @click="showDropDown('typePremises','trade')" id="tradeTypePren">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.trade.typePremises.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.typePremises.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.trade.typePremises.values"
                      @click="selectDropDownItem('typePremises', item, 'trade')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="tradeSpec">Специализация</label>
          <div class="dropdown" @click="showDropDown('specialization','trade')" id="tradeSpec">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title-item">{{dropDowns.trade.specialization.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.specialization.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.trade.specialization.values"
                      @click="selectDropDownItem('specialization', item, 'trade')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="tradeEnt">Вход</label>
          <div class="dropdown" @click="showDropDown('entrance','trade')" id="tradeEnt">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.trade.entrance.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.trade.entrance.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.trade.entrance.values"
                      @click="selectDropDownItem('entrance', item, 'trade')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

      </div>

      <div v-if="typeRealEstate == 'Гаражи'">
        <div class="row mt-3">
          <label for="garageTypeG">Тип гаража</label>
          <div class="dropdown" @click="showDropDown('typeGarage','garage')" id="garageTypeG">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.garage.typeGarage.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.typeGarage.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.garage.typeGarage.values"
                      @click="selectDropDownItem('typeGarage', item, 'garage')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="garageTypeC">Тип конструкции</label>
          <div class="dropdown" @click="showDropDown('typeConstruct','garage')" id="garageTypeC">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.garage.typeConstruct.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.typeConstruct.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.garage.typeConstruct.values"
                      @click="selectDropDownItem('typeConstruct', item, 'garage')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="garageStatus">Статус</label>
          <div class="dropdown" @click="showDropDown('status','garage')" id="garageStatus">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.garage.status.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.status.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.garage.status.values"
                      @click="selectDropDownItem('status', item, 'garage')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="garageHeat">Отопление</label>
          <div class="dropdown" @click="showDropDown('heating','garage')" id="garageHeat">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.garage.heating.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.garage.heating.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.garage.heating.values"
                      @click="selectDropDownItem('heating', item, 'garage')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>
      </div>

      <div v-if="typeRealEstate == 'Склады'">
        <div class="row mt-3">
          <label for="stockCrane">Кран</label>
          <div class="dropdown" @click="showDropDown('crane','stock')" id="stockCrane">
            <div class="col-12 dropdown-title-wrapper">
              <a>{{dropDowns.stock.crane.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.stock.crane.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.stock.crane.values"
                      @click="selectDropDownItem('crane',item,'stock')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <div class="row mt-3">
          <label for="stockGate">Ворота</label>
          <div class="dropdown" @click="showDropDown('gate','stock')" id="stockGate">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.stock.gate.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.stock.gate.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.stock.gate.values"
                      @click="selectDropDownItem('gate',item,'stock')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
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
                <input type="number" class="form-control" v-model="inputFilters.yearConstruction" value="1475" step="1"
                       max="2018" maxlength="4">
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <label for="buildClass">Класс здания</label>
          <div class="dropdown" @click="showDropDown('classBuild','buildings')" id="buildClass">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.buildings.classBuild.title}}</a>
              <i class="fa fa-angle-down"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.buildings.classBuild.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.buildings.classBuild.values"
                      @click="selectDropDownItem('classBuild',item,'buildings')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

        <div class="row mt-3">
          <label for="buildLine">Линия домов</label>
          <div class="dropdown" @click="showDropDown('lineBuild','buildings')" id="buildLine">
            <div class="col-12 dropdown-title-wrapper">
              <a class="dropdown-title">{{dropDowns.buildings.lineBuild.title}}</a>
              <i class="fa fa-angle-up"></i>
            </div>
            <transition enter-active-class="drop-in"
                        leave-active-class="drop-out">
              <div class="dropdown-content z-depth-1" v-show="dropDowns.buildings.lineBuild.active">
                <ul class="dropdown-list">
                  <li v-for="item in dropDowns.buildings.lineBuild.values"
                      @click="selectDropDownItem('lineBuild',item,'buildings')"
                      class="dropdown-list-item">
                    <a class="dropdown-list-item-value">{{item}}</a>
                  </li>
                </ul>
              </div>
            </transition>

          </div>
        </div>

      </div>

      <div v-if="typeRealEstate == 'Участки'" class="row mt-3">
        <label for="typeLand">Тип участка</label>
        <div class="dropdown" @click="showDropDown('typeLand')" id="typeLand">
          <div class="col-12 dropdown-title-wrapper">
            <a class="dropdown-title">{{dropDowns.typeLand.title}}</a>
            <i class="fa fa-angle-down"></i>
          </div>
          <transition enter-active-class="drop-in"
                      leave-active-class="drop-out">
            <div class="dropdown-content z-depth-1" v-show="dropDowns.typeLand.active">
              <ul class="dropdown-list">
                <li v-for="item in dropDowns.typeLand.values"
                    @click="selectDropDownItem('typeLand',item)"
                    class="dropdown-list-item">
                  <a class="dropdown-list-item-value">{{item}}</a>
                </li>
              </ul>
            </div>
          </transition>

        </div>
      </div>

      <div v-if="typeRealEstate == 'Дома' || typeRealEstate == 'Участки'">
        <div class="row mt-3 input-filter">
          <div class="row ml-0 input-title">
            <p>Площадь участка</p>
          </div>
          <div class="form-row">
            <div class="col-6">
              <div class="md-form form-sm mt-0 ">
                <input type="number" class="form-control" step="10" placeholder="Мин" min="0">
              </div>
            </div>
            <div class="col-6">
              <div class="md-form mt-0 form-sm">
                <input type="number" class="form-control" step="10" placeholder="Макс" min="0">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3" v-if="typeRealEstate !== 'Помещения'">
        <p>Параметры</p>
      </div>

      <div class="row">
        <div class="container-fluid" v-if="typeRealEstate == 'Квартиры' || typeRealEstate == 'Комнаты'">
          <div v-for="(item,index) in rParameters" :key="index">
            <input type="checkbox" class="checkbox"
                   :value="item"
                   :key="index"
                   :id="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
        <div class="container-fluid" v-if="typeRealEstate == 'Дома' || typeRealEstate == 'Участки'">
          <div v-for="item in hParameters">
            <input type="checkbox" class="checkbox"
                   :id="item"
                   :value="item"
                   :key="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
        <div class="container-fluid" v-if="typeRealEstate == 'Гаражи'">
          <div v-for="item in gParameters ">
            <input type="checkbox" class="checkbox"
                   :id="item"
                   :value="item"
                   :key="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
        <div class="container-fluid" v-if="typeRealEstate == 'Офисы' ||  typeRealEstate == 'Торговля'">
          <div v-for="item in oParameters ">
            <input type="checkbox" class="checkbox"
                   :id="item"
                   :value="item"
                   :key="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
        <div class="container-fluid" v-if="typeRealEstate == 'Склады'">
          <div v-for="item in stParameters ">
            <input type="checkbox" class="checkbox"
                   :id="item"
                   :value="item"
                   :key="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
        <div class="container-fluid" v-if="typeRealEstate == 'Здания'">
          <div v-for="item in bParameters ">
            <input type="checkbox" class="checkbox"
                   :id="item"
                   :value="item"
                   :key="item"
                   v-model="outputParams.extraOptions">
            <label :for="item" style="color: #212121;">{{item}}</label>
          </div>
        </div>
      </div>

      <div class="row mt-2  ">
        <button type="button" class="btn btn-deep-purple btn-block" @click="selectObject">Применить</button>
      </div>
      <div v-if="component != 'Price'">
        <router-link class="routeLink mt-2"
                     tag="a"
                     :to="{name : 'price', params : {tabname : type}}">
          Перейти к расчету цены
        </router-link>
      </div>
      <router-link class="routeLink mt-2" tag="a" to="/map">Перейти на карту</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type', 'component'],
    name: "Filters",
    data() {
      return {
        rooms: [1, 2, 3, 4, '5+'],
        filtersValue: {},
        rParameters: ['Лифт', 'Балкон/Лоджия', 'Телефон', 'Интернет', 'Мусоропровод', 'Охрана'], // Rooms and flats extra options
        hParameters: ['Электричество', 'Газ', 'Канализация', 'Водоснабжение', 'Телефон'],       // Houses extra options
        gParameters: ['Электричество', 'Охрана', 'Система пожаротушения'],                   // Garages extra options
        oParameters: ['Мебель', 'Охрана', 'Кондиционер', 'Интернет', 'Телефон'],                // Offices and trade are extra options
        stParameters: ['Лифт'],                                                             // Stock extra options
        bParameters: ['Мебель', 'Парковка'],                                                // Buildings extra options
        typeRealEstate: 'Квартиры',
        userCity: '',
        outputParams: {
          countRooms: [],
          extraOptions: []
        },
        dropDowns: {
          typeBuild: {
            title: 'Квартиры',
            active: false,
            values: ['Квартиры', 'Комнаты', 'Дома', 'Участки', 'Гаражи', 'Офисы', 'Торговля', 'Склады', 'Здания', 'Помещения']
          },
          city: {
            title: 'Волгоград',
            active: false,
            values: ['Москва', 'Волгоград', 'Пенза']
          },
          layout: {
            title: 'Выбрать...',
            active: false,
            values: ['Открытая', 'Кабинетная']
          },
          typeAdvert: {
            title: 'Вторичка',
            active: false,
            values: ['Новостройка', 'Вторичка']
          },
          wallMaterial: {
            title: 'Выбрать...',
            active: false,
            values: ['Кирпичный', 'Деревянный', 'Панельный', 'Блочный', 'Монолитный', 'Кирпично-монолитный', 'Железобетон']
          },
          trade: {
            typePremises: {
              title: 'Выбрать...',
              active: false,
              values: ['Street retail', 'В торговом комплексе']
            },
            specialization: {
              title: 'Выбрать...',
              active: false,
              values: ['Кафе', 'Кофейня', 'Минимаркет', 'Офис продаж']
            },
            entrance: {
              title: 'Выбрать...',
              active: false,
              values: ['Общий с улицы', 'Общий со двора', 'Отдельный с улицы', 'Отдельный со двора']
            }
          },
          garage: {
            typeGarage: {
              title: 'Выбрать...',
              active: false,
              values: ['Гараж', 'Машиноместо', 'Бокс']
            },
            typeConstruct: {
              title: 'Выбрать...',
              active: false,
              values: ['Встроенный', 'Капитальный']
            },
            status: {
              title: 'Выбрать...',
              active: false,
              values: ['Собственность', 'Кооператив', 'По договоренности']
            },
            heating: {
              title: 'Выбрать...',
              active: false,
              values: ['Газовое', 'Угольное']
            }
          },
          stock: {
            crane: {
              title: 'Выбрать...',
              active: false,
              values: ['Мостовой кран', 'Кран балка', 'ЖД кран', 'Козловой кран']
            },
            gate: {
              title: 'Выбрать...',
              active: false,
              values: ['На пандусе', 'Докового типа', 'На нулевой отметке']
            }
          },
          typeLand: {
            title: 'Выбрать...',
            active: false,
            values: ['Фермерское хозяйство', 'Садоводство', 'Застройка']
          },
          buildings: {
            classBuild: {
              title: 'Выбрать...',
              active: false,
              values: ['A', 'A+', 'B', 'B+', 'C+', 'D']
            },
            lineBuild: {
              title: 'Выбрать...',
              active: false,
              values: ['Первая', 'Вторая']
            }
          },
        },
        inputFilters: {
          priceMin: '',
          priceMax: '',
          minSquare: '',
          maxSquare: '',
          pricePmMin: '',
          pricePmMax: '',
          minFloor: '',
          maxFloor: '',
          minFloorHouse: '',
          maxFloorHouse: '',
          yearConstruction: ''
        },
      }
    },
    methods: {
      /* Method for select object from server and display it*/
      selectObject() {
        this.filtersValue.type = this.sParams.type;
        this.filtersValue.city = this.sParams.city;
        for (let n in this.sParams) {
          if (this.sParams[n] != '' || this.sParams[n] != 0) {
            this.filtersValue[n] = this.sParams[n]
          }
        }
        if (this.component == 'Objects') {
          this.$http.post('select_list', this.filtersValue).then(response => {
            this.$store.commit('toCard', response.body)
          })
        } else {
          this.filtersValue.typeQuery = 'price';
          this.$http.post('price', this.filtersValue).then(response => {
            this.$store.commit('toCard', response.body.obj);
            this.$store.commit('price', response.body.price);
          })
        }
      },
      /* Method for showing dropdown content, and manage it*/
      showDropDown(nameDropDown, groupDropDown) {
        if (groupDropDown === undefined) {
          this.dropDowns[nameDropDown].active = !this.dropDowns[nameDropDown].active;
        } else {
          this.dropDowns[groupDropDown][nameDropDown].active = !this.dropDowns[groupDropDown][nameDropDown].active;
        }
        for (let el in this.dropDowns) {
          if (this.dropDowns[el].title !== undefined) {
            if (el !== nameDropDown) {
              this.dropDowns[el].active = false;
            }
          } else {
            for (let x in this.dropDowns[el]) {
              if (x !== nameDropDown) {
                this.dropDowns[el][x].active = false;
              }
            }
          }
        }
      },
      /* Function for select dropdowns item and push data to output object*/
      selectDropDownItem(nameDropDown, value, groupDropDown) {
        if (groupDropDown === undefined) {
          this.dropDowns[nameDropDown].title = value
        } else {
          this.dropDowns[groupDropDown][nameDropDown].title = value
        }
        this.outputParams[nameDropDown] = value
      },
    },
    computed: {
      currentTypeRealEstate: {
        get: function () {
          return this.type
        },
        set: function (newValue) {
          this.$store.commit('changeCurrentTypeRealEstate', newValue);
          this.typeRealEstate = newValue;
        }
      },
    },
    mounted() {
      this.$store.commit('changeCurrentTypeRealEstate', this.type)

    }
  }
</script>


<style lang="scss" scoped>
  @import "../css/main";

  /* Common styles */
  .container-fluid {
    background-color: #fff;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .row {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .form-row {
    width: 100%;
    margin-right: auto;
    margin-left: auto;
  }

  input[placeholder="Макс"] {
    max-width: 153px;
  }

  .routeLink {
    display: block;
    text-align: center;
    color: black;
    text-decoration: underline;
  }

  .routeLink:hover {
    color: #6200ea;
  }

  label {
    margin-bottom: 0;
    color: darken($accent-color, 25%);
  }

  /* Input styles*/
  .input-filter {
    display: flex;
    flex-direction: column;

    .input-title {
      display: flex;
      @include align-items(center);
      @include justify-content(flex-start);
      width: inherit;

      p {
        margin-bottom: 0;
        color: darken($accent-color, 25%)
      }
    }
    .md-form {
      margin-bottom: 0;
    }
    .form-control {
      margin: 0 !important;
      &:focus {
        border-bottom: 2px solid $primary-color !important;
        box-shadow: 0 1px 0 0 $primary-color !important;
      }
    }
  }

  /* Dropdown styles */
  .dropdown {
    display: flex;
    @include align-items(center);
    @include justify-content(space-between);
    position: relative;
    width: 100%;
    height: 45px;
    background-color: transparent;
    border-bottom: 2px solid $primary-color;
    cursor: pointer;

    .dropdown-title-wrapper {
      padding-left: 0;
      padding-right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dropdown-title {
        font-size: large;
      }
    }

    .dropdown-content {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 2.8rem;
      background-color: $primary-color-text;
      width: inherit;
      z-index: 2;
      max-height: 200px;
      overflow-y: scroll;
      transition: .2s;

      .dropdown-list {
        list-style-type: none;
        padding-left: .5rem;
        line-height: 3rem;
        padding-right: .5rem;
        margin-bottom: .5rem;
        margin-top: .5rem;

        .dropdown-list-item {
          display: flex;
          @include align-items(center);
          @include justify-content(flex-start);
          &:hover {
            background-color: #f5f5f5;
          }

          .dropdown-list-item-value {
            padding-left: 5px;
            font-size: large;
          }
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
    0% {
      max-height: 0;
    }
    100% {
      max-height: 150px;
    }
  }

  @-webkit-keyframes stretchOut {
    0% {
      max-height: 150px;
    }
    100% {
      max-height: 0;
    }
  }

  /*****************************/



</style>
