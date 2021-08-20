<template>
<div class="city">
  <div class="city-header">
    <div class="header-title">
<!--      <router-link to="/">-->
        <div @click="backHome"><span class="iconfont icon-fanhui1 back-icon"></span></div>
<!--      </router-link>-->
      <div class="select-city-title">城市选择</div>
    </div>
    <div class="header-input-bar">
    <input type="text" class="header-input" placeholder="输入城市名或拼音">
    </div>
  </div>
  <h1 class="my-location-title">您的位置</h1>
  <div class="my-location-city">
    <div class="my-city">{{myCity || '北京'}}</div>
  </div>
  <h1 class="my-hotcity-title">热门城市</h1>
  <div class="hot-cities">
    <div class="hot-city-list">
      <div v-for="city in hotCities" :key="city.id" @click="changeCity(city.name)">{{city.name}} </div>
    </div>
    <div class="letters">
      <div v-for="(item,letter) in cities" @click="scrollToLetterCity(letter)">{{letter}}</div>
    </div>
  </div>
  <!-- 清除浮动 -->
  <div style="clear: both;"></div>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <!-- 字母列表城市 -->
      <div v-for="(letterCity,letter,index) in cities" :key="index" :ref="letter">
        <!-- 每个字母 -->
        <h1 class="letter-city">{{ letter }}</h1>
        <!-- 某个字母的城市列表 -->
        <ul style="background:#fff;" >
          <li v-for="city in cities[letter]" :key="city.id" class="city-by-letter">{{ city.name }}</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapGetters,mapActions } from 'vuex'
export default {
  name: "City",
  data(){
    return{
      // cities: [],
      // hotCities:[]
      myCity: ''
    }
  },
  methods:{
    scrollToLetterCity(letter){
      //滚动到哪个dom元素
      let letterElement = this.$refs[letter][0]
      //console.dirxml(letterElement)
      this.scroll.scrollToElement(letterElement,1000)
    },
    changeCity(cityName){
      localStorage.myCity = cityName;
      this.myCity = cityName;
    },
    backHome(){
      //加载所选城市的热销推荐和周末去哪儿的景点数据
      this.getHomeList(this.myCity)
      //导航到首页
      this.$router.push('/')
    },
    //将vue中 action 中定义的函数映射为组件的method
    ...mapActions(['getHotCities','getHomeList'])
  },
  computed:{
    // 将展开数组
    ...mapGetters(['cities','hotCities']),
  },
  mounted() {
    if (localStorage.myCity){
      this.myCity = localStorage.myCity
    }
    //调用Vuex中City模块的action方法
    this.getHotCities();
    // 这种方式也可以调到 Vuex 中的 action 函数，一般会在组件的点击操作的时候用
    //  this.$store.dispatch('getHotCities')

    let wrapper = document.querySelector(".wrapper")
    this.scroll = new BScroll(wrapper)
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/variables.styl"
@import "~styles/mixins.styl"
.city
  height 300px
  background #eaeaea
  .city-header
    display flex  // 弹性盒子模型
    flex-direction column //盒子内元素列排
    background: $bgColor
    color white
    .header-title
      display flex
      flex-direction row //盒子内元素行排（默认）
      justify-content center
      align-items center //盒子内元素垂直居中
      height 60px
      .back-icon
        font-size 20px
        padding-left 5px
      .select-city-title
        flex 1
        text-align center
        font-size 16px
        font-weight bold
    .header-input-bar
      display flex
      margin 5px
      .header-input
        flex 1
        border 0px
        height 30px
        border-radius 4px
        background: #fff;
        text-align center
        font-size 16px
  .my-location-title,.my-hotcity-title,.letter-city
    padding 10px
    font-size 18px
    color $descTextColor
  .hot-cities
    position relative
    float left
    width 100%
    background: #fff;
    .hot-city-list
      float left
      display grid
      grid-template-columns: repeat(3, 1fr); /* fr 单位是一个自适应单位*/
      grid-auto-rows: minmax(25px, auto);
      width 94%
      //border 1px solid red
      padding-top 4px
      padding-bottom 4px
    .hot-city-list > div
      city() // mixins.styl中定义的 stylus 函数
    .letters
      position fixed
      right 1px
      width 2%
      padding-right 10px
      padding-top 10px
      text-align right
      font-size 16px
      color $bgColor
    .letters > div
      height 20px
  .wrapper
    height 500px
    .content /* 滚动内容 */
      .letter-city
        height 18px
        line-height 18px
        vertical-align center
        background: #eaeaea
      .city-by-letter
        height 30px
        line-height 30px
        border-bottom 1px solid #eaeaea
        padding-left 15px
        font-size 16px
        color $darkTextColor
  .my-location-city /* 我的城市 */
    display flex
    align-items center
    height 50px
    background #fff
    .my-city
      width 100px
      height 25px
      line-height 25px
      margin-left 10px
      border 1px solid #d4d2d2
      border-radius 3px
      text-align center //文字水平居中
      vertical-align middle //文字垂直居中
      font-size 16px
      color $darkTextColor
</style>
