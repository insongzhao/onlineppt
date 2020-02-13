<!-- 编辑页面侧边栏-->
<template>
  <div class="sidebar-page">
    <div class="create-btn noselect" @click="addCanvas()">新建幻灯片</div>
    <div class="side-body">
      <div class="side-content">
        <div class="side-ppt-list scroll">
          <!-- 每张ppt缩略图 -->
          <div
            class="side-ppt-item"
            @click="renderCanvas(index)"
            v-for="(item, index) in countList"
            :key="index"
            :class="{ select: selcetIndex == index }"
          >
            <div class="item-btns">
              <div class="item-delete" @click.stop="delCanvas(index)"></div>
              <div class="item-create"></div>
            </div>
            <canvas id="side-canvas"></canvas>
          </div>
        </div>
        <div class="side-footer">
          <div class="page_size">3/3</div>
          <div class="change_show_type">
            <div class="show_list" title="列表排列"></div>
            <div class="show_repeat" title="平铺排列"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  data() {
    return {
      countList: [{}],
      canvasWidth: 250,
      canvasHeight: 150,
      currentState: "", // 画布状态
      canvasImg: "",
      clearMode: false, // 是否清空画布
      selectedMode: false, // 侧边栏选中状态
      selcetIndex:0
    };
  },
  mounted() {
    this.initCanvas();

    this.$Bus.$on("currentState", e => {
      this.currentState = e;
      console.log("current", this.currentState);
    });
    this.$Bus.$on("canvasImg", e => {
      this.canvasImg = e;
      console.log("canvasImg", this.canvasImg);
    });
  },
  watch: {
    // currentState: {
    //   deep: true,
    //   handler: function() {
    //     this.loadCanvasForm(this.currentState);
    //   }
    // },
    canvasImg: {
      deep: true,
      handler: function() {
        this.loadCanvasThumb(this.canvasImg);
      }
    }
  },
  methods: {
    /**初始化 canvas */
    initCanvas() {
      this.sideCanvasObj = new fabric.Canvas("side-canvas", {
        isDrawingMode: false, //设置是否可以绘制
        selectable: false, //设置控件是否可以选中拖动
        selection: false, //整个画板是否被选中
        skipTargetFind: true, //整个画板元素不能被选中
        backgroundColor: "#ffffff",
        defaultCursor: "pointer"
      });
      this.sideCanvasObj.setWidth(this.canvasWidth); //设置画布的宽度
      this.sideCanvasObj.setHeight(this.canvasHeight); //设置画布的高度
    },

    /**添加空白幻灯片 */
    addCanvas() {
      this.countList.push({});
      this.initCanvas();
    },

    /**加载画布信息 */
    // loadCanvasForm(lastState) {
    //   console.log("侧边栏");

    //   this.sideCanvasObj.loadFromJSON(lastState, () => {
    //     this.sideCanvasObj.renderAll();
    //     console.log(this.sideCanvasObj.toJSON());
    //   });
    // },

    /**画布缩略图 */
    loadCanvasThumb(imgUrl) {
      this.clearMode = false;
      this.$Bus.$emit("clearMode", this.clearMode);
      fabric.Image.fromURL(imgUrl, img => {
        img.set({
          // 通过scale来设置图片大小，这里设置和画布一样大
          scaleX: this.canvasWidth / img.width,
          scaleY: this.canvasHeight / img.height
        });
        // 设置背景
        this.sideCanvasObj.setBackgroundImage(
          img,
          this.sideCanvasObj.renderAll.bind(this.sideCanvasObj)
        );
        this.sideCanvasObj.renderAll();
      });
    },

    /**重绘编辑页的 canvas 画布 */
    renderCanvas(index) {
      this.selcetIndex = index;
      this.clearMode = true; // 清空画布
      this.$Bus.$emit("clearMode", this.clearMode);
      console.log("重绘");
    },

    /**删除幻灯片 */
    delCanvas(index) {
      this.countList.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>

