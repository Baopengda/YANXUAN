<template>
  <div class="popup">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        :placeholder="defaultKeyword"
        @search="onSearch"
        @cancel="onCancel"
        @input="inpVal"
      />
    </form>
    <!-- 历史记录 列表  -->
    <HistoryHot v-show="showNum === 1" />
    <List v-show="showNum === 2" />
    <Product v-show="showNum === 3" />
    <!-- <Detail v-show="showNum === 4"/> -->
  </div>
</template>
 
<script>
import HistoryHot from "../../components/popup/HistoryHot.vue";
import List from "../../components/popup/List.vue";
import Product from "../../components/popup/Product.vue";

import { SearchApi } from "../../request/api";
// import Vue from "vue";
// Vue.filter("priceFilter", function (val) {
//   return "￥ " + val.toFixed(2) + " 元";
// });
export default {
  data() {
    return {
      value: "",
      showNum: 1, // 1代表HistoryHot  2代表List  3代表Product 4 代表商品详情
      defaultKeyword: "",
    };
  },
  methods: {
    // 搜索框事件
    // 向product发送输入框的值
    onSearch(val) {
      this.showNum = 3;
      this.busProduct.$emit("busevent2", val);
    },
    onCancel() {
      this.$router.go(-1);
    },
    // 获取输入框的值
    inpVal(val) {
      this.showNum = 2;
      this.busHelper.$emit("bushelper", val);
    },
  },
  components: {
    HistoryHot,
    List,
    Product,
    // Detail,
  },
  mounted() {
    // 接受来自HistoryHot组件传过来的数字3,且此时让showNum=3,显示product页面
    this.bus.$on("busevent", (val) => {
      this.showNum = val;
    });
    // 搜索框的值实时改变事件
    this.busProduct.$on("busevent2", (val) => {
      this.value = val;
    });
  },
  created() {
    SearchApi().then((res) => {
      // 搜索框默认文本
      let { defaultKeyword } = res.data;
      this.defaultKeyword = defaultKeyword.keyword;
    });
  },
};
</script>
 
<style lang = "less" scoped>
.popup {
  background-color: #efefef;
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}
</style>