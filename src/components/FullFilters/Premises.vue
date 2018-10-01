<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="typePremises"
        label="Тип помещения"
        color = "deep-purple"
        v-model = "value.typePremises"
      ></v-select>
    </v-layout>

    <v-layout row wrap>
      <v-select
        :items="specialization"
        label="Специализация"
        color = "deep-purple"
        v-model = "value.specialization"
      ></v-select>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Premises",
    props : ['value'],
    data() {
      return {
        typePremises : ['Торговая площадь','Производство','Свободное назначение'],
        specialization : ['Кафе','Офис продаж','Минимаркет']
      }
    }
  }
</script>

