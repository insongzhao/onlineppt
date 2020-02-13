<!-- 文本下拉框页面-->
<template>
  <div class="edit-text-box">
    <el-card class="box-card">
      <li>
        <div class="edit-list">
          <div class="title" @click="chooseType(type)">大标题</div>
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
    return {
      type: "big-title"
    };
  },
  methods: {
    chooseType(type) {
      this.$Bus.$emit("type", type);
    },
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
.box-card {
  width: 200px;
  height: 500px;
}
</style>
