<template>
  <div class="list">
    <div class="van_cell" v-for="(item, index) in HelperhApi" :key="index">
      <div class="title" @click="spanClick(item)">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
 
<script>
import { HelperhApi } from "../../request/api";
export default {
  data() {
    return {
      HelperhApi: "",
    };
  },
  created() {
    this.busHelper.$on("bushelper", (val) => {
      HelperhApi({
        keyword: val,
      }).then((res) => {
        let { data } = res;
        this.HelperhApi = data;
      });
    });
  },
  methods: {
    spanClick(val) {
      // 向popup组件里传一个数字4,让商品详情页显示List
      this.bus.$emit("busevent", 3);
      //   把获取到的数据,用巴士传到product组件里去
      this.busProduct.$emit("busevent2", val);
    },
  },
};
</script>
 
<style lang = "less" scoped>
.van_cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  .title {
    flex: 1;
  }
}
.van_cell::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>