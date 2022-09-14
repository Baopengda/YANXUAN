<template>
  <div class="">
    <!-- DropdownMenu 下拉菜单 -->
    <van-dropdown-menu active-color="#ee0a24">
      <van-dropdown-item
        v-model="value1"
        disabled
        :options="option1"
        title="综合"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        title="价格"
        @change="ifVal(value2)"
      />
      <van-dropdown-item
        v-model="value3"
        :options="option3"
        title="分类"
        @change="chageVal(value3)"
      />
    </van-dropdown-menu>
    <div class="new">
      <ul>
        <li v-for="item in dataArr" :key="item.id" @click="idClick(item.id)">
          <img :src="item.list_pic_url" width="100%" />
          <div>{{ item.name }}</div>
          <section>{{ item.retail_price | priceFilter }}</section>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
import { GoodshApi } from "../../request/api";
// 全局过滤器
// import Vue from "vue";
// Vue.filter("priceFilter", function (val) {
//   return "￥ " + val.toFixed(2) + " 元";
// });
export default {
  data() {
    return {
      value1: 0,
      value2: "",
      value3: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "居家", value: 1 },
      ],
      option2: [
        { text: "价格由高到低", value: "a" },
        { text: "价格由低到高", value: "b" },
      ],
      option3: [
        // 这里面的数在下面的filterCategory渲染的
        // { text: "全部", value: "0" },
        // { text: "居家", value: "y" },
      ],
      dataArr: "",
      fenleiArr: "", // 分类数组
      title: "",
      fenleiid: "", // 获取到的分类id
    };
  },
  mounted() {
    // 用宝宝巴士(busProduct)获取热门搜索的请求数据
    // 接收来自HistoryHot组件传过来的热门搜索的渲染数据
    this.busProduct.$on("busevent2", (val) => {
      this.title = val;
      GoodshApi({
        keyword: val,
        size: 20,
      }).then((res) => {
        if (res.errno === 0) {
          console.log(res);
          let { data } = res.data;
          this.dataArr = data;

          // 实现深拷贝替换掉option3里面的数组
          let { filterCategory } = res.data;
          this.fenleiArr = filterCategory;
          console.log(this.fenleiArr);

          this.fenleiArr = JSON.parse(
            JSON.stringify(this.fenleiArr)
              .replace(/name/g, "text")
              .replace(/id/g, "value")
          );
          this.option3 = this.fenleiArr;
          console.log(this.option3);
        }
      });
    });
  },
  methods: {
    // 价格事件
    ifVal(value2) {
      if (value2 === "a") {
        // 价格由高到低
        var a = "desc";
      } else {
        // 价格由低到高
        var a = "asc";
      }
      GoodshApi({
        keyword: this.title,
        size: 20,
        order: a,
        sort: "price",
      }).then((res) => {
        if (res.errno === 0) {
          let { data } = res.data;
          this.dataArr = data;
        }
      });
    },
    // 分类事件
    chageVal(value3) {
      this.fenleiid = value3;
      console.log(this.fenleiid);
      // 0为全部
      if (value3 === "0") {
        var b = "0";
        // 0以外的为居家、饮食
      } else {
        var b = this.fenleiid;
      }
      GoodshApi({
        keyword: this.title,
        size: 20,
        categoryId: b,
      }).then((res) => {
        if (res.errno === 0) {
          console.log(res.data);
          let { data } = res.data;
          this.dataArr = data;
        }
      });
    },
    // 点击跳转详情事件
    idClick(detailId) {
      // console.log(detailId);
     // 向popup组件里传一个数字4,让商品详情页显示Detail
      this.bus.$emit("busevent", 4);

      // 传出该页面的商品id,到detailId里面接收
      this.$router.push({name:"Detail",query:{id:detailId}})
    },
  },
};
</script>
 
<style lang = "less" scoped>
</style>