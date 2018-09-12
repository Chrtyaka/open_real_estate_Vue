<template>
  <app-header></app-header>
</template>

<script>
import Header from './components/Header'
export default {
  components : {
    appHeader : Header
  }
};
</script>

<style lang = "scss">
  body{
    font-family: 'Fira Sans Extra Condensed', sans-serif;
    overflow-x: hidden;
  }
</style>
