<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/hi">HI</router-link>|
      <router-link :to="{name: 'hi1', params:{username:'HI/hi1'}}">HI1</router-link>|
      <router-link :to="{name: 'hi2', params:{username:'HI/hi2'}}">HI2</router-link>|
      <router-link to="/params">Params</router-link>
    </div>
    <!-- <p>{{ $route.name }}</p> -->
    <router-view/>
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
</style>
