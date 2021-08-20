<template>
  <div class="hello">
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from "./components/HomeHeader";
import HomeSwiper from "./components/HomeSwiper";
import HomeIcons from "./components/HomeIcons";
import HomeRecommend from "./components/HomeRecommend";
import HomeWeekend from "./components/HomeWeekend";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeHeader,
    HomeIcons,
    HomeRecommend,
    HomeWeekend,
  },
  computed: {
    ...mapGetters(['recommendList','weekendList'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
