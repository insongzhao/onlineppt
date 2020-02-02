<!--canvas 编辑页面 -->
<template>
  <div class="edit-box">
    <div class="edit-box-content">
      <!-- <canvas id="edit-canvas" style="width:100%; height:100%"></canvas> -->
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
export default {
  name: "edit-canvas",
  data() {
    return {
      canvasWidth: 1515,
      canvasHeight: 766,
      doDrawing: false, // 绘制状态
      drawingObject: "", // 当前绘制对象
      // 鼠标按下的起点
      mouseFrom: {
        x: 0,
        y: 0
      },
      mouseTo: {
        x: 0,
        y: 0
      },
      drawType: "", // 选中的要绘制的图形
      color: "#000000",
      drawWidth: 2, // 笔触宽度
      canvasObject: "",
      moveCount: 0 // 绘制移动计数器
    };
  },
  mounted() {
    this.initCanvas();

    this.$Bus.$on("type", e => {
      this.drawType = e;
    });
  },
  methods: {
    resetObj() {
      this.canvasObj.isDrawingMode = false;
      this.canvasObj.selectable = false;
      this.canvasObj.selection = false;
      this.canvasObj.skipTargetFind = true;
    },

    // 初始化
    initCanvas() {
      let _this = this;
      this.canvasObj = new fabric.Canvas("canvas", {
        isDrawingMode: false, //设置是否可以绘制
        selectable: false, //设置控件是否可以选中拖动
        selection: false, //整个画板是否被选中
        skipTargetFind: true //整个画板元素不能被选中
      });
      this.canvasObj.setWidth(this.canvasWidth); //设置画布的宽度
      this.canvasObj.setHeight(this.canvasHeight); //设置画布的高度

      this.canvasObj.freeDrawingBrush.color = this.color; //设置自由绘颜色
      this.canvasObj.freeDrawingBrush.width = this.drawWidth;

      this.canvasObj.on({
        "mouse:down": o => {
          console.log("mousedown");
          //鼠标在画布上按下事件(起点)
          this.mouseFrom.x = o.pointer.x; //鼠标按下的X的起点
          this.mouseFrom.y = o.pointer.y; //鼠标按下的y的起点
          this.doDrawing = true; //绘制设为true
        },
        "mouse:up": o => {
          //鼠标抬起的事件(终点)
          this.mouseTo.x = o.pointer.x;
          this.mouseTo.y = o.pointer.y;
          this.drawingObject = null;
          this.moveCount++;
          console.log("次数", this.moveCount);

          this.doDrawing = false; //停止绘制
        },
        "mouse:move": o => {
          //鼠标在移动中的事件
          this.offsetX = o.pointer.x.toFixed(0);
          this.offsetY = o.pointer.y.toFixed(0);
          if (!_this.doDrawing) {
            return;
          }
          this.mouseTo.x = o.pointer.x;
          this.mouseTo.y = o.pointer.y;
          this.drawing(this.drawType);
        },
        "object:move": e => {
          e.target.opacity = 0.5; //你绘画在画布上对象，移动它们的时候，让它们的透明度变成0.5
        }
        // "object:added": e => {
        //   if (!this.controlFlag) {
        //     this.redo = []; //撤回用的
        //   }
        //   this.controlFlag = false;
        // },
        // "object:modified": e => {
        //   e.target.opacity = 1;
        // }
      });
    },

    drawing(type) {
      switch (type) {
        case "line": {
          this.resetObj();
          this.canvasObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y
            ],
            {
              stroke: this.color,
              strokeWidth: this.drawWidth
            }
          );
          break;
        }
        case "dotted": {
          this.resetObj();
          this.canvasObject = new fabric.Line(
            [
              this.mouseFrom.x,
              this.mouseFrom.y,
              this.mouseTo.x,
              this.mouseTo.y
            ],
            {
              strokeDashArray: [3, 3],
              stroke: this.color,
              strokeWidth: this.drawWidth
            }
          );
          break;
        }
      }
      if (this.canvasObject) {
        // canvasObject.index = getCanvasObjectIndex();
        this.canvasObj.add(this.canvasObject); //.setActiveObject(canvasObject)
        this.drawingObject = this.canvasObject;
      }
    }
  }
};
</script>
<style lang="scss" scope>
#canvas {
  background-color: #ffffff;
}
.edit-box {
  width: 100%;
  height: calc(100% - 40px);
  padding: 25px 50px;
  border: 1px solid green;
}
.edit-box-content {
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
</style>
