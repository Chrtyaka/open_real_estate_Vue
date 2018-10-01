<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="ventilationType"
        label="Вентиляция"
        color = "deep-purple"
        v-model = "value.ventilation"
      ></v-select>
    </v-layout>
    <v-layout row wrap>
      <v-select
        :items="conditioningSystem"
        label="Кондиционирование"
        color = "deep-purple"
        v-model = "value.conditioning"
      ></v-select>
    </v-layout>
    <v-layout row wrap>
      <v-select
        :items="heatingSystem"
        label="Отопление"
        color = "deep-purple"
        v-model = "value.heating"
      ></v-select>
    </v-layout>
    <v-layout row wrap>
      <v-select
        :items="firefightingSystem"
        label="Система пожаротушения"
        color = "deep-purple"
        v-model = "value.firefighting"
      ></v-select>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "BuildingsSecond",
    props : ['value'],
    data() {
      return {
        ventilationType : ['Приточная','Естественная'],
        conditioningSystem : ['Центральное','Местное'],
        heatingSystem : ['Центральное','Автономное'],
        firefightingSystem : ['Водяная','Пенная','Газовая','Порошковая']
      }
    }
  }
</script>
