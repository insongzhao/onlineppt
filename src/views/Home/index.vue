<template>
  <el-container class="home-container">
    <el-header>
      <div class="container-header">
        <div class="logo-pic">logo</div>
        <div class="header-login" @click="loginWork">
          <span class="login-text">登录</span>
        </div>
        <div class="header-register" @click="registerWork">
          <span class="register-text">注册</span>
        </div>
        <div class="header-avator" @click="editWork">avator</div>
      </div>
    </el-header>
    <el-main>
      <div class="index-panel">
        <div class="panel-img-left"></div>
        <div class="panel-intro">
          <span class="intro-text"
            >强大的在线制作幻灯片工具，轻松创造优秀作品</span
          >
          <span class="intro-tips"
            >在线制作幻灯片，各种模板个性推荐，作品轻松搞定！</span
          >
          <div class="more-feature">更多特色</div>
        </div>
        <div class="panel-img-right"></div>
      </div>
    </el-main>
    <el-footer>
      <div class="container-footer"></div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    // 点击登录按钮，跳转到登录页面
    loginWork() {
      this.$router.push({ name: "login" });
    },
    registerWork() {
      this.$router.push({ name: "register" });
    },
    editWork() {
      this.$router.push({ name: "editPage" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
