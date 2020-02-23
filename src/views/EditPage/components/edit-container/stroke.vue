<!-- 描边-->
<template>
  <div class="stroke-box">
    <el-card class="card-box">
      <div class="border-style">
        <div class="border-module" title="描边样式">
          <div class="pull-module-btn">
            <span class="module-display">
              <i class="edit-icon edit-icon-none" v-show="isShowTitle"
                >无标题</i
              >
              <i class="edit-icon edit-icon-line" v-show="isShowLine"></i>
              <i
                class="edit-icon edit-icon-dash_little"
                v-show="isShowLitDash"
              ></i>
              <i
                class="edit-icon edit-icon-dash_big"
                v-show="isShowBigDash"
              ></i>
            </span>
            <div
              class="select-btn"
              :class="{ selected: isShowMenu }"
              @click="selectStroke"
            ></div>
          </div>
        </div>
        <div class="select-menu" v-show="isShowMenu">
          <i class="menu-icon edit-icon-none" @click="showStrokeStyle(1)"
            >无标题</i
          >
          <i class="menu-icon edit-icon-line" @click="showStrokeStyle(2)"></i>
          <i
            class="menu-icon edit-icon-dash_little"
            @click="showStrokeStyle(3)"
          ></i>
          <i
            class="menu-icon edit-icon-dash_big"
            @click="showStrokeStyle(4)"
          ></i>
        </div>
      </div>
      <div class="border-thickness">
        <div class="border-module" title="描边粗细">
          <div class="pull-module-btn">
            <span class="module-display">
              <i class="edit-icon edit-ico-line_weight"></i>
            </span>
            <div
              class="select-btn"
              :class="{ active: isShowList }"
              @click="showThickMenu"
            ></div>
          </div>
          <ul class="stroke-module-list" v-show="isShowList">
            <li
              v-for="(item, index) in strokeList"
              :key="index"
              :title="item.thickness"
              @click="chooseThick(item.thickness)"
            >
              <span :style="`height:${item.thickness}px`"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="pick-stroke-color">
        <el-color-picker
          v-model="defaultColor"
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
      isShowMenu: false, // 是否显示下拉框
      isShowLitDash: false,
      isShowLine: false,
      isShowBigDash: false,
      isShowTitle: true,
      isShowList: false, // 是否显示粗细下拉框
      defaultColor: "#000000",
      strokeList: [
        { thickness: 1 },
        { thickness: 2 },
        { thickness: 3 },
        { thickness: 4 },
        { thickness: 5 },
        { thickness: 6 },
        { thickness: 6 },
        { thickness: 7 },
        { thickness: 8 },
        { thickness: 12 },
        { thickness: 16 },
        { thickness: 24 }
      ]
    };
  },
  methods: {
    initPara() {
      this.isShowLitDash = false;
      this.isShowLine = false;
      this.isShowBigDash = false;
      this.isShowTitle = false;
    },
    /**显示下拉框 */
    selectStroke() {
      this.isShowMenu = !this.isShowMenu;
    },

    /**选择描边样式 */
    showStrokeStyle(id) {
      this.initPara();
      console.log("id", id);
      this.$Bus.$emit("strokeType", id);
      switch (id) {
        case 1: {
          this.isShowTitle = true;
          break;
        }
        case 2: {
          this.isShowLine = true;
          break;
        }
        case 3: {
          this.isShowLitDash = true;
          break;
        }
        case 4: {
          this.isShowBigDash = true;
          break;
        }
      }
    },

    /**显示粗细下拉框 */
    showThickMenu() {
      this.isShowList = !this.isShowList;
    },

    /**选择描边的粗细 */
    chooseThick(item) {
      console.log("thick", item);
      this.$Bus.$emit("thickness", item);
    },

    changeColor() {
      this.$Bus.$emit("strokeColor", this.defaultColor);
    }
  }
};
</script>
<style lang="scss" scope>
.stroke-box {
  position: absolute;
  left: 500px;
  z-index: 999;
}
.card-box {
  width: 300px;
  height: 150px;
}
.border-style {
  position: absolute;
}
.border-module {
  position: absolute;
  width: 120px;
  height: 30px;
  padding: 0 0 0 6px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #e9eaec;
}
.pull-module-btn {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.module-display {
  position: absolute;
  width: 80%;
  height: 100%;
  left: 0;
  color: #707b8e;
  font-size: 14px;
}
.edit-icon {
  width: 80px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  line-height: 28px;
  border-right: 1px solid #e9eaec;
}
.edit-icon-line {
  background: url("~assets/editPage/stroke/stroke-line2.png") no-repeat;
}
.select-btn {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 4px;
  top: 4px;
  border: 1p solid black;
  background: url("~assets/editPage/stroke/selected_n.png") no-repeat;
  cursor: pointer;
}
.select-btn.selected,
.select-btn.active {
  background: url("~assets/editPage/stroke/selected_s.png") no-repeat;
}
.select-menu {
  position: absolute;
  width: 120px;
  height: 130px;
  top: 30px;
  padding-top: 10px;
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid #e9eaec;
  z-index: 99;
}
.menu-icon {
  display: inline-block;
  width: 80px;
  height: 28px;
  color: #707b8e;
  cursor: pointer;
}
.edit-icon-dash_little {
  background: url("~assets/editPage/stroke/stroke-dash-little.png");
}
.edit-icon-dash_big {
  background: url("~assets/editPage/stroke/stroke-dash-big.png");
}
.border-thickness {
  position: absolute;
  width: 120px;
  height: 30px;
  right: 10px;
}
.stroke-module-list {
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: auto;
  padding: 12px 1px;
  color: #707b8e;
  font-size: 12px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid #e9eaec;
  li {
    padding: 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    span {
      display: inline-block;
      vertical-align: middle;
      width: 80%;
      background: #727b93;
    }
  }
}
.edit-ico-line_weight {
  width: 80px;
  height: 30px;
  background: url("~assets/editPage/stroke/line-weight.png");
}
.pick-stroke-color {
  position: absolute;
  width: 120px;
  height: 40px;
  top: 60px;
  border: 1px solid #e9eaec;
}
</style>
<style lang="scss">
.pick-stroke-color .el-color-picker__trigger {
  width: 100px;
  height: 40px;
}
</style>
