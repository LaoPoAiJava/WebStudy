<template>
  <div>
    <!--
      访问vuex全局共享数据的第二种方式:
    -->
    <h3>当前的count值为：{{count}}</h3>
    <h3>{{show}}</h3>
    <button @click="handleSub">-1</button>
    <button @click="handleSubN">-N</button>
    <!-- 因为vuex定义的函数为全局函数，所以可以将函数名直接写入事件中 -->
    <button @click="subAsyncAction">-1 Async</button>
    <button @click="subNAsyncAction(5)">-N Async</button>
  </div>
</template>

<script>
// 1. 导入vuex解构mapState
// 操作vuex全局共享数据的第二种方式，解构 mapMutations 函数
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    // 操作vuex全局共享数据的第二种方式
    ...mapMutations(['sub', 'subN']),
    // 调用actions的第二种方式
    ...mapActions(['subAsyncAction', 'subNAsyncAction']),
    handleSub: function () {
      this.sub()
    },
    handleSubN: function () {
      this.subN(3)
    }
  },
  computed: {
    // 2. 定义计算属性
    ...mapState(['count']),
    // 调用getters的第二种方式
    ...mapGetters(['show'])
  }
}
</script>

<style scoped>
</style>
