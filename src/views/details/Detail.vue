<template>
  <div class="detail">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
      <van-swipe-item v-for="item in gallerylArr" :key="item.id">
        <img :src="item.img_url" width="375" alt="" />
      </van-swipe-item>
    </van-swipe>
    <van-row gutter="15">
      <van-col span="8"
        ><van-icon name="checked" color="darkred" />30天无忧退货</van-col
      >
      <van-col span="8"
        ><van-icon name="checked" color="darkred" />48小时快速退费</van-col
      >
      <van-col span="8"
        ><van-icon name="checked" color="darkred" />满88元免邮费</van-col
      >
    </van-row>
    <div class="info">
      <h2>{{ infoArr.name }}</h2>
      <section>{{ infoArr.goods_brief }}</section>
      <div class="price">{{ infoArr.retail_price | priceFilter }}</div>
    </div>
    <!-- 弹出层 -->
    <div class="bottom">
      <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    </div>

    <div class="product">
      <h2>产品参数</h2>
      <div class="parameter" v-for="item in attributeArr" :key="item.id">
        <div class="parameter_l">{{ item.name }}</div>
        <div class="parameter_r">{{ item.value }}</div>
      </div>
    </div>
    <!-- 商品信息（返回html标签） -->
    <div class="tupian" v-html="htmlTxt"></div>
    <!-- 常见问题 -->
    <div class="issue">
      <div class="line_title">
        <h3>常见问题</h3>
      </div>
      <ul class="content">
        <li v-for="item in issueArr" :key="item.id">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </div>
    <!-- 相关产品 -->
    <div class="new mar_bot">
      <ul>
        <li v-for="item in goodsListArr" :key="item.id" @click="gitID(item.id)">
          <img :src="item.list_pic_url" width="100%" />
          <div>{{ item.name }}</div>
          <section>{{ item.retail_price | priceFilter }}</section>
        </li>
      </ul>
    </div>

    <transition name="fade">
      <div class="modal" v-show="moadlShow">
        <div class="modal_bg" @click="moadlShow = false"></div>
        <div class="modal_centent">
          <div class="top">
            <img width="100" :src="infoArr.list_pic_url" alt="" />
            <div class="top_right">
              <section>价格：{{ infoArr.retail_price | priceFilter }}</section>
              <section>库存：{{ infoArr.goods_number }}</section>
            </div>
          </div>
          <div class="down">
            <section>数量</section>
            <van-stepper v-model="value" />
          </div>

          <van-icon name="cross" @click="moadlShow = false" />
        </div>
      </div>
    </transition>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="goodsCountArr"
        @click="$router.push('/cart')"
      />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="showCart"
      />
    </van-goods-action>
  </div>
</template>
 
<script>
import {
  DetailApi,
  RelatedApi,
  cartCountdApi,
  cartAddApi,
} from "../../request/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      detailId: "",
      gallerylArr: "", // 轮播图图片路径
      attributeArr: "", //参数信息
      htmlTxt: "", //商品信息（返回html标签）
      infoArr: "", // 产品信息
      issueArr: "", // 常见问题
      goodsListArr: "", //相关产品
      goodsCountArr: "", //购物车产品数量
      moadlShow: false, // 显示底部弹出框
      value: 1, //Stepper 步进器
      productId: "", //产品id
      goodsId: "",
    };
  },
  methods: {
    showPopup() {
      this.moadlShow = true;
    },
    // 加入购物车
    showCart() {
      // let token2 = localStorage.getItem("X-Nideshop-Token");
      if (this.moadlShow == true) {
        cartAddApi({
          // "X-Nideshop-Token": token2,
          goodsId: this.goodsId,
          productId: this.productId,
          number: this.value,
        }).then((res) => {
          console.log(res);
          this.goodsCountArr = res.data.cartTotal.goodsCount;
        });
        Toast.success("添加成功");
        this.moadlShow = false;
        return;
      }
      this.moadlShow = true;
    },
    // 获取相关产品的id
    gitID(myid) {
      console.log(myid);
      this.$router.push('/detail?id='+myid)
      this.$router.go(0)
    },
  },
  created() {
    // this.$route.query 由Product页面传入过来的对象id
    DetailApi(this.$route.query).then((res) => {
      console.log(res.data);
      this.productId = res.data.productList[0].id;
      this.goodsId = res.data.productList[0].goods_id;
      console.log(res.data.productList);
      // 轮播图图片路径
      let { gallery } = res.data;
      this.gallerylArr = gallery;
      // 参数信息
      let { attribute } = res.data;
      this.attributeArr = attribute;
      // 产品信息
      let { info } = res.data;
      this.infoArr = info;
      //商品信息（返回html标签）
      let { goods_desc } = res.data.info;
      this.htmlTxt = goods_desc;
      // 常见问题
      let { issue } = res.data;
      this.issueArr = issue;
    });
    RelatedApi(this.$route.query).then((res) => {
      // console.log(res.data);
      let { goodsList } = res.data;
      this.goodsListArr = goodsList;
    });
    // 底部购物车
    // let token = localStorage.getItem("X-Nideshop-Token");
    cartCountdApi().then((res) => {
      this.goodsCountArr = res.data.cartTotal.goodsCount;
    });
  },
};
</script>
 
<style lang = "less" scoped>

.info {
  background: #fff;
  text-align: center;
  line-height: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  section {
    font-size: 14px;
  }
  .price {
    color: darkred;
    font-size: 14px;
  }
}
.bottom {
  margin-bottom: 20px;
}
.mar_bot {
  margin-bottom: 50px;
}
.product {
  padding: 10px 10px 10px 10px;
  background: #fff;
  h2 {
    font-size: 20px;
    line-height: 40px;
  }
  .parameter {
    display: flex;
    width: 100%;
    background: #efefef;
    height: 30px;
    margin-bottom: 5px;
    align-items: center;
    border-radius: 8px;
    .parameter_l {
      width: 80px;
      text-align: right;
      color: #999;
      margin-right: 6px;
      font-size: 14px;
    }
    .parameter_r {
      flex: 1;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.issue {
  margin-top: 10px;
  background: #fff;
  .line_title {
    width: 100%;
    height: 40px;
    font-size: 18px;
    text-align: center;
    line-height: 40px;
  }
  .content {
    h3 {
      padding-left: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      position: relative;
      padding-right: 10px;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        border-radius: 50%;
        position: absolute;
        left: 8px;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      padding-left: 20px;
      padding-right: 10px;
      color: #666;
      font-size: 13px;
    }
  }
}
/deep/.tupian {
  img {
    width: 100%;
    display: block;
  }
}

.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  .modal_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal_centent {
    width: 100%;
    min-height: 30vh;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 50px;
    padding: 10px;
    box-sizing: border-box;
    .van-icon-cross {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .top {
      display: flex;
      height: 100px;
      .top_right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 10px;
      }
    }
    .down {
      section {
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
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