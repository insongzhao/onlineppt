<!-- 编辑制作幻灯片页面-->
<template>
  <div class="edit-page">
    <div class="edit-header">
      <edit-header @delWork="delWork"></edit-header>
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
  </div>
</template>

<script>
import EditHeader from "./components/edit-header";
import ConfirmDialog from "@/components/confirm-dialog";
import EditSidebar from "./components/edit-sidebar";
import EditContainer from "./components/edit-container";
export default {
  name: "editPage",
  components: {
    EditHeader,
    ConfirmDialog,
    EditSidebar,
    EditContainer
  },
  data() {
    return {
      isShowConfirm: false
    };
  },
  methods: {
    delWork() {
      this.isShowConfirm = true;
    },
    closeDialog() {
      this.isShowConfirm = false;
    },
    /**删除幻灯片 */
    sureDel() {
      this.isShowConfirm = false;
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
