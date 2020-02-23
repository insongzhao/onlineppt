import { fabric } from "fabric";

const switchCanvas = function(index, canvasWidth, canvasHeight) {
  var canvasId = "c" + index;
  // var _this = this;
  this.canvasObj = new fabric.Canvas(canvasId, {
    isDrawingMode: false, //设置是否可以绘制
    selectable: true, //设置控件是否可以选中拖动
    selection: true, //整个画板是否被选中
    skipTargetFind: false, //整个画板元素不能被选中
    backgroundColor: "#ffffff"
  });
  this.canvasObj.setWidth(canvasWidth); //设置画布的宽度
  this.canvasObj.setHeight(canvasHeight); //设置画布的高度

  // this.canvasObj.freeDrawingBrush.color = this.color; //设置自由绘颜色
  // this.canvasObj.freeDrawingBrush.width = this.drawWidth;

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
      this.moveCount = 1;
      console.log("次数", this.moveCount);

      this.drawType = "";
      this.canvasObj.selectable = true;
      this.canvasObj.selection = true;

      this.doDrawing = false; //停止绘制
      this.getCanvasState();
      this.canvastoImg();
    },
    "mouse:move": o => {
      //鼠标在移动中的事件
      this.offsetX = o.pointer.x.toFixed(0);
      this.offsetY = o.pointer.y.toFixed(0);
      if (this.moveCount % 2 && !this.doDrawing) {
        return;
      }
      this.moveCount++;
      this.mouseTo.x = o.pointer.x;
      this.mouseTo.y = o.pointer.y;
      // this.drawing(this.drawType);
      // this.drawTitle(this.titleType);
    },
    "object:move": e => {
      e.target.opacity = 0.5; //你绘画在画布上对象，移动它们的时候，让它们的透明度变成0.5
    },
    "selection:created": e => {
      console.log("select");
      this.selectedObj = e.target;
    },
    "object:added": e => {
      console.log("add", e);
    },
    "object:modified": e => {
      // e.target.opacity = 1;
      console.log("修改++++++++", e.target);
    }
  });
}

export default {
  switchCanvas
}