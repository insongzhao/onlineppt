<!-- 文字设置弹窗-->
<template>
  <div class="set-text-box" @click.stop>
    <el-card class="text-card">
      <div class="text-module font_family">
        <div
          class="text-module-btn family-module"
          :class="{ selected: showFamilyList }"
          @click="chooseFontFamily"
        >
          <span class="module-display noselect">微软雅黑</span>
          <div class="module-list scroll" v-show="showFamilyList">
            <ul>
              <li>宋体</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-module font_size" @click="chooseFontSize">
        <div
          class="text-module-btn size-module"
          :class="{ selected: showSizeList }"
        >
          <input
            v-model="defaultSize"
            type="number"
            maxlength="3"
            title="字号"
            class="module-display"
          />
        </div>
      </div>
      <div class="module-list size-list scroll" v-show="showSizeList">
        <ul>
          <li
            v-for="(item, index) in sizeList"
            :key="index"
            @click="selectSize(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="module-btns">
        <button class="bold-btn icon-btn" title="字体颜色">
          <i class="text-icon icon-btn_color"></i>
        </button>
        <button class="italic-btn icon-btn" title="粗体" @click="textBold">
          <i class="text-icon icon-btn_bold" :class="{ isBold: isBold }"></i>
        </button>
        <button class="italic-btn icon-btn" title="斜体" @click="textItalic">
          <i
            class="text-icon icon-btn_italic"
            :class="{ isItalic: isItalic }"
          ></i>
        </button>
        <button class="underline-btn" title="下划线" @click="textUnderline">
          <i
            class="text-icon icon-btn_underline"
            :class="{ isUnderline: isUnderline }"
          ></i>
        </button>
        <button class="through-btn" title="中划线" @click="textThrough">
          <i
            class="text-icon icon-btn_through"
            :class="{ isThrough: isThrough }"
          ></i>
        </button>
        <button class="shadow-btn" title="阴影" @click="textShadow">
          <i
            class="text-icon icon-btn_shadow"
            :class="{ isShadow: isShadow }"
          ></i>
        </button>
        <button class="background-btn" title="高亮" @click="highLight">
          <i class="text-icon icon-btn_highlight"></i>
        </button>
        <button class="format-btn" title="格式刷">
          <i class="text-icon icon-btn_format"></i>
        </button>
      </div>
      <div class="row-module">
        <div class="line-height-moudule line-module" @click="textLineHeight">
          <h3>字行高</h3>
          <el-input-number
            v-model="defaultLineHeight"
            controls-position="right"
            :min="1"
            :max="10"
            :step="0.1"
            :precision="1"
          ></el-input-number>
        </div>
        <div class="align-module">
          <button class="align-btn left-align" title="左对齐" @click="alignLeft" :class="{ leftAlign: leftAlign }"></button>
          <button class="align-btn center-align" title="居中" @click="alignCenter" :class="{ centerAlign: centerAlign }" ></button>
        </div>
      </div>
      <div class="row-module">
        <div class="white-space-moudule line-module" @click="lineSpace">
          <h3>字间距</h3>
          <el-input-number
            v-model="defaultSpace"
            controls-position="right"
            :min="1"
            :max="100"
          ></el-input-number>
        </div>
        <div class="align-module">
          <button class="align-btn right-align" title="右对齐" @click="alignRight" :class="{ rightAlign: rightAlign }"></button>
          <button class="align-btn justify-align" title="两端对齐" @click="alignJustify" :class="{jusityAlign: justifyAlign}"></button>
        </div>
      </div>

      <div class="highLight-color" ref="highLight" v-show="showHighLight">
        <el-color-picker
          v-model="highLightColor"
          @change="changeColor"
        ></el-color-picker>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFamilyList: false, // 显示字体下拉框
      showSizeList: false, // 显示字体大小下拉框
      sizeList: [
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        24,
        26,
        28,
        30,
        32,
        36,
        40,
        44,
        48,
        50,
        54,
        60,
        68,
        72,
        80,
        88,
        90,
        96
      ],
      defaultSize: 14, // 默认字号
      defaultLineHeight: 1, // 默认行高
      defaultSpace: 0,
      isBold: false, // 是否为粗体
      isItalic: false,
      isUnderline: false,
      isThrough: false,
      isShadow: false,
      leftAlign: false,
      rightAlign: false,
      centerAlign: false,
      justifyAlign: false,
      showHighLight: false,
      highLightColor: "#ffffff" //默认高亮
    };
  },
  mounted(){
    // this.initParams();
  },
  methods: {
    initParams() {
      this.isBold = false;
      this.isItalic = false;
      this.isUnderline = false;
      this.isThrough = false;
    },

    chooseFontFamily() {
      this.showFamilyList = !this.showFamilyList;
    },

    chooseFontSize() {
      console.log("size");
      this.showSizeList = !this.showSizeList;
    },

    /**选中字体大小 */
    selectSize(size) {
      console.log("size", size);
      this.defaultSize = size;
      this.showSizeList = false;
      this.$Bus.$emit("textSize", this.defaultSize);
    },

    /**粗体 */
    textBold() {
      this.isBold = !this.isBold;
      console.log("hh", this.isBold);
      this.$Bus.$emit("isBold", this.isBold);
    },

    /**斜体 */
    textItalic() {
      this.isItalic = !this.isItalic;
      this.$Bus.$emit("isItalic", this.isItalic);
    },
    /**下划线 */
    textUnderline(){
      this.isUnderline = !this.isUnderline;
      this.$Bus.$emit("isUnderline", this.isUnderline);
    },
    /**中划线 */
    textThrough(){
      this.isThrough = !this.isThrough;
      this.$Bus.$emit("isThrough", this.isThrough);
    },
    /**阴影 */
    textShadow(){
      this.isShadow = !this.isShadow;
      this.$Bus.$emit("isShadow", this.isShadow);
    },

    /**文本行高 */
    textLineHeight() {
      this.$Bus.$emit("lineHeight", this.defaultLineHeight);
    },
    /**文本间距 */
    lineSpace() {
      this.$Bus.$emit("lineSpace", this.defaultSpace);
    },
    alignLeft() {
      this.leftAlign = !this.leftAlign;
      this.$Bus.$emit("alignLeft", this.leftAlign);
    },
    alignRight() {
      this.rightAlign = !this.rightAlign;
      this.$Bus.$emit("alignRight", this.rightAlign);
    },
    alignCenter() {
      console.log("center")
      this.centerAlign = !this.centerAlign;
      this.$Bus.$emit("centerAlign", this.centerAlign);
    },
    alignJustify() {
      this.justifyAlign = !this.justifyAlign;
      this.$Bus.$emit("justifyAlign", this.justifyAlign);
    },

    /**高亮 */
    highLight() {
      this.showHighLight = !this.showHighLight;
      this.$refs.highLight.click;
    },
    changeColor() {

    }
  }
};
</script>
<style lang="scss" scope>
.set-text-box {
  position: absolute;
  left: 400px;
  z-index: 999;
  .text-card {
    width: 250px;
    height: 200px;
  }
}
.highLight-color {
  position: absolute;
}
.text-module {
  position: relative;
  display: inline-block;
  height: 28px;
  // margin-left: -45px;
  line-height: 26px;
  vertical-align: top;
  padding-left: 6px;
  text-align: left;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e9eaec;
  cursor: pointer;
}
.font_family {
  width: 160px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.text-module-btn {
  display: block;
  width: 100%;
  height: 100%;
  .module-display {
    display: inline-block;
    vertical-align: middle;
    width: 80%;
    height: 100%;
    padding-left: 10px;
    color: #707b8e;
    font-size: 12px;
  }
}
.text-module-btn::after {
  content: "";
  position: absolute;
  right: 7px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: url("~assets/editPage/stroke/selected_n.png") no-repeat;
}
.size-module::after {
  right: 0px;
}
.size-module.selected::after,
.family-module.selected::after {
  background: url("~assets/editPage/stroke/selected_s.png") no-repeat;
}
.module-list {
  width: calc(100% + 45px);
  height: auto;
  position: absolute;
  top: 27px;
  left: 0;
  height: auto;
  padding: 12px 1px;
  color: #707b8e;
  font-size: 12px;
  text-align: left;
  background-color: #fff;
  -webkit-box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid #e9eaec;
  border-top: 0;
  z-index: 99;
  li {
    padding-left: 10px;
  }
}
.font_size {
  position: relative;
  width: 47px;
  border-left-width: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  .module-display {
    width: 60%;
    padding-left: 5px;
  }
}
.size-list {
  position: absolute;
  width: 47px;
  height: 225px;
  left: 182px;
  top: 50px;
  li {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
}
.module-btns {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border-top: 1px solid #e9eaec;
  border-bottom: 1px solid #e9eaec;
  border-left: 1px solid #e9eaec;
  // border-radius: 4px;
  button {
    width: 100%;
    height: 100%;
    border-right: 1px solid #e9eaec;
    background-color: #fff;
    cursor: pointer;
    .text-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      text-align: center;
    }
    .icon-btn_color {
      background: url("~assets/editPage/text/text-color.png") no-repeat;
      &:hover {
        background: url("~assets/editPage/text/text-color_hover.png") no-repeat;
      }
    }
    .icon-btn_bold {
      background: url("~assets/editPage/text/text-bold.png") no-repeat;
      &:hover,
      &.isBold {
        background: url("~assets/editPage/text/text-bold_hover.png") no-repeat;
      }
    }
    .icon-btn_italic {
      background: url("~assets/editPage/text/text-italic.png") no-repeat;
      &:hover,
      &.isItalic {
        background: url("~assets/editPage/text/text-italic_hover.png") no-repeat;
      }
    }
    .icon-btn_underline {
      background: url("~assets/editPage/text/text-underline.png") no-repeat;
      &:hover,
      &.isUnderline {
        background: url("~assets/editPage/text/text-underline_hover.png") no-repeat;
      }
    }
    .icon-btn_through {
      background: url("~assets/editPage/text/text-through.png") no-repeat;
      &:hover,
      &.isThrough {
        background: url("~assets/editPage/text/text-through_hover.png") no-repeat;
      }
    }
    .icon-btn_shadow {
      background: url("~assets/editPage/text/text-shadow.png") no-repeat;
      &:hover,
      &.isShadow {
        background: url("~assets/editPage/text/text-shadow_hover.png") no-repeat;
      }
    }
    .icon-btn_highlight {
      background: url("~assets/editPage/text/high-light.png") no-repeat;
      &:hover {
        background: url("~assets/editPage/text/high-light_hover.png") no-repeat;
      }
    }
    .icon-btn_format {
      background: url("~assets/editPage/text/format.png") no-repeat;
      &:hover {
        background: url("~assets/editPage/text/format_hover.png") no-repeat;
      }
    }
  }
}
.row-module {
  position: relative;
  width: 100%;
  height: 30px;
  margin-top: 10px;
}
.line-module {
  position: relative;
  float: left;
  width: 130px;
  height: 29px;
  padding-left: 5px;
  text-align: left;
  line-height: 30px;
  h3 {
    display: inline-block;
    font-size: 12px;
    color: #707b8e;
  }
}

.align-module {
  float: right;
  display: flex;
  justify-content: space-between;
  width: 35%;
  height: 30px;
  button {
    width: 100%;
    height: 100%;
    border: 1px solid #e9eaec;
    background-color: #fff;
    cursor: pointer;
  }
  .left-align {
    background: url("~assets/editPage/text/left-align.png") no-repeat center;
    &:hover,
    &.leftAlign {
      background: url("~assets/editPage/text/left-align_hover.png") no-repeat
        center;
    }
  }
  .right-align {
    background: url("~assets/editPage/text/right-align.png") no-repeat center;
    &:hover,
    &.rightAlign {
      background: url("~assets/editPage/text/right-align_hover.png") no-repeat
        center;
    }
  }
  .center-align {
    background: url("~assets/editPage/text/center-align.png") no-repeat center;
    &:hover,
    &.centerAlign {
      background: url("~assets/editPage/text/center-align_hover.png") no-repeat
        center;
    }
  }
  .justify-align {
    background: url("~assets/editPage/text/justify.png") no-repeat center;
    &:hover,
    &.jusityAlign {
      background: url("~assets/editPage/text/justify_hover.png") no-repeat
        center;
    }
  }
}
</style>
<style lang="scss">
.el-card_body {
  padding: 20px 0 !important;
}
</style>
<style lang="scss">
.line-module {
  .el-input-number {
    position: absolute;
    width: 80px !important;
    right: 0px;
    line-height: 30px;
    &:hover {
      .el-input__inner {
        border-color: #0ab087 !important;
      }
    }
  }
  .el-input__inner {
    width: 80px !important;
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
