<!-- 文本下拉框页面-->
<template>
  <div class="edit-text-box">
    <el-card class="box-text-card">
      <div class="edit-list-content noselect">
        <ul class="edit-list">
          <li
            class="bold"
            style="font-size:16px;color:rgb(80,80,80)"
            @click="drawTitle(0)"
          >
            大标题
          </li>
          <li class="bold" style="font-size:12px;color:rgb(80,80,80)">
            小标题
          </li>
          <li class="normal" style="font-size:12px;color:rgb(80,80,80)">
            正文
          </li>
          <li class="normal" style="font-size:12px;color:rgb(80,80,80)">
            正文（小）
          </li>
          <li class="normal" style="font-size:12px;color:#0ab087">
            说明
          </li>
          <li class="normal" style="font-size:12px;color:#ffffff;">
            <span
              style="display:inline-block;width:34px;height:20px;line-height:20px;background-color:#0ab087"
              >说明</span
            >
          </li>
          <li class="normal" style="font-size:12px">引文</li>
          <li class="normal" style="font-size:12px">注释</li>
          <li class="empty"></li>
        </ul>
        <ul class="bg-list">
          <li class="bg-list-black bold common" style="font-size:16px;">
            大标题
          </li>
          <li class="bg-list-black bold common">
            小标题
          </li>
          <li class="bg-list-black normal common">
            正文
          </li>
          <li
            class="bg-list-grey bold common"
            style="font-size:16px;background-color:#9da0ab"
          >
            大标题
          </li>
          <li class="bg-list-grey bold common" style="background-color:#9da0ab">
            小标题
          </li>
          <li
            class="bg-list-grey normal common"
            style="background-color:#9da0ab"
          >
            正文
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "big-title"
    };
  },
  methods: {
    // chooseType(type) {
    //   this.$Bus.$emit("type", type);
    // },
    /**选择标题进行绘制 */
    drawTitle(titleType) {
      console.log(titleType);
      this.$Bus.$emit("type", titleType);
    }
  }
};
</script>
<style lang="scss" scope>
.edit-text-box {
  position: absolute;
  left: 250px;
  z-index: 999;
}
.edit-type {
  margin-top: 20px;
}
.text {
  font-size: 14px;
}
.title {
  cursor: pointer;
}
.box-text-card {
  width: 400px;
  height: 280px;
}
.edit-list-content {
  width: 100%;
  height: 235px;
  .edit-list,
  .bg-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .bg-list-black {
      &:hover {
        background-color: #777b86;
      }
    }
    .bg-list-grey {
      &:hover {
        background-color: #bbbdc2 !important;
      }
    }
    .common {
      font-size: 12px;
      color: #fff;
      background-color: #3c4252;
    }
    .normal {
      font-weight: normal;
    }
    .bold {
      font-weight: bold;
    }
  }
  li {
    display: inline-block;
    vertical-align: top;
    width: 90px;
    height: 32px;
    line-height: 30px;
    margin: 0px 0px 18px 0;
    border: 1px solid #3c4252;
    border-radius: 1px;
    text-align: center;
    background: none;
    cursor: pointer;
    pointer-events: auto;
  }
}
</style>
<style lang="scss">
.edit-text-box {
  .el-card__body {
    padding: 25px !important;
  }
}
</style>
