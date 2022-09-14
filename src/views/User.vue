<template>
  <div class="box">
    <div class="user">
      <div class="user_top">
        <img :src="avatar" height="70" />
        <section @click="onLoginClick">{{ nickname }}</section>
        <van-icon
          :name="nickname === '点击登录' ? 'arrow' : 'cross'"
          class="icon"
          @click="offLoginClick"

        />
      </div>
    </div>
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in gridArr"
        :key="item.id"
        :icon="item.icon"
        :text="item.txt"
        style="height: 137px"
      />
    </van-grid>

    <!-- 模态框 -->
    <div class="user_model" v-show="showModel">
      <div class="model_box" @click="showModel = false"></div>
      <div class="model_content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="danger" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
 
<script>
// import avatarPng from "../assets/avatar.png";
import { LoginApi } from "../request/api";
export default {
  data() {
    return {
      // 头像
      avatar: require("../assets/avatar.png"),
      // 九宫格数组
      gridArr: [
        { txt: "我的订单", icon: "label-o" },
        { txt: "优惠券", icon: "bill-o" },
        { txt: "礼品卡", icon: "goods-collect-o" },
        { txt: "我的收藏", icon: "location-o" },
        { txt: "我的足迹", icon: "flag-o" },
        { txt: "会员福利", icon: "contact" },
        { txt: "地址管理", icon: "aim" },
        { txt: "账号安全", icon: "warn-o" },
        { txt: "联系客服", icon: "service-o" },
        { txt: "帮助中心", icon: "question-o" },
        { txt: "意见反馈", icon: "smile-comment-o" },
      ],
      //   登录form表单
      username: "包鹏达",
      password: "bpd123",
      //   模态框的显示隐藏
      showModel: false,
      //   点击登录
      nickname: "点击登录",
    };
  },
  methods: {
    //   登录事件
    onLoginClick(){
      if(this.nickname ==="点击登录" ){
        this.showModel = true
      }
        
    },
    onSubmit(values) {
      LoginApi({
        username: values["用户名"],
        pwd: values["密码"],
      }).then((res) => {
        if (res.errno === 0) {
          let { token, userInfo } = res.data;
          //   console.log(res.data);
          let userInfo1 = JSON.stringify(userInfo);
          localStorage.setItem("X-Nideshop-Token", token);
          localStorage.setItem("userInfo", userInfo1);
          //   隐藏模态框
          this.showModel = false;
          //   替换头像
          this.avatar = userInfo.avatar;
          //   替换用户名
          this.nickname = userInfo.username;
        }
      });
    },
    //   退出登录事件
    offLoginClick() {
      if (this.nickname !== "点击登录") {
        this.$dialog
          .confirm({
            title: "注销账号确认",
            message: "你是否想要退出当前账号？",
          })
          .then(() => {
            localStorage.removeItem("X-Nideshop-Token");
            localStorage.removeItem("userInfo");
            //   刷新页面
            this.$router.go(0);
          })
          .catch(() => {
            return;
          });
      }
    },
  },
  created() {
    // 判断用户有没有登录
    let token = localStorage.getItem("X-Nideshop-Token");
    if (token) {
      let userInfo = localStorage.getItem("userInfo");
      let userInfo1 = JSON.parse(userInfo);
      this.avatar = userInfo1.avatar;
      this.nickname = userInfo1.username;
    }
  },
};
</script>
 
<style lang = "less" scoped>
.user {
  padding: 20px 10px;
  background: #333;
  .user_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  section,
  .icon {
    color: #fff;
  }
  section {
    flex: 1;
  }
  img {
    border-radius: 50%;
    margin-right: 10px;
  }
}

.user_model {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .model_box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .model_content {
    height: 200px;
    padding-top: 40px;
    background-color: #fff;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>