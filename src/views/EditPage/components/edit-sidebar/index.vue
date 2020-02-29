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
              class="side-ppt-item drag-block"
              @click="renderCanvas(index, item.id)"
              v-for="(item, index) in countList"
              :key="item.id"
              :data-index="index"
              :data-id="item.id"
              :class="[
                { select: selcetIndex == index },
                isEleDraging && dragingTag.dragId === item.id ? 'draging' : ''
              ]"
            >{{ item.id }}
              <v-touch
                tag="div"
                class="tag-container"
                :pan-options="{ directions: 'all', threshold: 0 }"
                @panstart="elementPanStart"
                @panmove="elementPanMove"
                @panend="elementPanEnd"
              >
                <div class="img-container">
                  <img :src="getThumImg(item.id)" />
                  <div class="item-btns list-btn" v-show="selcetIndex == index">
                    <div class="item-delete" @click.stop="delCanvas(index)"></div>
                    <div
                      class="item-create"
                      @click.stop="addSideImg(index)"
                    ></div>
                  </div>
                </div>
              </v-touch>
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

    <!--  移动中的标签  -->
    <div
      :style="{
        top: dragingTag.top + 'px',
        left: dragingTag.left + 'px',
        width: dragingTag.width - 50 + 'px',
        height: dragingTag.height - 50 + 'px'
      }"
      v-show="isEleDraging"
      class="moveDrag"
    >
      <div class="img-container">
        <img class="moveImg" :src="getThumImg(this.dragingTag.dragId)" />
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
// 移动位置坐标
let _posX = 0,
  _posY = 0;
export default {
  name: "edit-sidebar",
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
      tIdArr: [],

      isShowAnimate: false,
      // 正在拖动
      isEleDraging: false,

      // 拖动中的标签
      dragingTag: {
        // 第几个月份分隔
        subIndex: 0,
        // 每个月份里面的下标
        index: 0,
        hoverSubIndex: 0,
        // 拖动元素的位置
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        dragId: -1,
        // 元素起始位置
        orginPosition: [0, 0],
        // 最终停放的小组的序号
        hoverIndex: "null"
      },

      // 当前滚动的标签盒子
      $tagBox: null,
      tagBoxScrollTop: 0
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
    /**拖动开始 */
    elementPanStart(ev) {
      this.isShowAnimate = true;
      this.isClick = false;
      // 判断触摸开始的位置是否为标签
      let $box = this.parentIndexOf(
        document.elementFromPoint(ev.center.x, ev.center.y),
        "drag-block"
      );
      if ($box) {
        let _index = Number($box.getAttribute("data-index")),
          _dragId = $box.getAttribute("data-id"),
          _clientRect = $box.getBoundingClientRect(),
          _clientRectWidth = _clientRect.width,
          _clientRectHeight = _clientRect.height;
        this.isEleDraging = true;
        this.dragingTag.dragId = _dragId;
        this.dragingTag.index = _index;
        this.startIndex = _index;
        this.dragingTag.top = _clientRect.top;
        this.dragingTag.left = _clientRect.left;
        this.dragingTag.width = _clientRectWidth;
        this.dragingTag.height = _clientRectHeight;
        this.dragingTag.orginPosition[0] = _clientRect.top;
        this.dragingTag.orginPosition[1] = _clientRect.left;
      } else {
        this.$tagBox = this.$parentIndexOf(
          document.elementFromPoint(ev.center.x, ev.center.y),
          "tag-container"
        );
        this.tagBoxScrollTop = this.$tagBox.scrollTop;
      }
    },

    // 拖动进行中
    elementPanMove(ev) {
      ev.preventDefault();
      if (this.isEleDraging) {
        _posX = 0;
        _posY = 0;
        _posY = this.dragingTag.orginPosition[0] + ev.deltaY;
        _posX = this.dragingTag.orginPosition[1] + ev.deltaX;
        this.dragingTag.top = _posY;
        this.dragingTag.left = _posX;

        // 检测是否经过标签容器
        let $container = this.parentIndexOf(
          document.elementFromPoint(ev.center.x, ev.center.y),
          "drag-block"
        );
        if ($container) {
          let _index = $container.getAttribute("data-index"),
            _id = $container.getAttribute("data-id");
          // 经过标签容器，标签可放置
          let hoverIndex = _index === "null" ? _index : Number(_index);
          // 如果开始移动元素和落下元素不是同一个
          if (_id != this.dragingTag.dragId && hoverIndex != "null") {
            this.dragingTag.hoverIndex = hoverIndex;
            let endIndex = this.dragingTag.hoverIndex;
            let _countList = this.countList;
            console.log("startIndex", this.startIndex);
            console.log("endIndex", endIndex);
            if (this.startIndex < endIndex) {
              for (let i = 0; i < _countList.length; i++) {
                if (i > this.startIndex && i <= endIndex) {
                  _countList[i - 1] = _countList[i];
                }
              }
              _countList[endIndex] = _countList[this.startIndex];
            } else {
              for (let j = _countList.length - 1; j >= 0; j--) {
                if (j < this.startIndex && j >= endIndex) {
                  _countList[j + 1] = _countList[j];
                }
              }
            }
          }
        } else {
          this.dragingTag.hoverIndex = "null";
        }
      } else {
        this.$tagBox.scrollTop = this.tagBoxScrollTop - ev.deltaY;
      }
    },

    /**拖动结束 */
    elementPanEnd(e) {
      console.log("end")
      let _self = this;
      if (_self.isEleDraging) {
        _self.isEleDraging = false;
        console.log("jieshu", _self.isEleDraging);
        let $container = _self.parentIndexOf(
          document.elementFromPoint(e.center.x, e.center.y),
          "drag-block"
        );
        console.log("$contaner", $container);
        if ($container) {
          let _index = $container.getAttribute("data-index");
          let hoverIndex = _index === "null" ? _index : Number(_index);
          if (hoverIndex != "null") {
            console.log("hoverindex", hoverIndex);
          }
        } else {
          this.$tagBox = null;
        }
      }
    },

    // 判断元素父节点是否包含class
    parentIndexOf(node, parentClassName) {
      if (node.className.indexOf(parentClassName) !== -1) {
        return node;
      }
      for (let i = 0, n = node; (n = n.parentNode); i++) {
        if (n.className.indexOf(parentClassName) !== -1) {
          return n;
        }
        //找不到目标父节点，防止死循环
        if (n === document.documentElement) {
          return false;
        }
      }
    },
    /**添加空白幻灯片 */
    addCanvas() {
      this.countList.push({ id: this.$utils.get_Id() });
      this.canvasInfo.thumList = this.countList;
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
      this.canvasInfo.thumList = this.countList;
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
      console.log(this.countList);
      var id = this.$utils.get_Id();
      this.countList.splice(index + 1, 0, { id: id });
      this.canvasInfo.thumList = this.countList;
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
