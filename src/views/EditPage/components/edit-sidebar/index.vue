<!-- 编辑页面侧边栏-->
<template>
  <div class="sidebar-page">
    <div class="create-btn" @click="addCanvas()">新建幻灯片</div>
    <div class="side-body">
      <div class="side-content">
        <div class="side-ppt-list">
          <!-- 每张ppt缩略图 -->
          <div class="side-ppt-item">
            <div class="item-btns">
              <div class="item-delete"></div>
              <div class="item-create"></div>
            </div>
            <canvas id="side-canvas" style="background-color:#ffffff"></canvas>
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
      countList: [],
      canvasWidth: 250,
      canvasHeight: 150
    };
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    /**初始化 canvas */
    initCanvas() {
      this.canvasObj = new fabric.Canvas("side-canvas", {
        isDrawingMode: false, //设置是否可以绘制
        selectable: false, //设置控件是否可以选中拖动
        selection: false, //整个画板是否被选中
        skipTargetFind: true //整个画板元素不能被选中
      });
      this.canvasObj.setWidth(this.canvasWidth); //设置画布的宽度
      this.canvasObj.setHeight(this.canvasHeight); //设置画布的高度
    },
    /**添加空白幻灯片 */
    addCanvas() {
      this.countList.push({});
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
