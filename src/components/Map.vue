<template>
<div>
    <div class="container-fluid map-container" v-bind:style = "mapContaierStyle">
      <l-map ref="map" v-bind:style = "mapStyle" :zoom="zoom" :center="center" :options = "mapOptions">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <div v-for="item in c">
          <l-circle :lat-lng = "item" :radius = "100"></l-circle>
        </div>
      </l-map>
      <div class="left-middle-block">
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click = "userLocate()"><i class="fa fa-location-arrow fa-1x"></i></button>
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click = "zPlus()"><i class="fa fa-plus fa-1x"></i></button>
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click = "zMinus()"><i class="fa fa-minus fa-1x"></i></button>
      </div>
      <div class="btn-sidebar" @click = "showSidebar()">
        <img class = "btn-sidebar-img">
      </div>
    </div>
    <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight">
      <div class="sidebar-wrapper" v-show="sideBar">
        <appFilters type="Квартиры"></appFilters>
      </div>
    </transition>
    <div class="bottom-sidebar-wrapper" v-bind:style = "bottomSideBarStyle">
      <transition-group
        enter-active-class = "animated slideInUp"
        leave-active-class = "animated fadeOut"
        mode = "out-in">
        <div class="btn-bottom-sidebar" @click = "showBottomSidebar()" v-show = "btnBtmSidebar" key="btn">
          <i class="fa fa-angle-up fa-3x"></i>
        </div>
        <div class="bottom-sidebar" v-show = "bottomSidebar" key = "sideBar">
          <a @click = "showBottomSidebar()">Закрыть</a>
        </div>
      </transition-group>
    </div>
</div>
</template>

<script>
  import { LMap, LTileLayer, LCircle, LMarker} from 'vue2-leaflet';
  import Filters from '../components/Filters'
  export default {
    name: 'Map',
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LCircle,
      appFilters: Filters
    },
    data () {
      return {
        list:[],
        c : {},
        zoom:11,
        mapOptions: { zoomControl: false},
        center: L.latLng(55.7820534, 37.5680638),
        url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        sideBar: false,
        mapStyle: {
          "height" : "calc(100vh - 50px)",
          "position": "absolute",
          "z-index": "0"
        },

        mapContaierStyle:{
          "width" : "100%",
          "height": "calc(100vh - 50px)"
        },

        sidebarStyle: {
          "width" : "0"
        },
        bottomSidebar: false,
        btnBtmSidebar: true,
        bottomSideBarStyle:{
          "width" : "100%"
        }
      }
    },
    methods: {
      zPlus(){
        this.$refs.map.mapObject.zoomIn()
      },
      zMinus(){
        this.$refs.map.mapObject.zoomOut()
      },
      userLocate(){
        this.$refs.map.mapObject.locate( {setView: true})
      },
      showSidebar(){
        if (this.mapContaierStyle.width === "100%"){
          this.mapContaierStyle.width = "calc(100% - 350px)";
          this.sideBar = true;
          this.bottomSidebar = false;
          this.btnBtmSidebar = true;
          this.bottomSideBarStyle.width = "70%";
        }else{
          this.mapContaierStyle.width = "100%";
          this.sideBar = false;
          this.bottomSideBarStyle.width = "100%";
        }
      },
      showBottomSidebar(){
        if(this.bottomSidebar === false){
          this.btnBtmSidebar = false;
          this.bottomSidebar = true;
          if (this.mapContaierStyle.width === "calc(100% - 350px;)"){
            this.mapContaierStyle.width = "100%";
            this.sideBar = false;
            this.bottomSideBarStyle.width = "100%";
          }
        }else{
          this.btnBtmSidebar = true;
          this.bottomSidebar = false;
        }

      }
    },
    created(){
      this.list = this.$store.state.listObjects;
      for (let el in this.list){
        let cord = [this.list[el].lat, this.list[el].lng];
        this.c[el] = cord
      }
    },
    computed:{
    },
    mounted() {
      this.$store.commit('changeComponent', 'Map');
      setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
    },
  };
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
  @mixin border-radius($top-left,$top-right,$bottom-right,$bottom-left){
     -webkit-border-radius: $top-left $top-right $bottom-right $bottom-left;
                    border-radius: $top-left $top-right $bottom-right $bottom-left;
  }
  @mixin animation-duration($duration){
     -webkit-animation-duration: $duration ;
           -moz-animation-duration: $duration;
             -o-animation-duration: $duration ;
                animation-duration: $duration ;
  }
  @mixin iteration-count($count){
    -webkit-animation-iteration-count: $count;
           -moz-animation-iteration-count: $count;
             -o-animation-iteration-count: $count;
                animation-iteration-count: $count;
  }
  @mixin timing-function($function){
    -webkit-animation-timing-function: $function;
           -moz-animation-timing-function: $function;
             -o-animation-timing-function: $function;
                animation-timing-function: $function;
  }
  @mixin transition($duration){
    -webkit-transition: $duration;
       -moz-transition: $duration;
        -ms-transition: $duration;
         -o-transition: $duration;
            transition: $duration;
  }

  $primary-color-dark:   #512DA8;
  $primary-color:        #673AB7;
  $primary-color-light:  #D1C4E9;
  $primary-color-text:   #FFFFFF;
  $accent-color:         #9E9E9E;
  $primary-text-color:   #212121;
  $secondary-text-color: #757575;
  $divider-color:        #BDBDBD;


  .map-container {

    padding: 0;
    margin-top: 50px;
    position: absolute;
    transition: 1s;


    .left-middle-block {
      position: absolute;
      margin-left: 10px;
      margin-bottom: 5px;
      bottom: 45%;
      z-index: 999;
      width: 100px;

      .btn-circle {
        display: flex;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding-left: 0;
        padding-right: 0;
      }
    }

    .btn-sidebar {
      position: absolute;
      height: 50px;
      width: 50px;
      top:0;
      right: 0;
      transform: translateY(calc(50vh - 50px));
      background-color: $primary-color;
      display: flex;
      @include align-items(center);
      @include justify-content(center);
      @include border-radius(10px,0,0,10px);

      .btn-sidebar-img{
        content: url('http://127.0.0.1:5000/static/images/icons/settings-map.png');
        cursor: pointer;
      }
      .btn-sidebar-img:hover{
        animation-name: spin;
        @include animation-duration(1.5s);
        @include iteration-count(infinite);
        @include timing-function(linear);

      }
    }

  }
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    right:0;
    margin-top: 50px;
    z-index: 1;
    width: 350px;
    height: calc(100vh - 50px);
    background-color: $primary-color-text;
    overflow-y: scroll;
    overflow-x: hidden;
    @include transition(1s);

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0;
    background: transparent; /* make scrollbar transparent */
  }
  .bottom-sidebar-wrapper{
    position: fixed;
    display: flex;
    @include align-items(flex-end);
    @include justify-content(center);
    bottom: 0;
    left: 0;
    width: 100%;
    height:35%;

    .btn-bottom-sidebar {
      height: 30px;
      width: 100px;
      background-color: $primary-color;
      @include border-radius(20px,20px,0,0);
      display: flex;
      @include align-items(center);
      @include justify-content(center);

      .fa {
        color: $primary-color-text;
      }
    }

    .bottom-sidebar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      z-index: 1;
      width: 100%;
      background-color: $primary-color-text;
    }
  }




</style>
