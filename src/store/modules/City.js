import axios from "axios";

const state = {
  recommendList: [],
  weekendList: [],
  cities: {},
  hotCities: []
}

/*
负责发ajax 请求与后端的 api 服务系统交互，获得数据后提交给mutations
Actions 类似于 mutations，不同在于：
  (1) Action 提交的是 mutation，而不是直接变更状态。
  (2) Action 可以包含任意异步操作。
*/
const actions = {
  // {commit} 意思是从context对象中将 commmit 函数解构
  getHotCities({commit}){
    axios.get('/api/china_city_data.json')
      .then((respone)=>{
        //console.log(respone.data.data)
        commit('storeHotCities',respone.data.data)
      })
      .catch(err => {
        new Error(err)
      })
  },
  getHomeList({commit},myCity){
    let requestPath = ''
    if (myCity==='重庆'){
      requestPath = '/api/index_chongqing.json'
    }else {
      requestPath = '/api/index.json'
    }
    //加载首页热销推荐和周末去哪儿的景点数据列表数据
    axios.get(requestPath)
      .then(response =>{
        const  data  = response.data.data
        commit('storeHomeList',data)
      })
      .catch(err => {
        throw new Error(err)
      })

  }
}
const mutations = {
  /*将数据存储到Vue的state对象中
  * state vuex中的state对象，data action提交过来的数据
  * */
  storeHotCities(state,data){
    state.hotCities = data.hotCities
    state.cities = data.cities
  },
  // 存储返回首页使的数据
  storeHomeList(state,data){
    state.recommendList = data.recommendList
    state.weekendList = data.weekendList
  }
}

const getters = {
  recommendList: (state) => {
    return state.recommendList
  },
  weekendList: (state) => {
    return state.weekendList
  },
  cities: (state) => {
    return state.cities
  },
  hotCities: (state) => {
    return state.hotCities
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
