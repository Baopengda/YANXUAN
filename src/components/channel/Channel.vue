<template>
  <div class="">
    <van-tabs @click="tabClick" v-model="activeName">
      <van-tab
        v-for="item in brotherCategoryArr"
        :title="item.name"
        :key="item.id"
        :name="item.id"
      >
        <!-- 内容 {{ index }} -->
        <div class="van-tabs__content">
          <div class="tab_title">
            <h2>{{ currentCategoryArr.name }}</h2>
            <p>{{ currentCategoryArr.front_name }}</p>
          </div>
          <div class="tab_list">
            <h4></h4>
            <LoadMore :bigarr="dataArr" :size="8">
              <GoodsList slot-scope="scope" :arr="scope.smallarr" />
            </LoadMore>
            <!-- <GoodsList :arr="dataArr" /> -->
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
 
<script>
import GoodsList from "../GoodsList.vue";
import { ChannelApi, GoodshApi } from "../../request/api";
export default {
  data() {
    return {
      brotherCategoryArr: [],
      currentCategoryArr: [],
      dataArr: [],
      activeName: "",
    };
  },
  methods: {
    tabClick(name) {
      // name就是每一个标题的id
      // 调用渲染List组件的data数据方法
      this.$router.push({ name: "Channel", query: { id: name } });
      this.dataFn(name);
      ChannelApi({ id: name }).then((res) => {
        if (res.errno == 0) {
          // 当前某个种类
          let { currentCategory } = res.data;
          this.currentCategoryArr = currentCategory;
        }
      });
    },
    // List列表的渲染数据
    dataFn(id) {
      GoodshApi({
        categoryId: id,
        page: 1,
        size: 1000,
      }).then((res) => {
        if (res.errno == 0) {
          //   console.log(res.data);
          let { data } = res.data;
          this.dataArr = data;
        }
      });
    },
  },
  created() {
    // 由首页传过来的id
    let id = this.$route.query.id;
    // 首页点击里面,对应到相应的title
    this.activeName = id;
    ChannelApi({ id }).then((res) => {
      if (res.errno == 0) {
        // console.log(res.data);
        // 标题栏种类数组
        let { brotherCategory } = res.data;
        this.brotherCategoryArr = brotherCategory;
        // 当前某个种类
        let { currentCategory } = res.data;
        this.currentCategoryArr = currentCategory;
        this.activeName = currentCategory.id;
      }
    });
    // 调用渲染List组件的data数据方法
    this.dataFn(id);
  },
  components: {
    GoodsList,
  },
};
</script>
 
<style lang = "less" scoped>
.tab_title {
  text-align: center;
  h2 {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
  }
  p {
    height: 30px;
    line-height: 30px;
    color: #666;
  }
}
.tab_list {
  background: #fff;
  h4 {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }
}
</style>