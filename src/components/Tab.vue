<template>
    <div>
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div v-if="showSmile" class="smile">
                <h5 class="font-weight-bold">Извините, но данных по данному типу недвижимости пока <br>нет:(</h5>
              </div>
              <div v-for="item in objects" v-if="!showSmile">
                <appCard :object = "item"></appCard>
              </div>
            </div>
            <div class="col-md-4">
              <appFilters :type = "name" :component = 'component'></appFilters>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  import Cards from "../components/Cards"
  import Filters from "../components/Filters"
    export default {
    components : {
      appCard : Cards,
      appFilters : Filters
    },
      props :  ['name','component'],
      data : function () {
        return {
          nameTabs : ['Квартиры','Комнаты','Дома','Участки','Офисы','Торговля','Склады','Гаражи','Здания','Помещения'],
          smile : false,
          type : {
            name : ''
          },
        }
      },
      computed:{
        objects(){
          return this.$store.state.listObjects
        },
        showSmile(){
          return this.$store.state.smile
        }
      },
    }
</script>

<style scoped>
  .smile{
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
