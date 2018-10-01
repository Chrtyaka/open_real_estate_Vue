<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="layout"
        label="Планировка"
        color = "deep-purple"
        v-model = "value.layout"
      ></v-select>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Offices",
    props : ['value'],
    data() {
      return {
        layout : ['Открытая','Кабинетная']
      }
    }
  }
</script>

