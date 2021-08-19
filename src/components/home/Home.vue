<template>
  <div class="hello">
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <home-recommend></home-recommend>
    <home-weekend></home-weekend>
  </div>
</template>

<script>
import HomeHeader from "./components/HomeHeader";
import HomeSwiper from "./components/HomeSwiper";
import HomeIcons from "./components/HomeIcons";
import HomeRecommend from "./components/HomeRecommend";
import HomeWeekend from "./components/HomeWeekend";
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeHeader,
    HomeIcons,
    HomeRecommend,
    HomeWeekend,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
