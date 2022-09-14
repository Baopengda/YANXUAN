<template>
  <div class="cart">
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
    <div
      class="van-checkbox-group"
      v-for="(item, index) in cartListArr"
      :key="item.id"
    >
      <div class="qiehuan">
        <van-checkbox
          v-model="item.checked"
          :disabled="!falg"
          @click="checkBtnFn(cartListArr[index].product_id, item.checked)"
        >
          <van-swipe-cell>
            <van-card
              :num="cartListArr[index].number"
              :price="cartListArr[index].retail_price + '.00'"
              :title="cartListArr[index].goods_name"
              class="goods-card"
              :thumb="cartListArr[index].list_pic_url"
            />
            <!-- 删除 -->
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="delBtn(item.product_id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox>
      </div>
      <!-- 步进器 -->
      <div class="stepper">
        <van-stepper
          v-model="item.number"
          v-show="!falg"
          @plus="AddBtn(item)"
          @minus="SubBtn(item)"
        />
      </div>
    </div>
    <van-submit-bar
      :price="cartTotalArr.checkedGoodsAmount * 100"
      button-text="提交订单"
    >
      <van-checkbox
        v-model="checked"
        :disabled="!falgAll"
        @click="quanXuanBtn(checked)"
        >全选</van-checkbox
      >
      <template #tip>
        累计共{{ cartTotalArr.checkedGoodsCount }}件商品，可点击
        <van-button
          class="van_btn"
          :type="falg ? 'primary' : 'danger'"
          @click="checkAll"
          >{{ text }}</van-button
        >
        按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>
 
<script>
import {
  cartIndexdApi,
  cartCheckeddApi,
  cartUpdatedApi,
  cartDeletedApi,
} from "../request/api";
export default {
  data() {
    return {
      checked: false,
      falg: true, // 判断复选框的禁用
      falgAll: true,
      text: "编辑",
      value: 1, // 步进器的默认值
      cartListArr: "", //商品总列表
      cartTotalArr: {
        checkedGoodsCount: 0, // 商品数量
        checkedGoodsAmount: 0, // 商品总价
      }, //购物车数据
      result: [],
    };
  },
  methods: {
    // 步进器减少
    SubBtn(item) {
      console.log(item);
      cartUpdatedApi({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number - 1,
        productId: item.product_id,
      }).then((res) => {
        console.log(res);
        if (res.errno === 0) {
          let { cartList } = res.data;
          this.cartListArr = cartList;

          let { cartTotal } = res.data;
          this.cartTotalArr = cartTotal;
        }
      });
    },
    // 步进器增加
    AddBtn(item) {
      cartUpdatedApi({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number + 1,
        productId: item.product_id,
      }).then((res) => {
        console.log(res);
        if (res.errno === 0) {
          let { cartList } = res.data;
          this.cartListArr = cartList;

          let { cartTotal } = res.data;
          this.cartTotalArr = cartTotal;
        }
      });
    },
    // 单选切换按钮
    checkBtnFn(prodId, checked) {
      if (this.falg) {
        if (checked) {
          var my_isChecked = "1";
        } else {
          var my_isChecked = "0";
        }
        cartCheckeddApi({
          isChecked: my_isChecked,
          productIds: String(prodId),
        }).then((res) => {
          if (res.errno === 0) {
            // console.log(res);
            let { cartList } = res.data;
            this.cartListArr = cartList;

            let { cartTotal } = res.data;
            this.cartTotalArr = cartTotal;
          }
        });
      }
      // 全选排他
      for (let i = 0; i < this.cartListArr.length; i++) {
        var flag = true;
        for (let i = 0; i < this.cartListArr.length; i++) {
          if (!this.cartListArr[i].checked) {
            // 证明 有至少一个没有勾选
            // 推翻 假设
            flag = false;
            // 没有必要继续找了
            break;
          }
        }
        this.checked = flag;
      }
    },
    // 全选
    quanXuanBtn(checked) {
      if (this.falgAll) { // 判断全选被禁用的时候,不能点击全选按钮
        if (checked) {
          // checked为true的时候传入 "1",则其传入"0"
          var my_isChecked = "1";
        } else {
          var my_isChecked = "0";
        }
        // 获取所有商品product_id 拼接在一下,如"1,217,3"
        var productI_ds = [];
        for (let i = 0; i < this.cartListArr.length; i++) {
          var num = this.cartListArr[i].product_id + ",";
          if (i === this.cartListArr.length - 1) {
            var num = this.cartListArr[i].product_id + "";
          }
          productI_ds += `${num}`;
        }
        // 渲染数据
        cartCheckeddApi({
          isChecked: my_isChecked,
          productIds: String(productI_ds),
        }).then((res) => {
          if (res.errno === 0) {
            // console.log(res);
            let { cartList } = res.data;
            this.cartListArr = cartList;

            let { cartTotal } = res.data;
            this.cartTotalArr = cartTotal;
          }
        });
      }
    },
    // 编辑
    checkAll() {
      if (!this.cartListArr.length == 0) {
        if (this.falg) {
          this.falgAll = false;
          this.falg = false;
          this.text = "编辑完成";
        } else {
          this.falgAll = true;
          this.falg = true;
          this.text = "编辑";
        }
      } else {
        if (this.falg) {
          this.falg = false;
          this.text = "编辑完成";
        } else {
          this.falg = true;
          this.text = "编辑";
        }
      }
    },
    // 删除
    delBtn(productIds) {
      cartDeletedApi({
        productIds: String(productIds),
      }).then((res) => {
        console.log(res);
        if (res.errno === 0) {
          let { cartList } = res.data;
          this.cartListArr = cartList;

          let { cartTotal } = res.data;
          this.cartTotalArr = cartTotal;
        }
      });
    },
  },
  created() {
    // 请求头已经配置在request里面了，这里就不需要传token了
    cartIndexdApi().then((res) => {
      console.log(res.data);
      let { cartList } = res.data;
      this.cartListArr = cartList;

      let { cartTotal } = res.data;
      this.cartTotalArr = cartTotal;

      // 页面已经来的时候,就判断单选框是否勾选完,如果勾选玩,则其让全选勾选
      this.checked = true;
      for (let i = 0; i < this.cartListArr.length; i++) {
        if (!this.cartListArr[i].checked) {
          this.checked = false;
        }
      }
    });
  },
  watch: {
    // 当购物车没有商品时，禁用掉全选
    cartListArr: {
      handler(_new, _old) {
        if (this.cartListArr.length === 0) {
          this.checked = false;
          this.falgAll = false;
        }
      },
      deep: true,
    },
  },
};
</script>
 
<style lang = "less" scoped>
.delete-button {
  height: 100%;
}
/deep/.van-checkbox-group {
  background: #fff;
  padding: 0 10px;
}
/deep/.van-checkbox {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
/deep/.van-checkbox__label {
  flex: 1;
}
.van-submit-bar {
  bottom: 50px;
}

/deep/.van-submit-bar .van-submit-bar__tip {
  display: flex;
  align-items: center;
}

/deep/.van_btn,
/deep/.van_btn {
  height: 32px;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-right: 5px;
}

/deep/.van-stepper {
  text-align: right;
  /* background: #fafafa; */
}
/deep/.van-card__title {
  font-size: 18px;
  margin-top: 20px;
}
</style>