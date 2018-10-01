<template>
  <div>
    <v-layout row>
      <v-select
        :items="entrance"
        label="Вход"
        color = "deep-purple"
        v-model = "value.entrance"
      ></v-select>
    </v-layout>
    <v-layout row>
      <v-select
        :items="repairs"
        label="Ремонт"
        color = "deep-purple"
        v-model = "value.repairs"
      ></v-select>
    </v-layout>
    <v-layout row>
      <v-select
        :items="parking"
        label="Парковка"
        color = "deep-purple"
        v-model = "value.parking"
      ></v-select>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "CommercialFirst",
    props: ['value', 'typeObject'],
    data() {
      return {
        entrance: ['Свободный', 'По пропускам'],
        parameters: ['Мебель','Охрана','Кондиционер','Интернет','Телефон']

      }
    },
    computed: {
      repairs() {
        return this.typeObject !== 'Склады' ?
          ['Офисная отделка', 'Под чистовую', 'Требуется капитальный ремонт', 'Требуется косметический ремонт'] :
          this.typeObject === 'Помещения' ? ['Типовой', 'Дизайнерский', 'Под чистовую'] :
            ['Типовой ремонт', 'Требуется капитальный ремонт', 'Требуется косметический ремонт']
      },
      parking() {
        return this.typeObject !== 'Склады' ? ['Наземная','Многоуровневая'] : ['На терриротрии','Для грузового транспорта',
        'Для легковесного транспорта']
      }
    }
  }
</script>
