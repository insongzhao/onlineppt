<!--新建弹窗 -->
<template>
  <div class="dialog-wrap">
    <div class="dialog-page">
      <div class="add-img"></div>
      <div class="input-name">
        <el-input v-model="defaultName" placeholder="请输入幻灯片名称"></el-input>
      </div>
      <div class="dialog-btn-group">
        <button class="btn sureDel" :class="{sure:defaultName != ''}" @click="sureAdd">确认</button>
        <button class="btn cancelDel" @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data() {
    return {
      defaultName: ""
    }
  },
  computed: {
    ...mapState(["canvasInfo"])
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    sureAdd() {
      this.$emit("sureAdd", this.defaultName);
    }
  }
}
</script>
<style lang="scss" scope>
.dialog-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
.dialog-page {
  position: fixed;
  width: 440px;
  height: 250px;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 4px;
}
.add-img {
  width: 100%;
  height: 50px;
  margin-top: 50px;
  background: url("~assets/editPage/addppt.png") no-repeat center;
}
.icon-tips {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: url("~assets/editPage/confirm.png") center no-repeat;
}

.input-name {
  width: 150px;
  height: 40px;
  margin: 0 auto;
  margin-top: 28px;
}

.dialog-btn-group {
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
    background-color: #dfdfdf;
    pointer-events: none;
  }
  .sure {
    background-color: #0ab087;
    pointer-events: auto;
  }
}
</style>
<style lang="scss">
.el-input__inner:focus {
  border-color: #0ab087;
}
</style>
