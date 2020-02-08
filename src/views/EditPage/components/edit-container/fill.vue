<!--填充 -->
<template>
  <div class="edit-canvas-box">
    <el-card class="box-card">
      <div class="color-btns">
        <div class="no-fill-btn check-box" @click="checkFill">
          <div class="btn-img-noselect btn-img" v-show="!isChecked"></div>
          <div class="btn-img-select btn-img" v-show="isChecked"></div>
          <div class="btn-text noselect" :class="{ active: isChecked }">
            无填充
          </div>
        </div>
        <div class="fill-btn check-box" @click="checknoFill">
          <div class="btn-img-noselect btn-img" v-show="!isFillChecked"></div>
          <div class="btn-img-select btn-img" v-show="isFillChecked"></div>
          <div class="btn-text noselect" :class="{ active: isFillChecked }">
            纯色填充
          </div>
        </div>
        <div class="pick-color">
          <el-color-picker
            :disabled="unpickColor"
            v-model="defaultColor"
            @change="fillColor"
          ></el-color-picker>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      isFillChecked: false,
      defaultColor: "#000000",
      nofillColor: "#ffffff",
      isFill: false, // 是否进行填充
      unpickColor: false //是否禁用颜色选择器
    };
  },
  methods: {
    checkFill() {
      this.isChecked = true;
      this.isFillChecked = false;
      this.isFill = false;
      this.unpickColor = true;
      this.$Bus.$emit("selectedColor", this.nofillColor);
      this.$Bus.$emit("isFill", this.isFill);
    },
    checknoFill() {
      this.isFillChecked = true;
      this.isChecked = false;
      this.isFill = true;
      this.unpickColor = false;
      this.$Bus.$emit("isFill", this.isFill);
    },

    /**选择填充颜色 */
    fillColor() {
      console.log("改变颜色");
      this.$Bus.$emit("selectedColor", this.defaultColor);
    }
  }
};
</script>
<style lang="scss" scope>
.edit-canvas-box {
  position: absolute;
  left: 470px;
  z-index: 999;
}
.box-card {
  width: 200px;
  height: 200px;
}
.check-box {
  display: flex;
  width: 100px;
  height: 22px;
  margin: 0 auto;
  margin-bottom: 10px;
  color: #707070;
  font-size: 16px;
  line-height: 22px;
  &:hover {
    color: #0ab087;
  }
}
.btn-text.active {
  color: #0ab087;
}
.btn-img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.btn-img-noselect {
  background: url("~assets/editPage/fill/check-hover.png");
}
.btn-img-select {
  background: url("~assets/editPage/fill/check-true.png");
}
</style>
<style lang="scss">
.pick-color .el-color-picker__trigger {
  width: 100px;
  height: 40px;
}
</style>
