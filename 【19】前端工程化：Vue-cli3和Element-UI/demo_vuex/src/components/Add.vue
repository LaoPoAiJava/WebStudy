<template>
  <div>
    <!--
      访问vuex全局共享数据的第一种方式: this.$store.state.count
      在template中this可以省略
    -->
    <h3>当前的count值为：{{$store.state.count}}</h3>
    <!-- 调用getters的第一种方式 -->
    <h3>{{$store.getters.show}}</h3>
    <button @click="handleAdd">+1</button>
    <button @click="handleAddN">+N</button>
    <button @click="handleAddAsync">+1 async</button>
    <button @click="handleAddNAsync">+N async</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleAdd: function () {
      // 通过 Mutation 变更 Store 中的数据。
      // commit 的作用，就是调用某个 mutation 函数
      this.$store.commit('add')
    },
    handleAddN: function () {
      this.$store.commit('addN', 3)
    },
    handleAddAsync: function () {
      // 通过 this.$store.dispatch 调用vuex中的actions
      this.$store.dispatch('addAsyncAction')
    },
    handleAddNAsync: function () {
      this.$store.dispatch('addNAsyncAction', 5)
    }
  }
}
</script>

<style scoped>
</style>
