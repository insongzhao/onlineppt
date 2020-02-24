<!--新建幻灯片页面 -->
<template>
  <div class="new-page-wrap">
    <div class="new-work-page">
      <div class="new-header">
        <div class="header-text noselect">我的幻灯片</div>
        <div class="return-btn" @click="returntoHome"></div>
      </div>
      <div class="pptList scroll">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="date" label="我的幻灯片" width="740">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
      <div class="new-footer">
        <div class="new-work-btn" @click="showDialog">
          新建幻灯片
        </div>
      </div>
    </div>
    

    <!-- 新建弹窗 -->
    <newwork-dialog
      v-show="isShowDialog"
      @closeDialog="closeDialog"
      @sureAdd="sureAdd"
    ></newwork-dialog>
  </div>
</template>

<script>
import NewworkDialog from "@/components/newwork-dialog";
export default {
  name: "newWork",
  components: {
    NewworkDialog
  },
  data() {
    return {
      isShowDialog: false, // 显示新建弹窗
      defaultName: "", // ppt名称
      tableData: [
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" },
        { date: "毕业设计" }
      ] // 所有幻灯片名称
    }
  },
  methods: {
    deleteRow(index, rows) {
      console.log("dellllllll");
      rows.splice(index, 1);
    },
    /**返回首页 */
    returntoHome() {
      this.$router.push({ name: "home" });
    },

    showDialog() {
      this.isShowDialog = true;
    },

    closeDialog() {
      this.isShowDialog = false;
    },

    /**确认新建幻灯片 */
    sureAdd(defaultName) {
      this.defaultName = defaultName;
      console.log("addddddddddd", this.defaultName);
      this.$router.push({
        name: "editPage",
        params: { pptName: this.defaultName }
      });
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
<style lang="scss">
.el-button--text {
  color: #0ab087 !important;
}
</style>