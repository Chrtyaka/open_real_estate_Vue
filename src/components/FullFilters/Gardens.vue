<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="typeArea"
        label="Тип участка"
        color = "deep-purple"
        v-model = "value.typeGarden"
      ></v-select>
      <v-combobox
        v-model="value.otherParameters"
        :items="parameters"
        label="Дополнительные параметры"
        color = "deep-purple"
        multiple
      ></v-combobox>
    </v-layout>
  </div>
</template>

<script>
    export default {
        name: "Gardens",
      props : ['value'],
      data(){
          return {
            typeArea : ['Фермерское хозяйство','Садоводство','Застройка'],
            parameters : ['Электричество','Газ','Канализация','Водоснабжение','Телефон']
          }
      }
    }
</script>

<style scoped>

</style>
