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
    currentTypeRealEstate: ''
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
  }
});
