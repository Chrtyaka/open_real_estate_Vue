<template>
  <div class="info-object__content">
    <div class="row info-object__content__image">
      <img :src="infoData.imgUrl"
           onerror="this.src='https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400'"
           align="center">
    </div>
    <div class="row info-object__content__price">
      <h3>{{infoData.price}} &#8381</h3>
    </div>
    <div class="row info-object__content__address">
      <h4>{{infoData.address}}</h4>
    </div>
    <div class="row info-object__content__parameters">
      <p style="padding-left: 5%;">Комнат {{infoData.countRooms}}</p>
      <p>{{infoData.totalArea}} м <sup>2</sup></p>
      <p style="padding-right: 5%;">Этаж {{infoData.floor}}</p>
    </div>
    <div class="row info-object__content__links">
      <div class="col-8">
        <a href="" class="more-info">Подробнее</a>
      </div>
      <div class="col-4">
        <a href="" class="add-favorite" title="Добавить в избранное"><i class="fa fa-heart fa-2x"></i></a>
        <a href="" class="add-compare" title="Добавить к сравнению"><i class="fa fa-plus fa-2x"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ObjectInfo",
    props: ['infoData']
  }
</script>

<style lang="scss" scoped>
  @import "../../css/main";

  .info-object {
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
