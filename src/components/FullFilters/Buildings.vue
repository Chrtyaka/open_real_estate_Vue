<template>
  <div>
    <v-layout row wrap>
      <v-flex lg12>
        <v-select
          :items="classBuild"
          label="Класс здания"
          color = "deep-purple"
          v-model = "value.classBuild"
        ></v-select>
      </v-flex>

      <v-flex lg 5>
        <v-select
          :items="lineBuild"
          label="Линия домов"
          color = "deep-purple"
          v-model = "value.lineBuild"
        ></v-select>
      </v-flex>

      <v-flex lg12>
        <v-text-field
          label="Год постройки"
          type = "number"
          min = "1950"
          step = "1"
          color = "deep-purple"
          max = "2018"
          v-model = "value.yearConstruction"
        ></v-text-field>
      </v-flex>

      <v-flex lg12>
        <v-combobox
          v-model="value.otherParameters"
          :items="parameters"
          label="Параметры"
          color = "deep-purple"
          multiple
        ></v-combobox>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    export default {
        name: "Buildings",
      props : ['value'],
      data(){
          return {
            classBuild : ['A','A+','B','B+','C+','D'],
            lineBuild : ['Первая','Вторая'],
            parameters : ['Мебель','Парковка']
          }
      }
    }
</script>

