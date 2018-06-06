<template>
  <div id="app">
    <ui-nav></ui-nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Nav from '@/components/common/leftNav'
export default {
  name: 'App',
  components: {
    'ui-nav': Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
main {
  margin-left: 60px;
  height: 100%;
  overflow: hidden;
}
</style>
