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
        <div
          class="action-theme icon set-btn"
          title="主题"
          @click="showDetails(8)"
        >
          主题
        </div>
        <div
          class="action-fade icon set-btn"
          title="过渡效果"
          @click="showDetails(9)"
        >
          过渡效果
        </div>
        <div
          class="action-clear icon set-btn"
          title="清空画布"
          @click="clearCanvas"
        >
          清空
        </div>
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

    <!-- 填充 -->
    <transition name="zoom">
      <fill v-show="isShowFill" ref="fillColor"></fill>
    </transition>

    <!-- 描边 -->
    <transition name="zoom">
      <stroke v-show="isShowStroke" ref=""></stroke>
    </transition>

    <!-- 旋转 -->
    <transition name="zoom">
      <rotate
        v-show="isShowRotate"
        ref="rotateCanvas"
        @clockwiseRotate="clockwiseRotate"
        @anticlockwiseRotate="anticlockwiseRotate"
        @rotateScaleX="rotateScaleX"
        @rotateScaleY="rotateScaleY"
        @customizeRotate="customizeRotate"
      ></rotate>
    </transition>

    <!-- 主题 -->
    <transition name="zoom">
      <theme v-show="isShowTheme" ref="fillColor"></theme>
    </transition>

    <!-- canvas 编辑模块 -->
    <edit-canvas ref="editCanvas" @currentState="getState"></edit-canvas>
  </div>
</template>

<script>
import Shape from "./shape";
import EditText from "./edit-text";
import EditCanvas from "./edit-canvas";
import Fill from "./fill";
import Theme from "./theme";
import Rotate from "./rotate";
import Stroke from "./stroke";
export default {
  name: "edit-container",
  components: {
    Shape,
    EditCanvas,
    EditText,
    Fill,
    Theme,
    Rotate,
    Stroke
  },
  data() {
    return {
      isShowShape: false,
      isShowText: false,
      isShowFill: false,
      isShowTheme: false,
      isShowRotate: false,
      isShowStroke: false,
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
      ],
      currentState: "" //当前画布状态
    };
  },
  mounted() {
    // this.initPage();
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
      this.isShowFill = false;
      this.isShowTheme = false;
      this.isShowRotate = false;
      this.isShowStroke = false;
    },
    /**下拉框显示 */
    showDetails(id) {
      switch (id) {
        case 0: // 文本
          this.isShowText = !this.isShowText;
          break;
        case 1: // 形状
          this.isShowShape = !this.isShowShape;
          break;
        case 4: // 填充
          this.isShowFill = !this.isShowFill;
          break;
        case 5: // 描边
          this.isShowStroke = !this.isShowStroke;
          break;
        case 6: //旋转
          this.isShowRotate = !this.isShowRotate;
          break;
        case 8: //主题
          this.isShowTheme = !this.isShowTheme;
          break;
      }
    },

    /**获取编辑状态 */
    getState(data) {
      this.currentState = data;
      this.$Bus.$emit("currentState", this.currentState);
    },

    /**清空画布 */
    clearCanvas() {
      this.$refs.editCanvas.clearCanvas();
    },

    /**顺时针旋转 */
    clockwiseRotate(clockwiseAngle) {
      console.log("clockwiseAngle", clockwiseAngle);
      this.$refs.editCanvas.rotateObj(clockwiseAngle);
    },

    /**逆时针旋转 */
    anticlockwiseRotate(anticlockwiseAngle) {
      console.log("anticlockwiseAngle", anticlockwiseAngle);
      this.$refs.editCanvas.rotateObj(anticlockwiseAngle);
    },

    rotateScaleX() {
      this.$refs.editCanvas.scaleXObj();
    },

    rotateScaleY() {
      this.$refs.editCanvas.scaleYObj();
    },

    customizeRotate(angelNum) {
      this.$refs.editCanvas.customizeRotate(angelNum);
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
