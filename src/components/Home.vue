<template>
 <div>
   <app-header :name-component="name"/>
   <main style="background-color: #f5f6f7;">

     <section class="container-fluid preview-wrapper">
        <div class="container preview-text">
          <div class="row">
            <h1 class="preview-title">ОТКРЫТАЯ НЕДВИЖИМОСТЬ</h1>
          </div>
          <div class="row">
            <p class="preview-subtitle">Свободный доступ к объявлениям о продаже и аренде объектов недвижимости<br/> по всей стране -
             информация в контексте вашего региона</p>
          </div>
        </div>
        <div class="category-links-wrapper">
            <div class="row link-list">
              <router-link to="/objects"><span class="link-list-item text-center">Квартиры</span></router-link>
              <div v-for="item in nameTabs">
                <router-link :to ="{name : 'objects', params : {tabname : item}}"><span class="link-list-item text-center">{{item}}</span></router-link>
              </div>
           </div>
        </div>
     </section>

     <section class="container-fluid card-categories-wrapper mt-4">
        <div class="row mt-4" data-aos = "fade-in">
         <h1>Любая недвижимость на ваш вкус!</h1>
       </div>
        <div v-for = "row in categoryCards">
          <row-card :rowCards = "row"/>
        </div>
     </section>

     <section class="container-fluid main-links-wrapper mt-5">
        <div class="row pt-5" data-aos="fade-in"
                              data-aos-delay = "100">
          <h1>Дополнительные возможности для вас</h1>
        </div>
        <div class="main-links">
          <div class="row">
            <div class="col-lg-3 col-md-3" v-for = "item in mainLinksData">
              <div class="row icon-ability" data-aos = "zoom-in"
                                            data-aos-duration = "1000"
                                            data-aous-delay = "100">
                <img :src="require('../assets/icons/' + item.iconName + '.png')">
              </div>
              <div class="row title-ability" data-aos="fade-right"
                                             data-aos-easing="linear"
                                             data-aos-duration = "500"
                                             data-aos-delay = "200">
                <a class="pt-4">{{item.title}}</a>
              </div>
              <div class="row body-ability"   data-aos="fade-up"
                                              data-aos-easing="linear"
                                              data-aos-duration = "500"
                                              data-aos-delay = "200">
                <p class="pt-2">
                   {{item.body}}
                </p>
                </div>
             </div>
           </div>
         </div>
     </section>

     <section class="container-fluid main-map-wrapper">
        <div class="row title-map" data-aos="fade-in"
                                   data-aos-easing="linear"
                                   data-aos-duration = "1000"
                                   data-aos-delay = "200">
          <h1>Карта недвижимости - теперь все объекты как на ладони</h1>
        </div>
        <div class="row map-container" data-aos="fade-in"
                                       data-aos-easing="linear"
                                       data-aos-duration = "1000"
                                       data-aos-delay = "200">
          <l-map ref="map" style="height:inherit; width: inherit; position: absolute; z-index: 0;" :zoom="zoom" :center="center" :options = "mapOptions">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          </l-map>
          <div class="btn-container">
            <span>перейти на карту</span>
          </div>
        </div>
    </section>

     <section class="container-fluid news-wrapper">
       <div class="row title-info" data-aos="fade-in"
                                   data-aos-easing="linear"
                                   data-aos-duration = "200"
                                   data-aos-delay = "200">
         <h1>Полезная информация</h1>
       </div>
       <div class="row">
           <div class="col-lg-4 col-md-4" v-for = "column in infoItems"
                data-aos="fade-in"
                data-aos-easing="linear"
                data-aos-duration = "1000"
                data-aos-delay = "200">
             <div class="row news-category-title">
               <img :src="require('../assets/icons/' + column.iconName + '.png')">
               <h4 style="color:#212121;">{{column.title}}</h4>
             </div>
             <div class="news-block" v-bind:style="column.columnStyle">
               <div v-for="item in column.items">
                 <div class="row news-item">
                   <div class="col-12">
                     <div>
                       <a href="" class="item-title text-truncate">{{item.title}}</a>
                       <p class="text-article">{{item.body}}</p>
                     </div>
                   </div>
                 </div>
                 <hr size="2" class="pb-1">
               </div>
               <div class="row">
                <a class="more-info" href="">{{column.moreInfoText}}</a>
               </div>
             </div>
           </div>
       </div>
     </section>

     <section class="container-fluid about-wrapper">
       <div class="container about-text">
         <div class="row pt-3">
           <h2 style="margin-left: auto; margin-right: auto; color:#fff; font-weight: bold;">Открытая недвижимость - это:</h2>
         </div>
         <div class="row" style="display: flex;align-items: center; justify-content: center;"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration = "500">
           <ul>
             <li>Возможность найти выгодное предложение не выходя из дома и абсолютно бесплатно</li>
             <li>Широкий диапазон предлагаемых сделок по сбыту недвижимости</li>
             <li>Удобный поиск объектов по адресу или на карте</li>
             <li>Множество актуальных объявлений о продаже и аренде объектов недвижимости по всей стране</li>
             <li>Регулярно обновляемая база данных</li>
             <li>Портал, созданный с целью помочь пользователю найти лучшее предложение</li>
             <li>Постоянно развивающаяся организация</li>
           </ul>
         </div>
         <div class="row">
           <h5 style="margin-left: auto; margin-right: auto; color:#fafafa; font-weight: bold;">
             Открытая недвижимость поможет сделать правильный выбор!(если заработает)</h5>
         </div>
         <hr color="white" size="2">
         <div class="row" style="display: flex; -ms-align-items: center;align-items: center; justify-content: center;">
            <h5 style="color:white;" class="pr-3 pt-1" >Мобильное приложение</h5>
            <img src="../assets/icons/google.png" alt="">
         </div>
       </div>
     </section>

   </main>
   <appFooter></appFooter>
 </div>

</template>

<script>
  import clamp from "clamp-js/clamp"
  import AOS from 'aos'
  import { LMap, LTileLayer, LCircle, LMarker} from 'vue2-leaflet';
  import Footer from "../components/Footer"
  import RowCard from "./Home/RowCards"
  import Header from "../components/Header"
  export default {
    components : {
        LMap,
        LTileLayer,
        LMarker,
        LCircle,
        appFooter: Footer,
        rowCard : RowCard,
      appHeader: Header
      },
    data: function () {
      return {
          name : 'Home',
          nameTabs : ['Комнаты','Дома','Участки','Гаражи','Офисы','Торговля','Склады','Здания','Помещения'],
          bgCardStyle:{
            '-webkit-background-size': 'cover',
            'background-size': 'cover'
          },
          userRegion: 'Волгоградская область',
          region : true,
          linkListClass:'col-md-8 pr-0',
          zoom:11,
          mapOptions: { zoomControl: true},
          center: L.latLng(55.7820534, 37.5680638),
          url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          infoItems:[
            {
              moreInfoText: "Еще о регионах...",
              title:"В регионах",
              columnStyle:{},
              iconName : 'earth',
              items:[
                {
                  title : 'Шикарная новость',
                  body: 'С 1 августа в Волгограде коммерческие перевозчики собираются поднять цены на проезд из-за подорожавшего топлива.'
                },
                {
                  title : 'Восхитительная новость',
                  body : 'Туристы ЧМ оставили в кафе и ресторанах Волгограда 200 миллионов.'
                },
                {
                  title : 'Галочка, ты щас умрешь:D',
                  body: 'Волгоградская область выиграла грант в 11 млн рублей на помощь детям-сиротам.\n' +
                  'Волгоградская область выиграла грант Фонда поддержки детей, находящихся в трудной жизненной ситуации.'
                }
              ]
            },
            {
              moreInfoText: "Больше советов...",
              title: "Советы специалистов",
              columnStyle:{},
              iconName : 'edit',
              items:[
                {
                  title : 'Шикарная новость',
                  body: 'С 1 августа в Волгограде коммерческие перевозчики собираются поднять цены на проезд из-за подорожавшего топлива.'
                },
                {
                  title : 'Восхитительная новость',
                  body : 'Туристы ЧМ оставили в кафе и ресторанах Волгограда 200 миллионов.'
                },
                {
                  title : 'Галочка, ты щас умрешь:D',
                  body: 'Волгоградская область выиграла грант в 11 млн рублей на помощь детям-сиротам.\n' +
                  'Волгоградская область выиграла грант Фонда поддержки детей, находящихся в трудной жизненной ситуации.'
                }
              ]
            },
            {
              moreInfoText: "Другие инструкции...",
              title: "Инструкции по применению",
              columnStyle:{
                "padding-right": "15px"
              },
              iconName : 'instruction',
              items:[
                {
                  title : 'Шикарная новость',
                  body: 'С 1 августа в Волгограде коммерческие перевозчики собираются поднять цены на проезд из-за подорожавшего топлива.'
                },
                {
                  title : 'Восхитительная новость',
                  body : 'Туристы ЧМ оставили в кафе и ресторанах Волгограда 200 миллионов.'
                },
                {
                  title : 'Галочка, ты щас умрешь:D',
                  body: 'Волгоградская область выиграла грант в 11 млн рублей на помощь детям-сиротам.\n' +
                  'Волгоградская область выиграла грант Фонда поддержки детей, находящихся в трудной жизненной ситуации.'
                }
              ]
            },
          ],
          mainLinksData : [
            {
              iconName : 'round-add-button',
              title : 'Подать объявление',
              body: 'Разместите информацию о продаже или аренде объектов недвижимости на нашем сайте'
            },
            {
              iconName: 'text-document',
              title: 'Документы',
              body: 'Получите бланки необходимых документов для сделок с недвижимостью в любое удобное для вас время и абсолютно бесплатно'
            },
            {
              iconName: 'database',
              title: 'База данных и API',
              body: 'Воспользуйтесь данными базы объектов недвижимости по своему усмотрению – скачивайте файлом в удобном формате или настройте доступ с помощью нашего API'
            },
            {
              iconName: 'calculator',
              title: 'Калькуляторы',
              body: 'Оцените стоимость недвижимости с учётом всех особенностей вашего объекта'
            }
          ]
        }
      },
      methods:{
        changeRegion(){
          this.region = !this.region;
          this.linkListClass = 'col-md-12'
        },
      },
      mounted(){
        AOS.init();
        setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
        this.$refs.map.mapObject.scrollWheelZoom.disable();
        $(".text-article").each(function () {
          clamp(this, {clamp : 3})
        })
      },
    computed : {
      categoryCards() {
        return this.$store.getters.homeCategoryCards
      }
    }
    };
</script>



<style lang = "scss" scoped>

  @import "../css/main";

  /*ОБЩИЕ СТИЛИ*/
  .row{
    margin: 0;
  }
    /*Секция со стилями для preview и списка категорий*/

    .preview-wrapper {
      width: 100%;
      height: 100vh;
      padding: 0;
      display: flex;
      @include align-items(center);
      flex-direction: column;
      background: url(../assets/background-preview.jpg) no-repeat center fixed;
      -webkit-background-size: cover;
      background-size: cover;

    .preview-text{

      display: flex;
      flex-direction: column;
      @include align-items(center);
      @include justify-content(center);
      position: relative;
      z-index:1;
      height:inherit;

      .preview-title  {
        color: $primary-color-text;
        font-weight: bold;
        font-size: 40pt;
      }

      .preview-subtitle {
        color: $primary-color-text;
        font-weight: bold;
        font-size: 20pt;
        text-transform: uppercase;
        text-align: center;
      }
    }

    .category-links-wrapper{
      position: absolute;
      z-index: 1;
      width: 800px;
      height: 8vh;
      background-color: $primary-color-text;
      bottom:0;
      display: flex;
      flex-direction: row;
      @include align-items(center);
      box-shadow: 0 1px 5px 2px rgba(0, 0, 0, .11);

      .link-list{
        width: inherit;
        display: flex;
        flex-direction: row;
        @include align-items(center);
        @include justify-content(space-around);

        .link-list-item{
          color: $primary-color-dark;
          position: relative;
        }
        .link-list-item::before{
          content: '';
          bottom: 0;
          left: 0;
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: $primary-color-dark;
          transition: 0.2s;
          transform: scaleX(0);
        }
        .link-list-item:hover:before{transform: scaleX(1);}
      }
    }

  }

  .preview-wrapper::after{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    opacity: .72;
    z-index: 0;
    background-color: #512DA8;
  }

  /******************************/


  /*Стили для плиток с категориями*/

  .card-categories-wrapper {
    width: 97%;
    height: calc(624px + .5rem);
    padding: 0;

    h1 {
      text-transform: uppercase;
      color: $primary-color-dark;
      margin-left: auto;
      margin-right: auto;
    }

  }


  /*Стили для ссылок на главные разделы сайта*/

  .main-links-wrapper {
    width: 97%;
    height: 550px;
    padding: 0;
    border-radius: 3px;

    h1{
      color: $primary-color-dark;
      text-transform: uppercase;
      margin-left: auto;
      margin-right: auto;
    }

    .main-links {
      width: 100%;
      height: 450px;
      display: flex;
      @include align-items(center);

      .icon-ability{
        display: flex;
        @include justify-content(center);

        img { cursor: pointer;}
      }
      .title-ability {

        @include justify-content(center);

        a {
          color: $primary-color-dark;
          font-size: 20pt;
          text-transform: uppercase;
        }:hover{ color: $primary-color-light;}
      }

      .body-ability {

        @include justify-content(center);

        p {
          text-align: center;
          font-size: medium;
          color: $secondary-text-color;
        }
      }
    }
  }

  /*Стили для блока с картой*/
  .main-map-wrapper {
      height: 598px;
      padding-left: 0;
      padding-right: 0;

      .title-map {

        h1 {
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 0;
          text-transform: uppercase;
          color: $primary-color-dark
        }
      }
      .map-container{
        position: relative;
        height: 500px;
        width: 100%;
        margin-top: 50px;

        .btn-container{
          position: absolute;
          width: 200px;
          height: 50px;
          display:flex;
          @include align-items(center);
          @include justify-content(center);
          z-index: 1;
          background-color: $primary-color-dark;
          bottom:0;
          left: calc(50% - 100px);
          margin-bottom: 50px;
          cursor: pointer;
          box-shadow: 0 1px 5px 2px rgba(0, 0, 0, .11);
          span {
            color: $primary-color-text;
            text-transform: uppercase;
          }
        }:hover {background-color: $primary-color;}

      }

    }

    /*Стили для секции с новостями и советами*/
     .news-wrapper {
      width: 100%;
      height: 600px;
      background-color: $primary-color-text;
      border-radius: 3px;
      padding: 0;

      .title-info {
        padding-top: 3rem;

        h1 {
          color: $primary-color-dark;
          text-transform: uppercase;
          margin-left: auto;
          margin-right: auto;
        }
      }

      .news-category-title {
        display: flex;
        @include align-items(center);
        @include justify-content(center);
        margin-top: 1.5rem;

        h4 {
          margin-bottom: 0;
          padding-left: 1rem;
          color: $primary-color !important;
        }
      }

      .news-block {
        padding-left: 15px;
        padding-top: 1rem;

        .news-item {
          height: 110px;
          text-align: left;
        }

        .col-12 {
          display: flex;
          @include align-items(center);
          @include justify-content(center);
          padding-left: 10px;

          .text-article {
            color: $secondary-text-color;
            text-align: justify;
            margin-bottom: 0;
            line-height: 1;
            overflow: hidden;
            text-overflow: ellipsis
          }

          .item-title {
            font-weight: bold;
            color: $primary-color;
          }
          .item-title:hover{ color: $primary-color-light;}
        }

        hr {
          margin-top: 0;
          margin-bottom: 0;
          color: #311b92 ;
        }

        .more-info {
          margin-left: auto;
          margin-right: auto;
          font-weight: normal;
          color: $secondary-text-color;
          position: relative;
        }
        .more-info::before{
          content: '';
          position: absolute;
          left: 0;
          bottom:0;
          width: 100%;
          height: 2px;
          background-color: $primary-color-dark;
          transition: .2s;
          transform: scaleX(0);
        }
        .more-info:hover:before{transform: scaleX(1)}
        .more-info:hover{
          color:$primary-color;
          font-size: large;
          font-weight: bold;
        }
    }
  }
  /*Стили для секции about*/

  .about-wrapper {
    width: 100%;
    height: 600px;
    padding: 0;
    display: flex;
    @include align-items(center);
    @include justify-content(center);
    background: url(../assets/about-home-bg.jpg) center no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    border-radius: 3px;
    position: relative;
    z-index:0;

    .about-text{
      position: relative;
      z-index:2;
    }
    ul {
      list-style-image: url(../assets/icons/checked.png);
      list-style-position: outside;
      line-height: 2;

      li {
        color: $primary-color-text;
        font-weight: bold;
        font-size: 15pt;
      }
    }



  }
  .about-wrapper::after{
    content: '';
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    opacity: .72;
    z-index: 1;
    background-color: #512DA8;
  }


</style>
