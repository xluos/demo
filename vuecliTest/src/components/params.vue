<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <p>NEWID:{{ $route.params.newid }}---{{ $route.params.newtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'HI',
  data () {
    return {
      msg: 'I am Params Page!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
