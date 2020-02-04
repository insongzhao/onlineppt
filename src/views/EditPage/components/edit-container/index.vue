<!--编辑页面 ppt 内容页 -->
<template>
  <div class="edit-container">
    <div class="action-bar">
      <div class="action-bar-tools">
        <div
          class="icon noselect"
          v-for="(item, index) in iconList"
          :key="index"
          :title="item.title"
          @click.stop="showDetails(index)"
        >
          <img :src="item.iconUrl" />
        </div>
        <div class="action-theme icon set-btn" title="主题" @click="showDetails(8)">主题</div>
        <div class="action-fade icon set-btn" title="过渡效果" @click="showDetails(9)">过渡效果</div>
      </div>
    </div>

    <!-- 形状 -->
    <transition name="zoom">
      <shape v-show="isShowShape"></shape>
    </transition>

    <!-- 文本 -->
    <transition name="zoom">
      <edit-text v-show="isShowText"></edit-text>
    </transition>

    <!-- canvas 编辑模块 -->
    <edit-canvas></edit-canvas>
  </div>
</template>

<script>
import Shape from "./components/shape";
import EditText from "./components/edit-text";
import EditCanvas from "./components/edit-canvas";
export default {
  name: "edit-container",
  components: {
    Shape,
    EditCanvas,
    EditText
  },
  data() {
    return {
      isShowShape: false,
      isShowText: false,
      iconList: [
        {
          title: "文本",
          iconUrl: require("@/assets/editPage/text.png")
        },
        {
          title: "形状",
          iconUrl: require("@/assets/editPage/shape.png")
        },
        {
          title: "对齐",
          iconUrl: require("@/assets/editPage/align.png")
        },
        {
          title: "文字",
          iconUrl: require("@/assets/editPage/write.png")
        },
        {
          title: "填充",
          iconUrl: require("@/assets/editPage/fill.png")
        },
        {
          title: "描边",
          iconUrl: require("@/assets/editPage/stroke.png")
        },
        {
          title: "旋转",
          iconUrl: require("@/assets/editPage/rotate.png")
        }
      ]
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    /**点击其他区域收起下拉框 */
    initPage() {
      let _this = this;
      document.addEventListener("click", () => {
        _this.initPara();
      });
    },
    initPara() {
      this.isShowShape = false;
      this.isShowText = false;
    },
    showDetails(id) {
      switch (id) {
        case 0:
          this.isShowText = !this.isShowText;
          break;
        case 1:
          this.isShowShape = !this.isShowShape;
          break;
      }
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
