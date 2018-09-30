<template>
    <div>
      <v-layout row wrap>
        <v-select
          :items="repairs"
          label="Ремонт"
          color = "deep-purple"
          v-model = "value.repairs"
        ></v-select>
        <v-select
          :items="seller"
          label="Продавец"
          color = "deep-purple"
          v-model = "value.seller"
        ></v-select>

        <v-select
          :items="windowView"
          label="Вид из окна"
          color = "deep-purple"
          v-model = "value.windowView"
        ></v-select>

        <v-select
          :items="heatingSystem"
          label="Отопление"
          color = "deep-purple"
          v-model = "value.heating"
        ></v-select>

        <v-combobox
          v-model="value.otherParameters"
          :items="apartmentsOtherParams"
          label="Дополнительные параметры"
          color = "deep-purple"
          multiple
        ></v-combobox>
      </v-layout>
    </div>
</template>

<script>
    export default {
        name: "ApartmentsSecond",
      props: ['value', 'typeObject'],
      data() {
        return {
          repairs : ['Евроремонт','Косметический', 'Дизайнерский', 'Без ремонта'],
          seller : ['Агенство','Собственник'],
          windowView : ['Во двор','На улицу'],
        }
      },
      computed : {
          heatingSystem(){
            return this.typeObject !== 'Дома' ? ['Централизованное','Автономное'] : ['Газ','Уголь','Электричество']
          },
        apartmentsOtherParams(){
            return this.typeObject !== 'Дома' ?
              ['Охрана','Консьерж','Мебель','Кухонный гарнитур','Интернет','Телефон','Кабельное',
                'Кондиционер','Бытовая техника'] :
              ['Охрана','Мебель','Кухонный гарнитур','Интернет','Телефон','Кабельное',
                'Кондиционер','Бытовая техника','Электричество','Газ','Водоснабжение','Баня','Гараж','Бассейн']

        }
      }
    }
</script>

<style scoped>

</style>
