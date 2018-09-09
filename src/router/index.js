import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'com/recommend/recommend'
import Rank from 'com/rank/rank'
import Search from 'com/search/search'
import Singer from 'com/singers/singers'
import SingerDetail from  'com/singerDetail/singerDetail'


Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[
        {
          path:':id',
          component:SingerDetail
        }
      ]
    }
  ]
})
