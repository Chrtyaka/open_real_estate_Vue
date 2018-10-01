<template>
    <div>
      <v-layout row>
        <v-select
          :items="cities"
          label="Город"
          color = "deep-purple"
          v-model = "value.city"
        ></v-select>
      </v-layout>

      <v-layout row>
        <v-select
          :items="dateSubmit"
          label="Дата подачи объявления"
          color = "deep-purple"
          v-model = "value.dateSubmit"
        ></v-select>
      </v-layout>

      <v-layout row>
        <v-select
          :items="typeProperty"
          label="Категория"
          color = "deep-purple"
          v-model = "value.status"
        ></v-select>
      </v-layout>

      <v-layout row justify-space-between wrap>
        <v-flex lg5>
          <v-text-field
            label="Цена от"
            type = "number"
            min = "0"
            step = "100000"
            color = "deep-purple"
            :max = "value.price.max"
            v-model = "value.price.min"
          ></v-text-field>
        </v-flex>
        <v-flex lg5>
          <v-text-field
            label="Цена до"
            type = "number"
            min = "0"
            step = "100000"
            color = "deep-purple"
            v-model = "value.price.max"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row justify-space-between wrap>
        <v-flex lg5>
          <v-text-field
            label="Цена за м.кв от"
            type = "number"
            min = "0"
            step = "10000"
            color = "deep-purple"
            :max = "value.pricePm.max"
            v-model = "value.pricePm.min"
          ></v-text-field>
        </v-flex>
        <v-flex lg5>
          <v-text-field
            label="Цена за м.кв до"
            type = "number"
            min = "0"
            step = "10000"
            color = "deep-purple"
            v-model = "value.pricePm.max"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <div v-show="typeObject !== 'Дома' && typeObject !=='Участки'&& typeObject !== 'Здания'">
        <v-layout row justify-space-between wrap>
          <v-flex lg5>
            <v-text-field
              label="Этаж от"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              :max = "value.floor.max"
              v-model = "value.floor.min"
            ></v-text-field>
          </v-flex>
          <v-flex lg5>
            <v-text-field
              label="Этаж до"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              v-model = "value.floor.max"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>

      <div v-show="typeObject !=='Участки'">
        <v-layout row justify-space-between wrap>
          <v-flex lg5>
            <v-text-field
              label="Этажность от"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              :max = "value.countFloors.max"
              v-model = "value.countFloors.min"
            ></v-text-field>
          </v-flex>
          <v-flex lg5>
            <v-text-field
              label="Этаж до"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              v-model = "value.countFloors.max"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-space-between wrap>
          <v-flex lg5>
            <v-text-field
              label="Общая площадь от"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              :max = "value.totalArea.max"
              v-model = "value.totalArea.min"
            ></v-text-field>
          </v-flex>
          <v-flex lg5>
            <v-text-field
              label="Общая площадь до"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              v-model = "value.totalArea.max"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-space-between wrap>
          <v-flex lg5>
            <v-text-field
              label="Высота потолков от"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              :max = "value.ceilingHeight.max"
              v-model = "value.ceilingHeight.min"
            ></v-text-field>
          </v-flex>
          <v-flex lg5>
            <v-text-field
              label="Высота потолков до"
              type = "number"
              min = "1"
              step = "1"
              color = "deep-purple"
              v-model = "value.ceilingHeight.max"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Common",
      props : ['value', 'typeObject'],
      data(){
          return {
            cities : ['Москва', 'Волгоград', 'Пенза'],
            typeProperty : ['Новостройка','Строящиеся','Вторичка'],
            dateSubmit : ['За любую дату', 'За час','За сутки', 'За 10 дней', 'За месяц'],
          }
      }
    }
</script>

