<template>
    <div>
      <footer v-bind:style="footerStyle">
        <div class="container-fluid footer-links-wrapper" v-bind:style="linksWrapperStyle" v-model = "footerSize">
          <div class="row">
            <div class="col-md-8 copyright-links">
              <span>&#169; Открытая недвижимость, 2018</span>
            </div>
            <div class="col-md-4 contacts">
              <a href="">Контакты</a>
              <a href="">Оставить отзыв</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
</template>

<script>
    export default {
      props: ['nameComponent'],
      name: "Footer",
      data(){
        return{
          footerStyle:{
            height: "calc(50px + .5rem)"
          },
          linksWrapperStyle:{
            width: "97%",
            "background-color": "white"
          }
        }
      },
      computed:{
        footerSize(){
          if (this.nameComponent === "Объекты" || this.nameComponent === "Цена"){
            this.linksWrapperStyle.width = "100%";
            this.footerStyle.height = "50px"
          }
        }
      }
    };
</script>

<style lang = "scss" scoped>

$primary-color-dark:   #512DA8;
$primary-color:        #673AB7;
$primary-color-light:  #D1C4E9;
$primary-color-text:   #FFFFFF;
$accent-color:         #9E9E9E;
$primary-text-color:   #212121;
$secondary-text-color: #757575;
$divider-color:        #BDBDBD;

@mixin align-items($align){
    -webkit-align-items: $align;
            align-items: $align;
        
}
@mixin justify-content($justify){
    -webkit-justify-content: $justify;
            justify-content: $justify;
}
  
footer {
  width: 100%;
  height: 50px;
  background-color: $primary-color-text;
  
  .footer-links-wrapper{
    width: 100%;
    height: inherit;
    background-color: $primary-color-text;
    
    .row { 
      height: inherit;
      
      .copyright-links {
       height: inherit;
       display: flex; 
       @include align-items(center);
       @include justify-content(flex-start)
       
       span {
         text-transform: uppercase;
         letter-spacing: .1rem;
         color: $primary-color-dark;
       }
      }
      .contacts {
        height: inherit;
        display: flex;
        @include align-items(center);
        @include justify-content(space-around);
        
        a { color: $primary-color-dark}
        a:hover { color: $primary-color-light}
      }
    }
  }
}
</style>
