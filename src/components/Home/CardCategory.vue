<template>
  <div class="bg-card"
       v-bind:style="{background : 'url(' + require('../../assets/overlays/' + cardData.thumbnailLink) + ') center no-repeat', backgroundSize: 'cover'}">
    <div class="info-card" @mouseover = "linksCard = true" @mouseleave="linksCard = false">
      <div class="dark-bg-card" v-show="linksCard"></div>
      <div style="position: absolute; z-index: 1">
        <h1 v-show="linksCard === false">{{cardData.title}}</h1>
        <div class="links-card" style="line-height: 1.4" v-show="linksCard === true">
          <ul>
            <li v-for="item in cardData.links">
              <a href="">{{item}}</a><br>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props : {
        cardData : Object
      },
      name: "CardCategory",
      data() {
          return {
            linksCard: false,
          }
      },
      // methods: {
      //   getUrlImg(name){
      //     let images = require.context('../../assets/', false, /\.jpg$/);
      //     return images('./overlays/' + name + '.jpg')
      //   }
      // }
    }
</script>

<style lang="scss" scoped>
  @import "../../css/main";

    .bg-card {
      width: 100%;
      height: inherit;

      h1 {
        color: $primary-color-text;
        font-weight: bold;
        font-size: 40pt;
        cursor: pointer;
      }
    }
    .dark-bg-card {
      width:100%;
      height:inherit;
      background: $primary-color;
      opacity: .72;
      position: absolute;
      z-index: 1;
    }
    .info-card {
      width: calc(100% - .5rem);
      height: 100%;
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        color: white;
        font-weight: bold;
        font-size: x-large;
        position: relative;
      }
      a::before{
        content: '';
        bottom: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: $primary-color-text;
        transition: 0.2s;
        transform: scaleX(0);
      }
      a:hover:before {transform: scaleX(1)}

      ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
    }
</style>
