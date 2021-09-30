<template>
  <div id="app">
    <l-add></l-add>
    <p>--------------------------</p>
    <l-sub></l-sub>
  </div>
</template>

<script>
import Add from './components/Add.vue'
import Sub from './components/Sub.vue'

export default {
  name: 'App',
  components: {
    'l-add': Add,
    'l-sub': Sub
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
