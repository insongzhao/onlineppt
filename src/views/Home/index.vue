<template>
  <el-container class="home-container scroll">
    <el-header>
      <div class="container-header" :class="{ start: isScroll }">
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
        <div class="panel-content">
          <div class="panel-intro">
            <span class="intro-text"
              >强大的在线制作幻灯片工具，轻松创造优秀作品</span
            >
            <span class="intro-tips noselect"
              >在线制作幻灯片，各种模板个性推荐，作品轻松搞定！</span
            >
            <div class="more-feature noselect">更多特色</div>
          </div>
          <div class="start-work">
            <div class="start-btn" @click="startNewWork">
              <span>立即开始</span>
              <i class="start-icon"></i>
            </div>
          </div>
          <div class="swiper-img">
            <div class="item">
              <img :src="dataList[currentIndex]">
            </div>
            <div class="page" v-if="this.dataList.length > 1">
              <ul class="noselect" @mouseenter="clearInv" @mouseleave="runInv">
                <li @click="gotoPage(prevIndex)">&lt;</li>
                <li
                  v-for="(item, index) in dataList"
                  :key="index"
                  @click="gotoPage(index)"
                  :class="{ current: currentIndex == index }"
                >
                  {{ index + 1 }}
                </li>
                <li @click="gotoPage(nextIndex)">&gt;</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="panel-img-right"></div>
      </div>
    </el-main>
    <el-footer>
      <div class="recommend-module">
        <div class="module-title">2020 最新幻灯片模板推荐</div>
      </div>
      <div class="container-footer"></div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      dataList: [
        "https://i1.mifile.cn/a4/xmad_15535933141925_ulkYv.jpg",
        "https://i1.mifile.cn/a4/xmad_15532384207972_iJXSx.jpg",
        "https://i1.mifile.cn/a4/xmad_15517939170939_oiXCK.jpg"
      ],
      currentIndex: 0, //默认显示图片
      timer: null, //定时器
      isScroll: false
    }
  },
  computed: {
  //上一张
    prevIndex() {
      if (this.currentIndex == 0) {
        return this.dataList.length - 1;
      } else {
        return this.currentIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if (this.currentIndex == this.dataList.length - 1) {
        return 0;
      } else {
        return this.currentIndex + 1;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.runInv();
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
    },
    /**跳转到新建幻灯片页面 */
    startNewWork() {
      this.$router.push({ name: "newWork" });
    },

    gotoPage(index) {
      this.currentIndex = index;
    },

    /**定时器*/
    runInv() {
      this.timer = setInterval(() => {
        this.gotoPage(this.nextIndex);
      }, 2000);
    },

    clearInv() {
      clearInterval(this.timer);
    },

    /**鼠标滚动 */
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log("Gundong" + scrollTop);
      if (scrollTop > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
