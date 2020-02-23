<!-- 旋转-->
<template>
  <div class="rotate-canvas">
    <el-card class="rotate-card">
      <div class="rotate-btns">
        <div class="clockwise-btn item" title="90度" @click="clockwiseRotate"></div>
        <div class="anticlockwise-btn item" title="-90度" @click="anticlockwiseRotate"></div>
        <div class="scaleX-btn item" title="水平镜像" @click="rotateScaleX"></div>
        <div class="scaleY-btn item" title="垂直镜像" @click="rotateScaleY"></div>
      </div>
      <div class="count-num-btn">
        <el-input-number
          v-model="angelNum"
          controls-position="right"
          @change="handleChange"
          :min="1"
          :max="360"
        ></el-input-number>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      angelNum: 0,
      clockwiseAngle: 90, // 顺时针默认旋转角度
      anticlockwiseAngle: -90, // 逆时针旋转角度
    };
  },
  mounted() {
    this.$Bus.$on("lastAngel", e => {
      console.log("yijing", e);
      this.angelNum = e;
    });
  },
  methods: {
    /**顺时针旋转 */
    clockwiseRotate() {
      this.$emit("clockwiseRotate", this.clockwiseAngle);
    },

    /**逆时针旋转 */
    anticlockwiseRotate() {
      this.$emit("anticlockwiseRotate", this.anticlockwiseAngle);
    },

    /**水平镜像 */
    rotateScaleX() {
      this.$emit("rotateScaleX");
    },

    /**垂直镜像 */
    rotateScaleY() {
      this.$emit("rotateScaleY");
    },

    /**自定义旋转角度 */
    handleChange() {
      this.$emit("customizeRotate", this.angelNum);
      this.$Bus.$emit("angelNum", this.angelNum);
    }
  }
};
</script>
<style lang="scss" scope>
.rotate-canvas {
  position: absolute;
  left: 570px;
  z-index: 999;
}
.rotate-card {
  width: 200px;
  height: 100px;
}
.rotate-btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .item {
    width: 22px;
    height: 20px;
    cursor: pointer;
  }
  .clockwise-btn {
    background: url("~assets/editPage/rotate/rotate-right.png") no-repeat;
    &:hover {
      background: url("~assets/editPage/rotate/rotate-right_h.png") no-repeat;
    }
  }
  .anticlockwise-btn {
    background: url("~assets/editPage/rotate/rotate-left.png") no-repeat;
    &:hover {
      background: url("~assets/editPage/rotate/rotate-left_h.png") no-repeat;
    }
  }
  .scaleX-btn {
    background: url("~assets/editPage/rotate/scaleX.png") no-repeat;
    &:hover {
      background: url("~assets/editPage/rotate/scaleX_h.png") no-repeat;
    }
  }
  .scaleY-btn {
    background: url("~assets/editPage/rotate/scaleY.png") no-repeat;
    &:hover {
      background: url("~assets/editPage/rotate/scaleY_h.png") no-repeat;
    }
  }
}
.count-num-btn {
  margin-left: -18px;
  margin-top: 10px;
}
</style>
<style lang="scss">
.count-num-btn {
  .el-input-number {
    position: absolute;
    width: 165px !important;
    right: 17px;
    line-height: 30px;
    &:hover {
      .el-input__inner {
        border-color: #0ab087 !important;
      }
    }
  }
  .el-input__inner {
    width: 165px !important;
    padding-left: 0px !important;
    padding-right: 40px !important;
    &:hover {
      border-color: #0ab087;
    }
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    line-height: 14px !important;
    background-color: #d5e4de;
    &:hover {
      color: #0ab087;
    }
  }
}
</style>
