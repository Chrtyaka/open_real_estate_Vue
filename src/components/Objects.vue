<template>
    <div>
      <div class="container-fluid tab-wrapper">
        <div class="container-fluid pt-3 pl-0 pr-0">
          <vue-tabs active-text-color="white" activeTabColor = "#651fff"
            textPosition = "center"
            v-model="tabName" v-on="getDataCards(tabName)">
              <v-tab v-for="item in nameTabs" :title="item" :key="item">
                <appTab :name="item" :component = "name"></appTab>
              </v-tab>
          </vue-tabs>
        </div>
      </div>
      <appFooter nameComponent = "Объекты"></appFooter>
    </div>
</template>

<script>
  import Footer from "../components/Footer"
  import Tab  from "../components/Tab"
    export default {
    components : {
      appFooter : Footer,
      appTab : Tab
    },
      props : ["tabname"],
      data : function () {
        return {
          name : 'Objects',
          tabName : '',
          list : [],
          nameTabs : ['Квартиры','Комнаты','Дома','Участки','Гаражи','Офисы','Торговля','Склады','Здания','Помещения']
        }
      },
      methods : {
        getDataCards(name){
          let tmp = {
            name : name
          };
          this.$http.post('init_cards', tmp).then(response =>{
            if (response.body.length == 0){
              this.$store.commit('showSmile', true);
              this.$store.commit('toCard', this.list)
            }else{
              this.$store.commit('showSmile', false);
              this.$store.commit('toCard', response.body)
            }
          })
        }
      },
      created(){
        this.tabName = this.$route.params.tabname
      },
      mounted(){
        this.$store.commit('changeComponent', 'Objects');

      },
    };
</script>

<style scoped>
.tab-wrapper{
  background-color: #ecf0f1;
  margin-top: 50px;
  padding-left: 0;
  padding-right: 0;
}

</style>
