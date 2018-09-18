<template>
    <div>
      <div class="row pl-2 pt-2">
        <div class="col-lg-4 col-md-4 card-categories pl-0"
             v-for="item in rowCards"
             data-aos="flip-left"
             data-aos-duration = "1000">
          <app-card :cardData = "item"/>
        </div>
      </div>
    </div>
</template>

<script>
  import Card from "../Home/CardCategory"
    export default {
    props: {
      rowCards : Array
    },
    components:{
      appCard : Card
    },
        name: "RowCards"
    }
</script>

<style lang="scss">
  .card-categories {
    height: 200px;
    padding-left: 0;
    padding-right: .5rem;
    text-align: center;
  }
</style>
