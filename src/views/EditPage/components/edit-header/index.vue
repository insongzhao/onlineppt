<!--编辑页面头部 -->
<template>
  <div class="header-page">
    <div class="header-logo"></div>
    <div class="operate-btns">
      <div class="save-prev" title="保存" @click="savePPT"></div>
      <div class="return-prev" title="撤销" @click="undoCanvas"></div>
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
// import { savePPT } from "../../../../service/ppt";
import { mapState } from "vuex";
import qs from "qs";
export default {
  name: "edit-header",
  props: ["pptName"],
  data() {
    return {
      defaultInput: "",
      undoStep: 0 // 撤销操作
    }
  },
  computed: {
    ...mapState(["canvasInfo", "loginInfo"])
  },
  mounted(){
  },
  methods: {
    delWork() {
      this.$emit("delWork");
    },
    returnHome() {
      this.$emit("returnHome");
      // this.$router.push({ path: "/" });
    },
    /**橡皮擦除 */
    removeObj() {},
    /**保存 canvas 的所有信息 */
    savePPT() {
      let saveInfo = {},
        userId = this.loginInfo.userId,
        pptInfo = [],
        pptInfoItem = {},
        pptDataItem = {};
      
      pptDataItem.canvasThum = this.canvasInfo.canvasThum;
      pptDataItem.canvasArr = this.canvasInfo.canvasArr;
      pptDataItem.thumList = this.canvasInfo.thumList;

      pptInfoItem.pptname = this.pptName;
      pptInfoItem.pptData = pptDataItem;

      pptInfo.push(pptInfoItem);

      saveInfo.userid = userId;
      saveInfo.pptinfo = pptInfo;

      console.log(saveInfo);

      let params = saveInfo;

      // this.$axios.post("http://localhost:8888/api/sys_user/savePptInfo", params)
      this.$axios({
        method: "post",
        url: "http://localhost:8888/api/sys_user/savePptInfo",
        data: params
      })
        .then(res => {
          console.log(res);
          console.log("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**撤销操作 */
    undoCanvas() {
      console.log("undo");
      this.undoStep++;
      this.$Bus.$emit("undoStep", this.undoStep);
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
