<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-sm  z-depth-0 scrolling-navbar" v-bind:class="navbarClass"
    v-bind:style="{opacity : navbarOpacity}">

      <!-- Navbar brand -->
      <router-link to="/home">
        <a class="navbar-brand waves-effect ml-5" target="_blank">
          <div class="brand-wrapper">
            <img :src="mainLogoUrl" v-model = "logoUrl" height="30" alt="">
            <strong v-bind:class="brandText" v-model="currentClass" class="pt-2 pl-2">ОТКРЫТАЯ НЕДВИЖИМОСТЬ</strong>
          </div>
        </a>
      </router-link>
      <!-- Collapse button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

        <!-- Links -->
          <ul class="navbar-nav">

          <router-link to="/map" tag = "li">
            <li class="nav-item">
              <a class="nav-link waves-effect " v-bind:class="brandText" >
                 Карта
              </a>
            </li>
          </router-link>
          <router-link to="/objects" tag = "li">
            <li class="nav-item">
              <a class="nav-link waves-effect" v-bind:class="brandText" >
                Объекты
                <span class="sr-only">(current)</span>
              </a>
            </li>
          </router-link>
          <router-link :to="{name : 'price', params : {tabname : 'Квартиры'}}" tag = "li">
            <li class="nav-item" >
              <a class="nav-link waves-effect" v-bind:class="brandText">
                Расчет цен
              </a>
            </li>
          </router-link>
          <router-link :to="{name : 'price', params : {tabname : 'Квартиры'}}" tag = "li">
            <li class="nav-item" >
              <a class="nav-link waves-effect" v-bind:class="brandText">
                Города
              </a>
            </li>
          </router-link>
        </ul>
        <!-- Links -->
        <div class="right-header-block">
          <span v-bind:class="brandText">Регион</span>
          <div class="region-dropdown" >
            <a v-bind:class="dropDownClass">{{userRegion}}</a>
            <transition
              enter-active-class = "animated fadeIn">
              <div class="dropdown-content">
               <ul>
                  <li v-for = "item in regions" @click="changeUserRegion(item)"><a>{{item}}</a></li>
               </ul>
            </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- Collapsible content -->
    </nav>
  </div>
</template>

<script>
    export default {
    props: {
      nameComponent : String
    },
      data(){
        return{
          sideBar : false,
          navbarClass: 'navbar-light white',
          navbarOpacity: '',
          brandText: 'custom-text',
          mainLogoUrl: "",
          regions:['Волгоградская область','Московская область', 'Алтайский край'],
          dropDownClass:'',
          scroll : ''
        }
      },
      methods:{
        handleScroll(event){
          if(this.nameComponent !== 'Home'){
              // Статичный Header
              this.mainLogoUrl = require("../assets/icons/main-icon-primary-color.png");
              this.navbarClass = "navbar-light white";
              this.navbarOpacity = '1';
              this.brandText = 'scroll-text';
              this.dropDownClass = "dropdown-link-scroll"
          }else{
            let scrolled = window.pageYOffset || document.documentElement.scrollTop;
            this.navbarClass = scrolled !== 0 ? "navbar-light white" : "transparent-navbar";
            this.brandText = scrolled !== 0 ? 'scroll-text' : 'custom-text-home';
            this.dropDownClass = scrolled !== 0 ? "dropdown-link-scroll" : "dropdown-link"
            this.mainLogoUrl = scrolled !== 0 ?  require("../assets/icons/main-icon-primary-color.png")
              : require("../assets/icons/main-icon-white.png")
          }
        },
        changeUserRegion(value){
          this.$store.commit('changeUserRegion',value)
        }
      },
      created () {
        window.addEventListener('scroll', this.handleScroll);
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
      },
      mounted(){
        this.$store.commit('changeUserRegion', ymaps.geolocation.region);
      },
      computed:{
        logoUrl(){
          this.mainLogoUrl = this.nameComponent === "Home" ? require("../assets/icons/main-icon-white.png")
            : require("../assets/icons/main-icon-primary-color.png")
        },
        currentClass(){
          // По идее я неправильно использую computed, но пока пусть так
          this.navbarClass = this.nameComponent === "Home" ? "transparent-navbar" : "navbar-light white";
          this.brandText = this.nameComponent === "Home" ? "custom-text-home" : "custom-text";
          this.dropDownClass = this.nameComponent === "Home" ? "dropdown-link" : "dropdown-link-scroll";
        },
        userRegion(){
          return this.$store.state.userRegion;
        }
      }
  };
</script>

<style lang = "scss" scoped>
  @import "../css/main";

    .navbar {

      position: fixed;
      z-index: 30;
      max-height: 50px;
      transition: 1s;

      .brand-wrapper {
        display: flex;
        @include align-items(center);
        @include justify-content(center);
      }

        .navbar-nav {
          width: 700px;
          @include align-items(center);
          @include justify-content(flex-end);
          text-transform: uppercase;
        }
        .right-header-block {
          display: flex;
          @include justify-content(flex-end);
          @include align-items(center);
          height: 43px;
          width: 300px;
          padding-left: 1rem;

          .region-dropdown {
            padding-left: 1rem;
            position: relative;
            display: inline-block;
            .dropdown-link {
              border-bottom: 1px solid $primary-color-text;
              color: $primary-color-text;
              font-weight: bold;
              font-size: large;
            }
            .dropdown-link-scroll {
              border-bottom: 1px solid $primary-color;
              color: $primary-color;
            }
            .dropdown-content {
              display: none;
              position: absolute;
              background-color: #fff;
              min-width: 200px;
              max-height: 300px;
              box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
              z-index: 30;
              transition: 1s;
              overflow-y: auto;
              @include border-radius(0,0,3px,3px);

              ul {
                list-style-type:none;
                line-height: 1.5;
                padding-left: 0;

                li {
                  display:flex;
                  @include align-items(center);
                  @include justify-content(flex-start);

                  a {
                    color:#512DA8;
                    padding-left: 3px;
                    padding-right:3px;
                  }
                }
                li:hover a {color: #fff}
                a:hover {background-color: transparent;}
                li:hover { background-color: $primary-color;}
              }


            }

          }

          .dropdown-content a:hover {background-color: $primary-color-text;}
          /* Show the dropdown menu on hover */
          .region-dropdown:hover .dropdown-content {display: block;}

        }

        .scroll-text{
          color: $primary-color !important;
        }
    }


    .custom-text-home {
        color: $primary-color-text;
        font-weight: bold;
        font-size: large;
    }

    .custom-text {
      color: $primary-color !important;
    }


    strong {
      font-size: medium;
    }

    .transparent-navbar{
      background-color: transparent;
      border: none;
      color: white;
      transition: background-color 1s ease 0s;
      box-shadow: none;
    }




</style>
