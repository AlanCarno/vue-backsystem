<template>
  <div>
    <h1>这是测试专用</h1>
    <textarea ref="text" name="" id="" cols="30" rows="10"></textarea>
    <button @click="sendMsg">点击发送</button>
  </div>
</template>

<script>
import { testSend } from '../api/index';
export default {
  name: 'Test',
  methods: {
    async sendMsg() {
      let res = await testSend().then((res) => {
        let resul = res.data;
        return resul;
      }).catch(function (error) {
        console.log(typeof error.message)
        return error.message;
      });
      this.$refs.text.innerHTML = res;
    }
  }
}

</script>

<style scoped>
</style>
