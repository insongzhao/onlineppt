<!-- 编辑制作幻灯片页面-->
<template>
  <div class="edit-page">
    <div class="edit-header">
      <edit-header @delWork="delWork" :pptName="pptName"  @returnHome="isShowSaveDialog = true"></edit-header>
    </div>
    <div class="edit-container">
      <edit-sidebar class="edit-sidebar"></edit-sidebar>
      <edit-container class="edit-content"></edit-container>
    </div>

    <confirm-dialog
      v-show="isShowConfirm"
      @closeDialog="closeDialog"
      @sureDel="sureDel"
    ></confirm-dialog>

    <save-dialog v-show="isShowSaveDialog" @returntoHome="returntoHome" @saveReturn="saveReturn" @closeDialog=closeDialog>

    </save-dialog>
  </div>
</template>

<script>
import EditHeader from "./components/edit-header";
import ConfirmDialog from "@/components/confirm-dialog";
import EditSidebar from "./components/edit-sidebar";
import EditContainer from "./components/edit-container";
import SaveDialog from "@/components/save-dialog";
export default {
  name: "editPage",
  components: {
    EditHeader,
    ConfirmDialog,
    EditSidebar,
    EditContainer,
    SaveDialog
  },
  data() {
    return {
      isShowConfirm: false,
      isShowSaveDialog: false,
      pptName: ""
    };
  },
  mounted() {
    this.getName();
  },
  methods: {
    /**获取 pptName */
    getName() {
      this.pptName = this.$route.params.pptName;
      console.log("name+++++", this.pptName);
    },
    delWork() {
      this.isShowConfirm = true;
    },
    closeDialog() {
      this.isShowConfirm = false;
      this.isShowSaveDialog = false;
    },
    /**删除幻灯片 */
    sureDel() {
      this.isShowConfirm = false;
      this.$router.push({ name: "newWork" });
    },

    /**不保存直接退出 */
    returntoHome() {
      this.$router.push({ name: "home" });
    },

    /**保存并退出 */
    saveReturn() {
      // 保存操作

      // 退出
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
