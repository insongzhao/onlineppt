<!-- 文本下拉框页面-->
<template>
  <div class="shape-box">
    <el-card class="box-card">
      <li>
        <div class="shape-list">
          <div class="empty"></div>
          <div class="empty"></div>
          <div class="empty"></div>
          <div class="empty"></div>
        </div>
      </li>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scope>
.shape-box {
  position: absolute;
  z-index: 999;
}
.shape-type {
  margin-top: 20px;
}
.text {
  font-size: 14px;
}
.box-card {
  width: 200px;
  height: 500px;
}
</style>
