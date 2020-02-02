<!--编辑页面 ppt 内容页 -->
<template>
  <div class="edit-container">
    <div class="action-bar">
      <div class="action-bar-tools">
        <div
          class="icon"
          v-for="(item, index) in iconList"
          :key="index"
          :title="item.title"
          @click="showDetails(index)"
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
      </div>
    </div>

    <!-- 形状 -->
    <shape v-show="isShowShape"></shape>

    <!-- canvas 编辑模块 -->
    <edit-canvas></edit-canvas>
  </div>
</template>

<script>
import Shape from "./components/shape";
import EditCanvas from "./components/edit-canvas";
export default {
  name: "edit-container",
  components: {
    Shape,
    EditCanvas
  },
  data() {
    return {
      isShowShape: false,
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
    // this.initPage();
  },
  methods: {
    // initPage() {
    //   // 点击其他不在的区域触发事件
    //   document.body.addEventListener(
    //     "click",
    //     function() {
    //       this.outside = true;
    //     },
    //     true
    //   );
    //   document.body.addEventListener("click", function() {
    //     console.log("outside", this.outside);
    //     if (this.outside) {
    //       console.log("close");
    //       this.isShowShape = false;
    //     }
    //   });
    // },
    showDetails(id) {
      console.log("del", this.outside);
      switch (id) {
        case 1:
          this.isShowShape = true;
          break;
      }
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
