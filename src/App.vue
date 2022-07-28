<template>
  <div id="app">
    <!-- <Home/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
