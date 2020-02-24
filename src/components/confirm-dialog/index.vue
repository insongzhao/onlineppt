<!--确认删除弹窗 -->
<template>
  <div class="dialog-wrap">
    <div class="dialog confirm-dialog">
      <div class="dialog__header">
        <div class="title">
          <div class="icon-logo"></div>
        </div>
        <div class="icon-closeX" @click="closeDialog"></div>
      </div>
      <div class="icon-tips"></div>
      <div class="tips-title">确认删除该幻灯片吗？</div>
      <div class="confirm-dialog-btn-group">
        <button class="btn sureDel" @click="sureDel">删除</button>
        <button class="btn cancelDel" @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSync: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    sureDel() {
      this.$emit("sureDel");
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.confirm-dialog {
  position: fixed;
  width: 440px;
  height: 250px;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 4px;
}

.icon-closeX {
  width: 24px;
  height: 24px;
  float: right;
  margin: 10px 10px 0 0;
  background: url("~assets/editPage/closeX.png") center no-repeat;
  cursor: pointer;
}

.dialog__header {
  text-align: left;
  height: 44px;
}

.title {
  display: inline-block;
  width: 200px;
  margin: 20px;
  color: #404144;
  font-size: 20px;
}

.icon-logo {
  display: inline-block;
  vertical-align: middle;
  margin: -2px 5px 0 0;
  width: 26px;
  height: 28px;
}

.icon-tips {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: url("~assets/editPage/confirm.png") center no-repeat;
}

.tips-title {
  text-align: center;
  color: #333333;
  font-size: 16px;
  font-family: "微软雅黑";
  margin-top: 20px;
}

.confirm-dialog-btn-group {
  margin-top: 20px;
  .btn {
    width: 90px;
    height: 35px;
    font-size: 16px;
    line-height: 35px;
    padding: 0;
    margin: 0 30px;
  }
  .sureDel {
    color: #ffffff;
    background-color: #0ab087;
  }
}
</style>
