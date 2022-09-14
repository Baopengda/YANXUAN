<template>
  <div class="new">
    <ul>
      <li v-for="item in arr" :key="item.id" @click="idClick(item.id)">
        <img :src="item.list_pic_url" width="100%" />
        <div>{{ item.name }}</div>
        <section>{{ item.retail_price | priceFilter }}</section>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  props: ["arr"],
  methods: {
    idClick(detailId) {
      // 传出该页面的商品id,到detailId里面接收
      this.$router.push({ name: "Detail", query: { id: detailId } });
    },
  },
};
</script>
 
<style lang = "less" scoped>
</style>