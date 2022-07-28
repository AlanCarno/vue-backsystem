<template>
  <div>
    <el-alert title="您已登录了" type="success" center show-icon v-show="this.$store.state.canRelogin">
    </el-alert>
    <el-container style="height:1904px;">
      <el-aside width="300px" style="background-color:#545c64">
        <el-menu background-color="#545c64" text-color="#ffffff" style="width:100%" router
          :default-active="defaultActive" @open="handleOpen" @close="handleClose">
          <el-menu-item index="home">
            <template slot="title"><i class="el-icon-message"></i>首页</template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>数据管理</template>
            <el-menu-item-group>
              <el-menu-item index="userlist">用户列表</el-menu-item>
              <el-menu-item index="shoplist">商家列表</el-menu-item>
              <el-menu-item index="foodlist">食品列表</el-menu-item>
              <el-menu-item index="orderlist">订单列表</el-menu-item>
              <el-menu-item index="managelist">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>添加数据</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">添加商铺</el-menu-item>
              <el-menu-item index="3-2">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>图表</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">用户分布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>编辑</template>
            <el-menu-item-group>
              <el-menu-item index="5-1">文本编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
            <el-menu-item-group>
              <el-menu-item index="6-1">管理员设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>说明</template>
            <el-menu-item-group>
              <el-menu-item index="7-1">说明</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container style="height:100%;flex-wrap: wrap;">
        <el-breadcrumb separator="/"
          style="height:60px;width: 100%;line-height: 60px;padding-left: 20px;background-color: aliceblue;">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in this.$route.meta" :key="item">{{ item }}</el-breadcrumb-item>
          <el-breadcrumb-item>
            <el-dropdown style="position:absolute;right:2%" @command="handleCommand" trigger="click" ref="sasa">
              <div class="block" style="display:flex;align-items: center;margin-top: 4px;">
                <!-- 用户名字从本地存储获取 -->
                <el-avatar :size="50" style="font-size:10px">{{ username }}</el-avatar>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">首页</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-container style="height: 1844px;width: 100%;">
          <router-view></router-view>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    defaultActive() {
      return this.$route.path.replace('/', '');
    }
  },
  data() {
    return {
      nowIndex: -1,
      nowItemName: "",
      username: '',
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.nowIndex = key - 1;
    },
    handleClose(key, keyPath) {
      this.nowIndex = key - 1;
    },
    handleCommand(command) {
      switch (command) {
        case 'a': this.$router.push({ path: 'home' }); break;
        case 'b': {
          this.$router.replace({ path: 'login' });
          // 本地logincode设置0(没有刷新页面，更新不及时)
          // this.$store.state.loginCode =0;
          this.$store.dispatch('sendclearmsgrequest');
          break;
        };
        default: break;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('isloginrequest');
    if (this.$store.state.loginCode == 2) this.$router.replace({ path: 'login' });
    this.username = sessionStorage.getItem('userName');
  },
  // 组件守卫：token有效期提示已经登陆
  beforeRouteEnter(to, from, next) {
    if (from.path == "/login") {
      next(vm => {
        if(vm.$store.state.loginCode == 1) vm.$store.state.canRelogin=true;
      });
    } else next();
  }
}
</script>

<style scoped>

</style>
