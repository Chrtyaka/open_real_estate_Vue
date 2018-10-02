import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    listObjects : [],
    price : 0,
    userRegion:'',
    currentTypeRealEstate: '',
    homeCategoryCards: {
      firstRow : [
        {
          title : 'Квартиры',
          links :   ['1-комнатные', '2-комнатные', '3-комнатные','Свободная планировка','Студия','Новостройки'],
          thumbnailLink : 'homepage-apartment.jpg'
        },
        {
          title: 'Комнаты',
          links: ['В квартире', 'В общежитии'],
          thumbnailLink : 'homepage-room.jpg'
        },
        {
          title: 'Участки',
          links: ['Коттеджный участок', 'Свободная застройка'],
          thumbnailLink : 'homepage-garden.jpg'
        }
      ],
      secondRow : [
        {
          title : 'Дома',
          links : ['Дача', 'Коттедж','Таунхаус'],
          thumbnailLink : 'homepage-house.jpg'
        },
        {
          title: 'Гаражи',
          links: ['Гараж', 'Бокс', 'Машиноместо'],
          thumbnailLink: 'homepage-garage.jpg'
        },
        {
          title: 'Офисы',
          links: ['Офис'],
          thumbnailLink: 'homepage-office.jpg'
        }
      ],
      thirdRow: [
        {
          title: 'Склады',
          links : ['Склад'],
          thumbnailLink : 'homepage-stock.jpg'
        },
        {
          title: 'Здания',
          links: ['Здание','Бизнес-центр','Торговый центр'],
          thumbnailLink: 'homepage-building.jpg'
        },
        {
          title: 'Помещения',
          links: ['Торговая площадь','Производственное помещеие','Помещение свободного назначения'],
          thumbnailLink: 'homepage-trade-area.jpg'
        }
      ],
    },
    filtersData : {
      propertyType: '',
      common: {
        city: 'Волгоград',
        dateSubmit: 'За любую дату',
        status: 'Вторичка',
        price: {
          min: 100000,
          max: 2000000
        },
        pricePm: {
          min: 10000,
          max: 100000
        },
        floor: {
          min: 1,
          max: 50
        },
        countFloors: {
          min: 1,
          max: 50
        },
        totalArea: {
          min: 1,
          max: 1000
        },
        ceilingHeight: {
          min: 2,
          max: 10
        }
      },
      apartments: {
        typeHouse: '',
        countRooms: [],
        roomsArea: {
          min: 1,
          max: 500
        },
        livingArea: {
          min: 1,
          max: 500
        },
        kitchenArea: {
          min: 1,
          max: 500
        },
        bathroom: '',
        balcony: [],
        lift: '',
        serviceLift: false,
        parking: '',
        repairs: '',
        seller: '',
        windowView: '',
        heating: '',
        otherParameters: []
      },
      gardens: {
        typeGarden: '',
        otherParameters: []
      },
      commercial: {
        common: {
          entrance: '',
          repairs: '',
          parking: '',
          parameters: ''
        },
        offices : {
          layout : ''
        },
        premises : {
          typePremises : '',
          specialization: '',
        },
        stocks : {
          crane : '',
          gate : ''
        },
        buildings: {
          classBuild: '',
          lineBuild: '',
          yearConstruction: '',
          ventilation : '',
          conditioning: '',
          heating : '',
          firefighting : ''
        },
        garages: {
          typeGarage: '',
          typeConstruction: '',
          status: '',
          heating: '',
          length: '',
          width: '',
          parameters: []
        }
      }
    },

  },
  mutations: {
    toCard(state, list){
      state.listObjects = list;
    },
    price(state, value){
      state.price = value;
    },
    changeUserRegion(state, value){
      state.userRegion = value;
    },
    changeCurrentTypeRealEstate(state, value){
      state.currentTypeRealEstate = value;
    },
    changeFiltersData(state,value) {
      state.filtersData = value;
    }
  },
  getters: {
    homeCategoryCards: state => state.homeCategoryCards,
    filtersData : state => state.filtersData
  }
});
