import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义全局共享数据
    count: 0
  },
  mutations: {
    // 定义一个函数，专门用于操作state中的值
    add: function (state) {
      state.count++
    },
    addN: function (state, step) {
      state.count += step
    },
    sub: function (state) {
      state.count--
    },
    subN: function (state, step) {
      state.count -= step
    }
  },
  // mutation不能执行异步操作，如果要执行异步操作必须借助Action对象
  actions: {
    addAsyncAction: function (context) {
      // 在action中，不能直接修改state中的值
      // 必须通过context.commit触发某个mutation才行
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addNAsyncAction: function (context, step) {
      // 在action中，不能直接修改state中的值
      // 必须通过context.commit触发某个mutation才行
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsyncAction: function (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsyncAction: function (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  modules: {
  },
  // getters只对state中的数据起到包装的作用，并不改变数据的值
  getters: {
    show: function (state) {
      return '这是用getters包装后的值：' + state.count
    }
  }
})
