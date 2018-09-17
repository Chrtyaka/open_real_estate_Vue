import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    listObjects : [],
    price : 0,
    smile : true,
    currentComponent: '',
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
    }
  },
  mutations: {
    toCard(state, list){
      state.listObjects = list;
    },
    price(state, value){
      state.price = value;
    },
    showSmile(state, value){
      state.smile = value;
    },
    changeComponent(state,value){
      state.currentComponent = value
    },
    changeUserRegion(state, value){
      state.userRegion = value;
    },
    changeCurrentTypeRealEstate(state, value){
      state.currentTypeRealEstate = value;
    }
  },
  getters: {
    homeCategoryCards: state => state.homeCategoryCards
  }
});
