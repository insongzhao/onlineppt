<!-- 描边-->
<template>
  <div class="stroke-box">
    <el-card class="card-box">
      <div class="border-style">
        <div class="border-module" title="描边样式">
          <div class="pull-module-btn">
            <span class="module-display">
              <i class="edit-icon edit-icon-none" v-show="isShowTitle">无标题</i>
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
            <div class="select-btn" @click="selectStroke"></div>
          </div>
        </div>
        <div class="select-menu" v-show="isShowMenu">
          <i class="menu-icon edit-icon-none" @click="showStrokeStyle(1)">
            无标题
          </i>
          <i class="menu-icon edit-icon-line" @click="showStrokeStyle(2)"></i>
          <i
            class=" menu-icon edit-icon-dash_little"
            @click="showStrokeStyle(3)"
          ></i>
          <i
            class=" menu-icon edit-icon-dash_big"
            @click="showStrokeStyle(4)"
          ></i>
        </div>
      </div>
      <div class="border-thickness">
        <div class="border-module" title="粗细">
          <div class="pull-module-btn">
            <span class="module-display">
              <i class="edit-icon edit-ico-line_weight"></i>
            </span>
            <div class="select-btn" @click="showThickMenu"></div>
          </div>
          <ul class="module-list">
                <li title="1"><span style="height:1px"></span></li>
                <li title="2"><span style="height:2px"></span></li>
                <li title="3"><span style="height:3px"></span></li>
                <li title="4"><span style="height:4px"></span></li>
                <li title="5"><span style="height:5px"></span></li>
                <li title="6"><span style="height:6px"></span></li>
                <li title="7"><span style="height:7px"></span></li>
                <li title="8"><span style="height:8px"></span></li>
                <li title="12"><span style="height:12px"></span></li>
                <li title="16"><span style="height:16px"></span></li>
                <li title="24"><span style="height:24px"></span></li>
              </ul>
        </div>
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
      isShowTitle: true
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

    },
    
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
  height: 300px;
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
  background: url("~assets/editPage/stroke/selected.png");
  cursor: pointer;
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
.module-list {
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
  border: 1px solid black;
}
</style>
