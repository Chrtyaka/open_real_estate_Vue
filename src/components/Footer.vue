<template>
    <div>
      <footer v-bind:style="footerStyle">
        <div class="container-fluid footer-links-wrapper">
          <div class="row">
            <div class="col-md-8 copyright-links">
              <span>&#169; Открытая недвижимость, 2018</span>
            </div>
            <div class="col-md-4 contacts">
              <a href="">Контакты</a>
              <a href="http://urbanbasis.com/feedback">Оставить отзыв</a>
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
        }
      },
    };
</script>

<style lang = "scss" scoped>

@import "../css/main";

footer {
  width: 100%;
  height: 50px;
  background-color: $primary-color-text;


  .footer-links-wrapper{
    width: 100%;
    padding-left: 50px;
    height: inherit;
    background-color: $primary-color;
    .row {
      height: inherit;

      .copyright-links {
       height: inherit;
       display: flex;
       @include align-items(center);
       @include justify-content(flex-start);

       span {
         text-transform: uppercase;
         letter-spacing: .1rem;
         color: $primary-color-text;
       }
      }
      .contacts {
        height: inherit;
        display: flex;
        @include align-items(center);
        @include justify-content(space-around);

        a { color: $primary-color-text}
      }
    }
  }
}
</style>
