<template>
  <div class="topic">
    <div class="box" v-for="item in data" :key="item.id">
      <img width="100%" :src="item.scene_pic_url" alt="" />
      <div class="title">{{ item.title }}</div>
      <div class="tip">{{ item.subtitle }}</div>
      <div class="price">{{ item.price_info | priceFilter }}起</div>
    </div>
    <van-pagination
      v-model="currentPage"
      @change="fenyeChange(currentPage)"
      :page-count="page"
      mode="simple"
    />
  </div>
</template>
 
<script>
import { topicApi } from "../request/api";
export default {
  data() {
    return {
      // 当前页数
      currentPage: 1,
      //   页面数组
      data: [],
      //   总页数
      page: "",
    };
  },
  methods: {
    //   分页
    fenyeChange(Page) {
      topicApi({
        page: Page,
        size: 10,
      }).then((res) => {
        console.log(res.data);
        let { data } = res.data;
        this.data = data;
      });
    },
  },
  created() {
    topicApi().then((res) => {
      console.log(res.data);
      //   总计页数
      this.page = res.data.totalPages;
      let { data } = res.data;
      this.data = data;
    });
  },
};
</script>
 
<style lang = "less" scoped>
.topic {
  padding-bottom: 100px;
  .box {
    background-color: #fff;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 18px;
    margin: 10px 0;
  }
  .tip {
    font-size: 16px;
    margin: 20px 0;
    color: #1f1f1f;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .price {
    color: #9b0000;
    margin-bottom: 10px;
  }
  /deep/.van-pagination__page-desc {
    display: none;
  }
}
</style>