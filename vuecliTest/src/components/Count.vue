<template>
  <div>
    <h2>{{ msg }}</h2>
    <h3>{{ $store.state.count }}-{{ count }}</h3>
    <p>
      <button @click="add(10)">+</button>
      <button @click="addAction()">++</button>
      <button @click="sub()">-</button>
      <button @click="subAction()">--</button>
    </p>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      msg: 'Vuex'
    }
  },
  computed: {
    ...mapState(['count'])
    // count () {
    //   return this.$store.getters.count
    // }
    // ...mapGetters(['count'])
  },
  methods: {
    ...mapMutations(['add', 'sub']),
    ...mapActions(['addAction', 'subAction'])
  },
  store
}
</script>
