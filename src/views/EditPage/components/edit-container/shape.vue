<!--形状 -->
<template>
  <div class="shape-box">
    <el-card class="box-card">
      <li
        v-for="(data, index) in shapeList"
        :key="index"
        class="text item shape-type"
      >
        <div class="title">{{ data.title }}</div>
        <div class="shape-list">
          <div
            class="shape-item"
            v-for="(item, index) in data.shapeLogo"
            :key="index"
            @click="chooseType(item.drawType)"
          >
            <img :src="item.iconUrl" />
          </div>
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
      shapeList: [
        {
          title: "线条",
          shapeLogo: [
            {
              drawType: "line",
              iconUrl: require("@/assets/editPage/shape/line.png")
            },
            {
              drawType: "row-line",
              iconUrl: require("@/assets/editPage/shape/row-line.png")
            },
            {
              drawType: "dotted",
              iconUrl: require("@/assets/editPage/shape/dotted.png")
            }
          ]
        },
        {
          title: "形状",
          shapeLogo: [
            {
              drawType: "rectangle",
              iconUrl: require("@/assets/editPage/shape/rectangle.png")
            },
            {
              drawType: "equilateral",
              iconUrl: require("@/assets/editPage/shape/triangle.png")
            },
            {
              drawType: "circle",
              iconUrl: require("@/assets/editPage/shape/circle.png")
            },
            {
              drawType: "ellipse",
              iconUrl: require("@/assets/editPage/shape/ellipse.png")
            },
            {
              drawType: "quadrangle",
              iconUrl: require("@/assets/editPage/shape/quadrangle.png")
            }
          ]
        }
      ]
    };
  },
  methods: {
    chooseType(type) {
      this.$Bus.$emit("type", type);
    }
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
  font-size: 12px;
}

.box-card {
  width: 200px;
  height: 500px;
  .title {
    width: 50px;
    height: 20px;
    font-size: 14px;
    color: #707b8e;
    text-align: left;
    line-height: 12px;
  }
}
.shape-list {
  display: flex;
  width: 158px;
  height: 22px;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5px;
  .shape-item {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.shape-box .el-card__body {
  padding-top: 0px;
}
</style>
