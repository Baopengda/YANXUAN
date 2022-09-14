<template>
  <div>
    <div class="box">
      <img :src="brand.app_list_pic_url" alt="" height="100%" width="100%" />
      <h2>{{ brand.name }}</h2>
      <p>{{ brand.simple_desc }}</p>
    </div>
  </div>
</template>

<script>
import { GetDetailList } from "@/request/api";
export default {
  data() {
    return {
      id: "",
      brand: [],
    };
  },
  methods: {},
  created() {
    this.id = this.$route.params.brand;
    GetDetailList({ id: this.id }).then((res) => {
      let { brand } = res.data;
      this.brand = brand;
      console.log(res);
    });
  },
};
</script>

<style lang="less" scoped>
h2 {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin: auto;
  font-size: 20px;
  text-decoration: underline;
  color: #fff;
}
.box {
  width: 100%;
  position: relative;
}
p {
  background: #fff;
  font-size: 18px;
  text-align: center;
  padding: 20px 10px;
  line-height: 26px;
  color: #666;
}
</style>