<template>
  <div>
    <app-header :name-component="name"/>
    <div class="container-fluid map-container" v-bind:style="mapContainerStyle">
      <l-map ref="map" v-bind:style="mapStyle" :zoom="zoom" :center="center" :options="mapOptions">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <div v-for="item in list">
          <l-marker :lat-lng="item.coord" :icon="customIcons[item.icon]" @click="showInfo(item)" :key="item.id">
          </l-marker>
        </div>
      </l-map>
      <div class="left-middle-block">
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click="userLocate()"><i
          class="fa fa-location-arrow fa-1x"></i></button>
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click="zPlus()"><i
          class="fa fa-plus fa-1x"></i></button>
        <button type="button" class="btn btn-deep-purple  lighten-2 btn-circle" @click="zMinus()"><i
          class="fa fa-minus fa-1x"></i></button>
      </div>
      <div class="btn-sidebar" @click="showSidebar()">
        <img class="btn-sidebar-img">
      </div>
    </div>
    <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight">
      <div class="filters-sidebar-wrapper" v-show="sideBar">
        <appFilters type="Квартиры"></appFilters>
      </div>
    </transition>
    <div class=" container info-object z-depth-2" v-bind:style="{ height : infoSize}">
      <div class="row info-object__header">
        <span class="info-object__header__address">Ваш объект</span>
        <div class="info-object__header__buttons">
          <i class="fa fa-window-minimize" @click="infoObjectContent = !infoObjectContent"></i>
        </div>
      </div>
      <transition enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <app-object-info v-show="infoObjectContent" :infoData="infoData"/>
      </transition>

    </div>
  </div>
</template>

<script>
  import {LMap, LTileLayer, LCircle, LMarker} from 'vue2-leaflet';
  import Filters from '../components/Filters'
  import Header from '../components/Header'
  import ObjectInfo from '../components/Map/ObjectInfo'

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LCircle,
      appFilters: Filters,
      appHeader: Header,
      appObjectInfo: ObjectInfo
    },
    data() {
      return {
        name: 'Map',
        list: [],
        c: {},
        zoom: 11,
        mapOptions: {zoomControl: false},
        center: L.latLng(55.7820534, 37.5680638),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        customIcons: {
          defaultIcon: L.icon({
            iconUrl: require('../assets/icons/marker.png'),
            iconSize: [30, 30],
          }),
          activeIcon: L.icon({
            iconUrl: require('../assets/icons/marker-active.png'),
            iconSize: [40, 40]
          })
        },
        sideBar: false,
        mapStyle: {
          height: "calc(100vh - 50px)",
          position: "absolute",
          zIndex: "0"
        },
        mapContainerStyle: {
          width: "100%",
          height: "calc(100vh - 50px)"
        },
        sidebarStyle: {
          width: "0"
        },
        infoObjectContent: false,
        infoObjectSize: '70%',
        infoData: {
          imgUrl: '',
          price: '',
          address: '',
          countRooms: '',
          floor: '',
          totalArea: ''
        }
      }
    },
    methods: {
      zPlus() {
        this.$refs.map.mapObject.zoomIn()
      },
      zMinus() {
        this.$refs.map.mapObject.zoomOut()
      },
      userLocate() {
        this.$refs.map.mapObject.locate({setView: true})
      },
      showSidebar() {
        if (this.mapContainerStyle.width === "100%") {
          this.mapContainerStyle.width = "calc(100% - 350px)";
          this.sideBar = true;
        } else {
          this.mapContainerStyle.width = "100%";
          this.sideBar = false;
        }
      },
      showInfo(data) {
        for (let el in this.list) {
          this.list[el].icon = data.id === this.list[el].id ? 'activeIcon' : 'defaultIcon';
        }
        this.infoObjectContent = true;
        this.infoData.imgUrl = data.urlThumbImage;
        this.infoData.price = data.price;
        this.infoData.address = data.address;
        this.infoData.countRooms = data.countRooms;
        this.infoData.floor = data.floor;
        this.infoData.totalArea = data.totalArea;
      },
    },
    computed: {
      infoSize() {
        return this.infoObjectContent ? '70%' : '45px'
      }
    },
    created() {
      this.list = this.$store.state.listObjects;
      for (let el in this.list) {
        let cord = [this.list[el].lat, this.list[el].lng];
        this.list[el]['coord'] = cord

        this.list[el]['icon'] = 'defaultIcon'
      }
    },
    mounted() {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 250);
    },
  };
</script>

<style lang="scss" scoped>

  @import "../css/main";

  .map-container {

    padding: 0;
    margin-top: 50px;
    position: absolute;
    transition: 1s;
    overflow: hidden;

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
      top: 0;
      right: 0;
      transform: translateY(calc(50vh - 50px));
      background-color: $primary-color;
      display: flex;
      @include align-items(center);
      @include justify-content(center);
      @include border-radius(10px, 0, 0, 10px);

      .btn-sidebar-img {
        content: url(../assets/icons/settings-map.png);
        cursor: pointer;
      }
      .btn-sidebar-img:hover {
        animation-name: spin;
        @include animation-duration(1.5s);
        @include iteration-count(infinite);
        @include timing-function(linear);

      }
    }

  }

  .filters-sidebar-wrapper {
    position: absolute;
    top: 0;
    right: 0;
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

  .info-object {
    width: 25%;
    height: 70%;
    position: absolute;
    z-index: 2;
    bottom: 0;
    padding: 0;
    overflow: hidden;
    transform: translateX(30%);
    background-color: $primary-color-text;
    @include transition(.2s);

    &__header {
      display: flex;
      @include align-items(center);
      height: 45px;
      margin: 0;
      background-color: $primary-color;

      &__address {
        padding-left: 15px;
        color: $primary-color-text;
        font-size: large;
      }

      &__buttons {
        margin-left: auto;

        i {
          cursor: pointer;
          padding-right: 15px;
          font-size: 1.2em;
          color: $primary-color-text;
        }
      }
    }

    &__content {
      width: 100%;
      height: 90%;
      background-color: #fff;

      &__image {
        margin: 0;
        width: 100%;
        height: 45%;

        img {
          width: 100%;
        }
      }

      &__price {
        width: 100%;
        height: 10%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 1.5rem;
        display: flex;
        @include align-items(center);

        h3 {
          margin-bottom: 0;
          padding-left: 5%;
          font-weight: bold;
        }
      }
      &__address {
        height: 10%;
        width: 100%;
        margin: 0;
        display: flex;
        @include align-items(center);

        h4 {
          padding-left: 5%;
          margin-bottom: 0;
        }
      }
      &__parameters {
        display: flex;
        @include align-items(center);
        @include justify-content(space-between);
        margin: 0;
        width: 100%;
        height: 10%;

        p {
          font-size: large;
          margin-bottom: 0;
        }
      }
      &__links {
        width: 100%;
        height: 10%;
        margin-top: 1rem;
        margin-left: 0;
        margin-right: 0;

        .col-8 {
          display: flex;
          @include justify-content(flex-start);
          @include align-items(center);
          padding-left: 5%;
          padding-right: 0;

          .more-info {
            color: $primary-color;
            font-size: x-large;
            padding: 5px 20px;
            background-color: $primary-color-light;
            border-radius: 20px;

            &:hover {
              color: $primary-color-text;
              background-color: $primary-color;
            }
          }
        }
        .col-4 {
          display: flex;
          @include align-items(center);
          @include justify-content(center);
          padding-right: 5%;

          .add-compare {
            padding-left: 1.5rem;
          }
          .add-favorite, .add-compare {
            color: $primary-color;

            &:hover {
              color: $primary-color-light;
            }
          }
        }
      }
    }
  }
</style>
