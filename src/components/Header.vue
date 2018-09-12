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
    <transition
      enter-active-class="animated slideInLeft">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Home from "../components/Home"
  import Objects from "../components/Objects"
  import Map from "../components/Map"
  import Price from  "../components/Price"
    export default {
    components : {
      appHome: Home,
      appObjects: Objects,
      appMap: Map,
      appPrice : Price
    },
      data(){
        return{
          sideBar : false,
          navbarClass: 'navbar-light white',
          navbarOpacity: '',
          brandText: 'custom-text',
          mainLogoUrl: "",
          regions:['Волгоградская область','Московская область', 'Алтайский край'],
          dropDownClass:''
        }
      },
      methods:{
        handleScroll(event){
          if(this.curComponent != 'Home'){
              // Если прокрутка есть, то делаем блок прозрачным
              this.mainLogoUrl = "http://127.0.0.1:5000/static/images/icons/main-icon-primary-color.png";
              this.navbarClass = "navbar-light white";
              this.navbarOpacity = '1';
              this.brandText = 'scroll-text';
              this.dropDownClass = "dropdown-link-scroll"
          }else{
            let scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
            if (scrolled !== 0){
              // Если прокрутка есть, то делаем блок видимым
              this.navbarClass = "navbar-light white";
              this.navbarOpacity = '1';
              this.brandText = 'scroll-text';
              this.dropDownClass = "dropdown-link-scroll" ;
              this.mainLogoUrl = "http://127.0.0.1:5000/static/images/icons/main-icon-primary-color.png";

            }else{
              // Если нет, то делаем его полностью прозрачным
              this.mainLogoUrl = "http://127.0.0.1:5000/static/images/icons/main-icon-white.png";
              this.brandText = 'custom-text-home';
              this.navbarClass = "transparent-navbar";
              this.dropDownClass = "dropdown-link"
            }
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
        this.$store.commit('changeUserRegion', ymaps.geolocation.region)
        if(this.$store.state.currentComponent === "Map"){
          this.dropDownClass = "dropdown-link-scroll"
        }
      },
      computed:{
        curComponent(){
          return this.$store.state.currentComponent
        },
        logoUrl(){
           if (this.$store.state.currentComponent === "Home"){
            this.mainLogoUrl = "http://127.0.0.1:5000/static/images/icons/main-icon-white.png";
          }else{
            this.mainLogoUrl = "http://127.0.0.1:5000/static/images/icons/main-icon-primary-color.png"
          }
        },
        currentClass(){
          if(this.$store.state.currentComponent === 'Home'){
             this.navbarClass = "transparent-navbar";
             this.brandText = "custom-text-home";
             this.dropDownClass = "dropdown-link";
          }else {
             this.navbarClass = "navbar-light white";
             this.brandText = "custom-text";
             this.dropDownClass = "dropdown-link-scroll";
          }
        },
        userRegion(){
          return this.$store.state.userRegion;
        }
      }
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

  $primary-color-dark:   #512DA8;
  $primary-color:        #673AB7;
  $primary-color-light:  #D1C4E9;
  $primary-color-text:   #FFFFFF;
  $accent-color:         #9E9E9E;
  $primary-text-color:   #212121;
  $secondary-text-color: #757575;
  $divider-color:        #BDBDBD;

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
