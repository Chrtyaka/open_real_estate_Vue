<template>
    <div>
      <app-header :name-component="name"/>
      <appFooter nameComponent = "Объекты"></appFooter>
    </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Header from "../components/Header"
    export default {
    components : {
      appFooter : Footer,
      appHeader : Header
    },
      data(){
        return {
          name : 'Objects'
        }
      }
    };
</script>

<style scoped>

</style>
