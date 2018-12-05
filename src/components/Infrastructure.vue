<template>
    <div class="container">
        <google-map :name="name"></google-map>
        <button class="btn btn-orange" @click="greet">Click</button>
    </div>
</template>

<script>
    import GoogleMap from '../components/GoogleMap.vue'

    export default {
        data: function () {
            return {
                name: 'map'
            }
        },
        mounted: function () {
        },
        methods: {
            greet: function() {
                alert("mdakaneshna");
            }
        },
        components: {
            GoogleMap
        }
    };
</script>

<style>
    button {
        width: 200px;
        height: 70px;
    }
</style>