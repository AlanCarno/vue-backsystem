<template>
  <div class="login">
    <el-alert title="验证过期，请重新登录" type="error" center show-icon v-show="this.$store.state.loginCode == 2 ? true : false">
    </el-alert>
    <transition name="el-fade-in-linear">
      <div class="login-page">
        <h2 class="login-title">后台登录系统</h2>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button type="primary" @click="toRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        pass: '',
      }
    }
  },
  methods: {
    // 登录验证用户和密码（还未实现未注册用户提交显示注册成功功能）
    async onSubmit() {
      let res = await this.$store.dispatch('loginrequest', { username: this.form.name, userpwd: this.form.pass });
      sessionStorage.setItem('userName',res.username);
      if (!(res instanceof Object)) {
        this.$message.error('登录失败，请检验网络是否有故障！');
      } else {
        if (this.$store.state.loginCode) {
          this.$router.replace({ path: 'home' });
          this.$message({
            message: '登录成功！',
            type: 'success'
          });
        } else {
          this.$message.error('登录失败，请输入正确的用户名和密码');
        }
      }
    },
    toRegister() {
      return this.$router.push({ path: '/register' });
    },
  },
  async mounted() {
   let res=await this.$store.dispatch('isloginrequest');
   if(res.loginCode == 1) this.$router.replace({path:'home'});
  },
}
</script>

<style scoped>
.login-title {
  font-size: 40px;
  text-align: center;
  margin-top: 200px;
}

.el-form {
  margin-top: 40px;
}

.login-page {
  height: 400px;
  width: 400px;
  margin: 0 auto;
}
</style>
