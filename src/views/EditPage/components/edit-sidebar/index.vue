<!-- 编辑页面侧边栏-->
<template>
  <div>
    <div class="sidebar-page">
      <div class="create-btn noselect" @click="addCanvas()">新建幻灯片</div>
      <div class="side-body">
        <div class="side-content">
          <div class="side-ppt-list scroll">
            <!-- 每张ppt缩略图 -->
            <div
              class="side-ppt-item"
              @click="renderCanvas(index, item.id)"
              v-for="(item, index) in countList"
              :key="item.id"
              :class="{ select: selcetIndex == index }"
            >
              <img :src="getThumImg(item.id)" />
              <div class="item-btns list-btn" v-show="selcetIndex == index">
                <div class="item-delete" @click.stop="delCanvas(index)"></div>
                <div class="item-create" @click.stop="addSideImg(index)"></div>
              </div>
            </div>
          </div>
          <div class="side-footer">
            <div class="page_size list">
              {{ selcetIndex + 1 }} / {{ this.countList.length }}
            </div>
            <div class="change_show_type">
              <div class="show_list" title="列表排列"></div>
              <div
                class="show_repeat"
                title="平铺排列"
                @click="repeatList"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar-page_repeat" v-show="isRepeat">
      <div class="repeat-header">
        <div class="page_size repeat">
          {{ selcetIndex + 1 }} / {{ this.countList.length }}
        </div>
        <div class="close-repeat" @click="isRepeat = false"></div>
      </div>
      <div class="repeat-content scroll">
        <div class="repeat-list">
          <div class="add-side item" @click="addCanvas()">
            <div class="repeat-add"></div>
            <span>新建幻灯片</span>
          </div>
          <!-- 每张ppt缩略图 -->
          <div
            class="repeat-ppt-item item"
            @click="renderCanvas(index, item.id)"
            v-for="(item, index) in countList"
            :key="item.id"
            :class="{ select: selcetIndex == index }"
          >
            <img :src="getThumImg(item.id)" />
            <div class="item-btns repeat-btn" v-show="selcetIndex == index">
              <div class="item-delete" @click.stop="delCanvas(index)"></div>
              <div class="item-create" @click.stop="addSideImg(index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "edit-sidebar",
  // components: {
  //   CanvasCard
  // },
  data() {
    return {
      countList: [{ id: this.$utils.get_Id() }],
      canvasWidth: 250,
      canvasHeight: 150,
      currentState: "", // 画布状态
      canvasImg: "", // 画布缩略图
      selectedMode: false, // 侧边栏选中状态
      selcetIndex: -1,
      indexArr: [],
      isRepeat: false, // 是否平铺排列
      imgId: "",
      tIdArr: []
    };
  },
  mounted() {
    this.$Bus.$on("currentState", e => {
      this.currentState = e;
      console.log("current", this.currentState);
    });
    this.$Bus.$on("canvasImg", e => {
      this.canvasImg = e;
      console.log("canvasImg", this.canvasImg);
    });
  },
  watch: {
    canvasImg: {
      deep: true,
      handler: function() {
        this.saveImgInfo(this.canvasImg);
      }
    }
  },
  computed: {
    ...mapState(["canvasInfo"])
  },
  methods: {
    /**添加空白幻灯片 */
    addCanvas() {
      this.countList.push({ id: this.$utils.get_Id() });
      // this.$store.commit("addCanvas");
    },

    /**保存画布缩略图 当右侧画布 canvasImg 发生变化时*/
    saveImgInfo(canvasImg) {
      var imgItem = {};

      // 将图片存入 canvasThum
      if (this.canvasInfo.canvasThum.length > 0) {
        // 如果存在保存的canvas，则进行替换
        for (var i = 0; i < this.canvasInfo.canvasThum.length; i++) {
          if (this.canvasInfo.canvasThum[i].tId == this.imgId) {
            this.canvasInfo.canvasThum[i].img = canvasImg;
          }
        }
        // 没有保存过 tId 为 imgId 的画布
        if (this.tIdArr.indexOf(this.imgId) == -1) {
          imgItem.tId = this.imgId;
          imgItem.img = canvasImg;
          this.canvasInfo.canvasThum.push(imgItem);
        }
      } else {
        // canvasThum 为空时
        imgItem.tId = this.imgId;
        imgItem.img = canvasImg;
        this.canvasInfo.canvasThum.push(imgItem);
      }
      this.canvasInfo.canvasThum.forEach(item => {
        this.tIdArr.push(item.tId);
      });

      console.log("success!", this.canvasInfo.canvasThum);
      console.log("aoligei", this.tIdArr);
    },

    /**点击缩略图 */
    renderCanvas(index, imgId) {
      this.selcetIndex = index;
      this.imgId = imgId;
      this.$Bus.$emit("imgId", imgId);
    },

    /**渲染侧边栏缩略图 根据缩略图 id 来渲染 */
    getThumImg(id) {
      if (this.canvasInfo.canvasThum.length > 0) {
        for (var i = 0; i < this.canvasInfo.canvasThum.length; i++) {
          if (this.canvasInfo.canvasThum[i].tId == id) {
            return this.canvasInfo.canvasThum[i].img;
          }
        }
      }
    },

    /**删除缩略图 */
    delCanvas(index) {
      if (this.countList.length == 1) {
        this.tipBox("已经是最后一张啦！", "error");
        return false;
      }
      var listLenth = this.countList.length;
      // 删除缩略图
      this.countList.splice(index, 1);
      console.log("hou", this.countList);

      // 删除缩略图数据
      if (this.canvasInfo.canvasThum.length > 0) {
        for (var i = 0; i < this.canvasInfo.canvasThum.length; i++) {
          if (this.canvasInfo.canvasThum[i].tId == this.imgId) {
            this.canvasInfo.canvasThum.splice(i, 1);
          }
        }
      }

      // 删除画布数据
      for (var j = 0; j < this.canvasInfo.canvasArr.length; j++) {
        if (this.canvasInfo.canvasArr[j].cId == this.imgId) {
          this.canvasInfo.canvasArr.splice(j, 1);
        }
      }

      this.modifyImgId(index, listLenth);
    },

    /**删除之后修改 imgId， 重新渲染右侧画布 */
    modifyImgId(index, listLenth) {
      // 如果删除的是最后一张, 跳转至上一张
      if (index == listLenth - 1) {
        this.selcetIndex = index - 1;
        this.imgId = this.countList[index - 1].id;
      } else {
        // 跳转到下一张
        this.selcetIndex = index;
        this.imgId = this.countList[index].id;
      }
      this.$Bus.$emit("imgId", this.imgId);
    },

    /**插入缩略图 */
    addSideImg(index) {
      console.log("插入", index);
      console.log(this.countList);
      var id = this.$utils.get_Id();
      this.countList.splice(index + 1, 0, { id: id });
      console.log(this.countList);
    },

    /**平铺排列 */
    repeatList() {
      this.isRepeat = true;
    },

    // 提示框
    tipBox(text, type) {
      this.$message({
        message: text,
        type: type,
        customClass: "toast-box " + type + "-toast",
        duration: 2000,
        iconClass: "toast-box-icon " + type + "-toast-icon"
      });
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
