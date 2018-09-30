<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="typeHouseArr"
        label="Тип дома"
        color = "deep-purple"
        v-model = "value.typeHouse"
      ></v-select>
    </v-layout>

    <v-layout row wrap>
      <v-combobox
        v-model="value.countRooms"
        :items="countRoomsArr"
        label="Количество комнат"
        color = "deep-purple"
        multiple
      ></v-combobox>
    </v-layout>


    <v-layout row justify-space-between wrap>
      <v-flex lg5>
        <v-text-field
          label="Площадь комнат от"
          type = "number"
          min = "1"
          step = "3"
          color = "deep-purple"
          :max = "value.roomsArea.max"
          v-model = "value.roomsArea.min"
        ></v-text-field>
      </v-flex>
      <v-flex lg5>
        <v-text-field
          label="Площадь комнат до"
          type = "number"
          min = "1"
          step = "3"
          color = "deep-purple"
          v-model = "value.roomsArea.max"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row justify-space-between wrap>
      <v-flex lg5>
        <v-text-field
          label="Площадь кухни от"
          type = "number"
          min = "1"
          step = "3"
          color = "deep-purple"
          :max = "value.kitchenArea.max"
          v-model = "value.kitchenArea.min"
        ></v-text-field>
      </v-flex>
      <v-flex lg5>
        <v-text-field
          label="Площадь кухни до"
          type = "number"
          min = "1"
          step = "3"
          color = "deep-purple"
          v-model = "value.kitchenArea.max"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-select
        :items="bathroomArr"
        label="Санузел"
        color = "deep-purple"
        v-model = "value.bathroom"
      ></v-select>
    </v-layout>

    <v-layout row wrap>
      <v-combobox
        v-model="value.balcony"
        :items="balcony"
        label="Балкон"
        color = "deep-purple"
        multiple
      ></v-combobox>
    </v-layout>

    <div v-show="typeObject !== 'Дома'">
      <v-layout row justify-space-between align-center >
        <v-flex lg6>
          <v-select
            :items="lift"
            label="Количество лифтов"
            color = "deep-purple"
            v-model = "value.lift"
          ></v-select>
        </v-flex>
        <v-flex lg5>
          <v-checkbox
            label="Грузовой лифт"
            v-model="value.serviceLift"
            color = "deep-purple"
          ></v-checkbox>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-select
          :items="parking"
          label="Парковка"
          color = "deep-purple"
          v-model = "value.parking"
        ></v-select>
      </v-layout>
    </div>

  </div>
</template>

<script>
    export default {
        name: "ApartmentsFirst",
      props : ['value', 'typeObject'],
      data(){
          return {
            balcony : ['Балкон','Лоджия'],
            lift : ['Не важно',1,2,3,4],
            parking : ['Наземная','Подземная','Многоуровневая','На крыше'],
          }
      },
      computed : {
          typeHouseArr(){
            return this.typeObject !== 'Дома' ?
              ['Кирпичный','Деревянный', 'Монолитный', 'Панельный','Блочный','Кирпично-молонитный','Сталинка','Хрущевка']
              : ['Кирпичный','Деревянный', 'Монолитный', 'Панельный','Блочный']
          },
        bathroomArr(){
            return this.typeObject !== 'Дома' ?  ['Вместе', 'Раздельный'] : ['В доме', 'На улице']
        },
        countRoomsArr() {
            return this.typeObject !== 'Квартиры' ? [1,2,3,4, '5+'] : ['Cтудия',1,2,3,4, '5+']
        }
      }
    }
</script>

<style scoped>

</style>
