<template>
  <div class="">
    <!-- 历史热门搜索 -->
    <div class="history_hot">
      <section>
        <div class="title">
          <h3>历史记录</h3>
          <van-icon name="delete-o" @click="falg = false" />
        </div>
        <div class="tags">
          <van-tag
            plain
            color="#969799"
            v-for="(item, index) in historyKeywordList"
            :key="index"
            v-show="falg"
            @click="lishiClick(item)"
            >{{ item }}</van-tag
          >
        </div>
      </section>
      <section>
        <div class="title">
          <h3>热门搜索</h3>
        </div>
        <div class="tags">
          <span
            class="tag"
            v-for="(item, index) in hotKeywordList"
            :key="index"
            @click="tagClick(item.keyword)"
            >{{ item.keyword }}</span
          >
        </div>
      </section>
    </div>
  </div>
</template>
 
<script>
import { SearchApi } from "../../request/api";
// 清除历史记录
export default {
  data() {
    return {
      historyKeywordList: "",
      hotKeywordList: "",
      falg: true,
    };
  },
  created() {
    SearchApi().then((res) => {
      console.log(res.data);
      // 热门搜索
      let { hotKeywordList } = res.data;
      this.hotKeywordList = hotKeywordList;
      // 历史记录
      let { historyKeywordList } = res.data;
      this.historyKeywordList = historyKeywordList;
    });
    // 清除历史记录
    // ClearhistoryhApi().then((res) => {
    //   console.log(res);
    // });
  },
  methods: {
    //   点击热门搜索事件
    tagClick(value) {
      // 向popup组件里传一个数字4,让商品详情页显示HistoryHot
      this.bus.$emit("busevent", 3);
      //   把获取到的数据,用巴士传到product组件里去
      this.busProduct.$emit("busevent2", value);
    },
    // 点击垃圾桶
    removeTag() {},
    lishiClick(val) {
      // 向popup组件里传一个数字3
      this.bus.$emit("busevent", 3);
      //   把获取到的数据,用巴士传到product组件里去
      this.busProduct.$emit("busevent2", val);
    },
  },
  mounted(){
    this.busHelper.$on("bushelper", val=>{
      this.hotKeywordList.push(val)
    });
  }
};
</script>
 
<style lang = "less" scoped>
.history_hot {
  section {
    padding: 10px;
    background: #fff;
    margin-bottom: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .tags {
      .van-tag {
        padding: 0 4px;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      .tag {
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        padding: 1px 4px;
        display: inline-block;
        color: #969799;
        border: 1px solid #969799;
        &:nth-child(1) {
          color: #ee0a24;
          border: 1px solid #ee0a24;
        }
      }
    }
  }
}
</style>