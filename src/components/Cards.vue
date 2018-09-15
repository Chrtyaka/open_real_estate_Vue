<template>
    <div>
      <div class="card z-depth-0">
        <div class="row">
          <div class="col-md-4">
            <img :src="object.urlThumbImage"
                 onerror="this.src='https://placeholdit.imgix.net/~text?txtsize=38&txt=400%C3%97400&w=400&h=400'"  style="height: 200px; width: 250px;">
          </div>
          <div class="col-md-8 px-3">
            <div class="card-block px-3">
              <h5 class="card-title text-truncate font-weight-bold mt-1" >{{object.header}}</h5>
              <p class="card-text">Цена за м<sup>2</sup>: {{object.pricePm}} руб.</p>
              <p class="card-text"></p>
            </div>
          </div>
        </div>
      </div>
      <hr>
    </div>
</template>

<script>
    export default {
      props : ['object'],
        name: "Cards",
      data(){
        return{
        }
      },
    };
</script>

<style scoped>
.card{
  background-color: #fff;
}
</style>
