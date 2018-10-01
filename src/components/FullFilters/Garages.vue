<template>
    <div>
      <v-layout row wrap>
        <v-select
          :items="typeGarage"
          label="Тип гаража"
          color = "deep-purple"
          v-model = "value.typeGarage"
        ></v-select>
      </v-layout>

      <v-layout row justify-space-between wrap>
        <v-flex lg5>
          <v-text-field
            label="Длина"
            type = "number"
            min = "1"
            step = "1"
            color = "deep-purple"
            v-model = "value.length"
          ></v-text-field>
        </v-flex>
        <v-flex lg5>
          <v-text-field
            label="Ширина"
            type = "number"
            min = "1"
            step = "1"
            color = "deep-purple"
            v-model = "value.width"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-select
          :items="typeConstruction"
          label="Тип конструкции"
          color = "deep-purple"
          v-model = "value.typeConstruction"
        ></v-select>
      </v-layout>

      <v-layout row wrap>
        <v-select
          :items="status"
          label="Статус"
          color = "deep-purple"
          v-model = "value.status"
        ></v-select>
      </v-layout>

      <v-layout row wrap>
        <v-select
          :items="heating"
          label="Отопление"
          color = "deep-purple"
          v-model = "value.heating"
        ></v-select>
      </v-layout>
    </div>
</template>

<script>
    export default {
        name: "Garages",
      props: ['value'],
      data(){
          return {
            typeGarage : ['Гараж','Машиноместо','Бокс'],
            typeConstruction : ['Встроенный','Капитальный'],
            status: ['Собственность','Кооператив','По доверенности'],
            heating : ['Газовое','Угольное','Электричество'],
            length : '',
            width : '',
            parameters : ['Электричество','Газ','Охрана','Подвал','Погреб']
          }
      }
    }
</script>

