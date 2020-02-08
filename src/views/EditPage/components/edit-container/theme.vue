<!--主题 -->
<template>
  <div class="theme-box">
    <el-card class="box-card theme-card">
      <input
        type="file"
        ref="importImg"
        style="display:none"
        @change="getImgUrl"
      />
      <div class="img-theme" @click="chooseImg">图片主题</div>
      <div class="color-theme">
        <span>颜色主题</span>
        <div>
          <el-color-picker
            v-model="defaultColor"
            @change="changeColor"
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
      bgUrl: "",
      defaultColor: "#000000"
    };
  },
  methods: {
    chooseImg() {
      this.$refs.importImg.click();
    },
    /**获取图片的路径 */
    getImgUrl() {
      console.log("图片路径");
      var file = this.$refs.importImg.files[0];
      var _this = this;
      console.log("file", file);
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          //e.target.result 图片路径地址
          _this.$Bus.$emit("bgImgUrl", e.target.result);
        };
      }
    },
    /**选择主题颜色 */
    changeColor() {
      this.$Bus.$emit("themeColor", this.defaultColor);
    }
  }
};
</script>
<style lang="scss" scope>
.theme-box {
  position: absolute;
  z-index: 999;
}
.box-card {
  position: absolute;
  width: 200px;
  height: 200px;
}
.theme-card {
  left: 350px;
}
.img-theme {
  width: 100px;
  height: 30px;
  text-align: left;
  border: 1px solid black;
  cursor: pointer;
}
.color-theme {
  width: 158px;
  height: 40px;
  border: 1px solid black;
  span {
    float: left;
    font-size: 16px;
    line-height: 40px;
  }
}
</style>
