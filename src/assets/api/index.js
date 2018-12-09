/**
 * Created by Administrator on 2018/8/26.
 */
import {commonParams} from 'res/api/config.js'
import {param} from  'res/scripts/jsonp'
const data=Object.assign({},commonParams)
const playdata=Object.assign({},commonParams,{
  picmid:1,
  rnd:0.3062479912884237,
  format:'jsonp',
  notice:0,
  platform:'yqq',
  needNewCode:0,
  categoryId:10000000,
  sortId:5,
  sin:0,
  ein:29,
})
const singerData=Object.assign({},commonParams,{
  g_tk:5381,
  loginUin:0,
  hostUin:0,
  inCharset:'utf8',
  outCharset:'utf-8',
  notice:0,
  platform:'yqq',
  needNewCode:0
})
const playlistData=Object.assign({},commonParams,{
  platform: 'yqq',
  hostUin: 0,
  sin: 0,
  ein: 29,
  sortId: 5,
  needNewCode: 0,
  categoryId: 10000000,
  rnd: Math.random(),
  format: 'json' // 将format从jsonp修改为json
})

export default{
  // 产品相关操作
  sliderList:'/api'+'/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'+param(data), // 产品列表
  playlists:'/playlist'+"/music/api/getDiscList?"+param(playlistData), // 歌单列表
  singerList:'/singer'+'/cgi-bin/musicu.fcg?'+param(singerData), // 歌手列表
  disclist:"/disclist"+"/music/api/getCdInfo?", // 社区相关操作
  rankList:'/ranklist'+'/v8/fcg-bin/fcg_myqq_toplist.fcg?',
  topList:'/ranklist'+'/v8/fcg-bin/fcg_v8_toplist_cp.fcg?',
  articleList:'/api/article/articleList', // 文章列表
  articleListDetails:'/api/article/productDetails', // 文章详情
  articleListCount:'/api/article/productCount', // 文章总数
  articleMark:'/api/article/articleMark', // 文章点赞
  articleCollect:'/api/article/articleCollect'  //文章收藏
}
