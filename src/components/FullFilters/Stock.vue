<template>
  <div>
    <v-layout row wrap>
      <v-select
        :items="craneType"
        label="Кран"
        color="deep-purple"
        v-model="value.crane"
      ></v-select>
    </v-layout>

    <v-layout row wrap>
      <v-select
        :items="gateType"
        label="Ворота"
        color="deep-purple"
        v-model="value.gate"
      ></v-select>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Stock",
    props : ['value'],
    data() {
      return {
        craneType: ['Мостовой кран', 'Кран-балка', 'ЖД-кран', 'Козловой кран'],
        gateType: ['На пандусе', 'Докового типа', 'На нулевой отметке']
      }
    }
  }
</script>

