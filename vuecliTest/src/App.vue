<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/hi">HI</router-link>|
      <router-link :to="{name: 'hi1', params:{username:'HI/hi1'}}">HI1</router-link>|
      <router-link :to="{name: 'hi2', params:{username:'HI/hi2'}}">HI2</router-link>|
      <router-link to="/params">Params</router-link>|
      <router-link to="/params/llll/asdhakjsdhkjash">Paramsgo</router-link>|
      <router-link to="/gopage/22222/asdhakjsdhkjash">gopage</router-link>|
      <router-link to="/count">COUNT</router-link>|
    </div>
    <!-- <p>{{ $route.name }}</p> -->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active, .fade-leave-active{
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
