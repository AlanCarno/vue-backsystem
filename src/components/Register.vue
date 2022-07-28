<template>
  <div class="login">
    <div class="login-page">
      <h2 class="login-title">用户注册信息</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="this.$store.state.regisCode == 1? false:true">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'Register',
  data() {
    var checkName = (rule, value, callback) => {
      let wholeThis = this;
      if (!value) {
        return callback(new Error('姓名不能为空'));
      }
      setTimeout(async function () {
          let resul = await wholeThis.$store.dispatch('searchresgistermsgrequest', { username: wholeThis.ruleForm.name });
          if (!(resul instanceof Object)) {
            wholeThis.$message.error('注册失败，请检验网络是否有故障！');
          } else {
            if (resul.regisCode == 0) callback(new Error(resul.msg));
          }
        callback();
      }, 500);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('sendresgistermsg',{username:this.ruleForm.name,userpwd:this.ruleForm.pass,usertime:Moment().format('YYYY-MM-DD HH:mm:ss')});
          this.$message({
            message: '注册成功，3s后即将返回登录页面',
            type: 'success'
          });
          setTimeout(()=>{
            this.$router.replace({path:'login'})
          },3000)
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  // mounted() {
  //   console.log(Moment().format('YYYY-MM-DD HH:mm:ss'))
  // }
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
