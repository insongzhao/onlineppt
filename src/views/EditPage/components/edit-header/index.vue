<!--编辑页面头部 -->
<template>
  <div class="header-page">
    <div class="header-logo"></div>
    <div class="operate-btns">
      <div class="save-prev" title="保存"></div>
      <div class="return-prev" title="撤销"></div>
      <div class="recover-prev" title="恢复"></div>
      <div class="eraser" title="擦除" @click="removeObj"></div>
    </div>
    <div class="name-word">
      <div class="name">{{ this.pptName }}</div>
      <div class="suffix">.ppt</div>
      <!-- <el-input placeholder="未命名的文档" v-model="defaultInput"></el-input> -->
    </div>
    <div class="func-btns">
      <div class="delete-word common" @click="delWork">删除</div>
      <div class="demonstrate-btn common">演示</div>
      <div class="return-home common" @click="returnHome">返回首页</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "edit-header",
  props: ["pptName"],
  data() {
    return {
      defaultInput: ""
    }
  },
  computed: {
    ...mapState(["canvasInfo"])
  },
  mounted(){
    console.log("hhhhhh", this.canvasInfo.pptName);
  },
  methods: {
    delWork() {
      this.$emit("delWork");
    },
    returnHome() {
      this.$router.push({ path: "/" });
    },
    /**橡皮擦除 */
    removeObj() {
      
    },
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
<style lang="scss">
.el-input__inner {
  width: 150px;
  height: 30px;
  line-height: 30px;
  padding: 10px;
}
</style>
