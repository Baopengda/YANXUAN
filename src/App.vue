<template>
  <div id="app">
    <router-view />
    <van-tabbar
      v-model="active"
      active-color="rgb(139, 0, 0)"
      inactive-color="#000"
      placeholder
      v-show="$route.path !== '/detail' && $route.path !== '/channel'"
    >
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" replace to="/topic">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" replace to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
Vue.filter("priceFilter", function (val) {
  return "￥ " + Number(val).toFixed(2) + " 元";
});
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },

};
</script>
<style lang="less">
body {
  font-family: "黑体";
  font-size: 14px;
  color: #333;
  background-color: rgb(239, 239, 239);
}
.van-col {
  font-size: 13px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-icon {
  margin-right: 4px;
}
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
.slide-enter,
.slide-leave-to {
  right: -100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: right 0.5s linear;
}
.slide-enter-to,
.slide-leave {
  right: 0;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
