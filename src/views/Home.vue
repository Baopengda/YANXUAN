<template>
  <div class>
    <!-- 右滑进入 -->
    <transition name="slide">
      <router-view />
    </transition>
    <transition name="fade">
      <section v-show="$route.path === '/home'">
        <!-- 搜索框 -->
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          @click="$router.push('/home/popup')"
        />
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in banner" :key="item.id">
            <img :src="item.image_url" width="100%" />
          </van-swipe-item>
        </van-swipe>
        <!-- 图标导航 -->
        <van-grid :column-num="5">
          <van-grid-item
            v-for="item in channel"
            :key="item.id"
            :icon="item.icon_url"
            :text="item.name"
            @click="gridBtn(item.id)"
          />
        </van-grid>
        <!-- 品牌 -->
        <div class="brand">
          <div class="home_title">品牌制造商直供</div>
          <ul>
            <li
              v-for="item in brandList"
              :key="item.id"
              @click="brand(item.id)"
            >
              <img :src="item.pic_url" width="100%" />
              <h4>{{ item.name }}</h4>
              <p>{{ item.floor_price | priceFilter }}</p>
            </li>
          </ul>
        </div>
        <!-- 周一周四·新品首发 -->
        <div class="new">
          <h4>周一周四·新品首发</h4>
          <ul>
            <li
              v-for="item in newGoodsList"
              :key="item.id"
              @click="idClick(item.id)"
            >
              <img :src="item.list_pic_url" width="100%" />
              <div>{{ item.name }}</div>
              <section>{{ item.retail_price | priceFilter }}</section>
            </li>
          </ul>
        </div>
        <!-- 人气推荐 -->
        <div class="hotgoodslist">
          <h4>人气推荐</h4>
          <van-card
            v-for="itme in hotGoodsList"
            :key="itme.id"
            :thumb="itme.list_pic_url"
          >
            <template #title>
              <div class="title">
                <p>{{ itme.name }}</p>
                <p>{{ itme.goods_brief }}</p>
              </div>
              <div class="price">{{ itme.retail_price | priceFilter }}</div>
            </template>
          </van-card>
        </div>
        <!-- 专题精选 -->
        <div class="topic">
          <div class="topic_title">专题精选</div>
          <van-swipe :loop="false" :width="300" :show-indicators="false">
            <van-swipe-item v-for="item in topicList" :key="item.id">
              <img :src="item.scene_pic_url" width="100%" />
              <h2>
                {{ item.title }}
                <span>&nbsp;{{ item.price_info | infoFilter }} </span>
              </h2>
              <p>{{ item.subtitle }}</p>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 居家一下的全部渲染 -->
        <div class="new" v-for="(item, index) in categoryList" :key="item.id" @click="idClick(item.id)">
          <h4>{{ item.name }}</h4>
          <ul>
            <li v-for="item in categoryList[index].goodsList" :key="item.id">
              <img :src="item.list_pic_url" width="100%" />
              <div>{{ item.name }}</div>
              <section>{{ item.retail_price | priceFilter }}</section>
            </li>
          </ul>
        </div>
      </section>
    </transition>
  </div>
</template>
 
<script>
import { HomeApi } from "../request/api";
// 全局过滤器
import Vue from "vue";
// Vue.filter("priceFilter", function (val) {
//   return "￥ " + val.toFixed(2) + " 元";
// });
Vue.filter("infoFilter", function (val) {
  return " ￥ " + val.toFixed(2) + " 元起 ";
});
export default {
  data() {
    return {
      // 搜索框的val
      value: "",
      // 轮播图
      banner: "",
      // 图标导航
      channel: "",
      // 品牌制造商直供
      brandList: "",
      // 周一周四·新品首发
      newGoodsList: "",
      // 人气推荐
      hotGoodsList: "",
      // 专题精选
      topicList: "",
      // 居家一下的全部渲染
      categoryList: "",
    };
  },
  created() {
    HomeApi().then((res) => {
      // console.log(res.data);
      // 轮播图
      let { banner } = res.data;
      this.banner = banner;
      // 图标导航
      let { channel } = res.data;
      this.channel = channel;
      // 品牌制造商直供
      let { brandList } = res.data;
      this.brandList = brandList;
      // 周一周四·新品首发
      let { newGoodsList } = res.data;
      this.newGoodsList = newGoodsList;
      // 人气推荐
      let { hotGoodsList } = res.data;
      this.hotGoodsList = hotGoodsList;
      // 专题精选
      let { topicList } = res.data;
      this.topicList = topicList;
      // 居家一下的全部渲染
      let { categoryList } = res.data;
      this.categoryList = categoryList;
      // console.log(categoryList[0].goodsList);
    });
  },
  methods: {
    brand(brand) {
      this.brand = brand;
      this.$router.push(`/brand/${this.brand}`);
    },
    gridBtn(fenLeiId) {
      // console.log(fenLeiId);
      // 向channel页面传入分类的id
      this.$router.push({ name: "Channel", query: { id: fenLeiId } });
    },
    idClick(detailId) {
      // 传出该页面的商品id,到detailId里面接收
      this.$router.push({ name: "Detail", query: { id: detailId } });
    },
  },
};
</script>
 
<style lang = "less" scoped>
/* 轮播图 */
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: #39a9ed;
}
/* 品牌 */
.brand {
  margin: 20px 0;
  background-color: #fff;
}
.home_title {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}
.brand ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.brand ul li {
  width: 49%;
  position: relative;
}
.brand ul li h4 {
  font-size: 13px;
  position: absolute;
  top: 10px;
  left: 10px;
}
.brand ul li p {
  font-size: 13px;
  position: absolute;
  top: 40px;
  left: 10px;
  color: #8b0000;
}
/* 周一周四·新品首发 */
.new {
  font-size: 13px;
  background-color: #fff;
  h4 {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    li {
      width: 49%;
      background: #fff;
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 10px;
      section {
        margin-top: 5px;
        color: darkred;
      }
      div {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.hotgoodslist {
  margin-top: 10px;
  width: 100%;
  background-color: white;
  h4 {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
}
/* 人气推荐 */
.title {
  p {
    &:nth-child(1) {
      max-height: 32px;
      font-weight: 500;
      line-height: 29px;
      font-size: 18px;
    }
    &:nth-child(2) {
      height: 40px;
      max-height: 100px;
      line-height: 40px;
    }
  }
}
.price {
  line-height: 20px;
  color: #8d0000;
}
/* 专题 */
.topic {
  margin-top: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0 8px;
  .van-swipe-item {
    margin-right: 15px;
    height: auto;
    padding-bottom: 10px;
    background-color: #fff;
  }
  .topic_title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
  }
  img {
    height: 200px;
  }
  h2 {
    line-height: 40px;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
  }
  span {
    color: darkred;
  }
  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
    font-size: 12px;
  }
}
</style>