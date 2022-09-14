<template>
  <!-- 搜索框 -->
  <div class="fenl">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      @click="$router.push('/home/popup')"
    />
    <section>
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          @click="ClickFn(item.id)"
          :title="item.name"
          v-for="item in categoryList"
          :key="item.id"
        />
        <!-- 内容 -->
      </van-sidebar>
      <ul class="fl_center">
        <div>
          <img
            width="95%"
            height="140"
            :src="currentCategory.banner_url"
            alt=""
          />
          <h5>{{ currentCategory.front_name }}</h5>
        </div>
        <div class="title">
          <span></span>
          <h3>{{ currentCategory.name }}</h3>
        </div>
        <van-grid :column-num="3">
          <van-grid-item
            v-for="items in subCategoryList"
            :key="items.id"
            :icon="items.wap_banner_url"
            :text="items.name"
          >
          </van-grid-item>
        </van-grid>
      </ul>
    </section>
  </div>
</template>
 
<script>
import { catalogApi, catalogCurrentApi } from "../request/api";
export default {
  data() {
    return {
      // 搜索框的val
      value: "",
      activeKey: 0,
      // 侧边tab栏数组
      categoryList: [],
      // 页面title
      currentCategory: {},
      // 九宫格数组
      subCategoryList: [],
    };
  },
  methods: {
    ClickFn(id) {
      catalogCurrentApi({ id }).then((res) => {
        // console.log(res.data);
        let { currentCategory } = res.data;
        this.currentCategory = currentCategory;
        // 九宫格数组
        let { subCategoryList } = res.data.currentCategory;
        this.subCategoryList = subCategoryList;
      });
    },
  },
  created() {
    catalogApi().then((res) => {
      //   console.log(res.data);
      let { categoryList, currentCategory } = res.data;
      //   侧边tab栏数组
      this.categoryList = categoryList;
      //   页面title
      this.currentCategory = currentCategory;
      // 九宫格数组
      let { subCategoryList } = res.data.currentCategory;
      this.subCategoryList = subCategoryList;
    });
  },
};
</script>
 
<style lang = "less" scoped>
section {
  width: 100%;
  background-color: #fff;
  height: 87vh;
  display: flex;
  .van-sidebar {
    width: 20%;
    background-color: #f7f8fa;
  }
  .fl_center {
    width: 80%;
    div {
      width: 100%;
      position: relative;
      img {
        margin: 0 7px;
        border-radius: 5px;
        box-shadow: 0 0 6px #000;
        filter: brightness(0.5);
      }
      h5 {
        width: 100%;
        color: #fff;
        position: absolute;
        top: 48%;
        left: 0%;
        z-index: 222;
        text-align: center;
      }
    }
    .title {
      width: 100%;
      height: 50px;
      position: relative;
      background: #fff;
      font-size: 16px;
      span {
        width: 50%;
        height: 2px;
        background-color: #ccc;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }
      h3 {
        width: 30%;
        height: 40px;
        background-color: #fff;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        line-height: 40px;
        text-align: center;
        color: #000;
      }
    }
  }
}
</style>