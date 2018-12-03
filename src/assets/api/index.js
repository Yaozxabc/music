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
const discData=Object.assign({},commonParams,{
  type:"1",
  json:"1",
  utf8:"1",
  onlysong:"0",
  disstid:"4804070615",
  jsonpCallback:"playlistinfoCallback",
  loginUin:0,
  hostUin:0,
  inCharset:'utf8',
  outCharset:'utf-8',
  notice:0,
  platform:'yqq',
  needNewCode:0,
})
export default{
  // 产品相关操作
  sliderList:'/api'+'/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'+param(data), // 产品列表
  disclists:'/disc'+"/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?"+param(discData), // 产品详情
  singerList:'/singer'+'/cgi-bin/musicu.fcg?'+param(singerData), // 歌手列表
  // 社区相关操作
  articleList:'/api/article/articleList', // 文章列表
  articleListDetails:'/api/article/productDetails', // 文章详情
  articleListCount:'/api/article/productCount', // 文章总数
  articleMark:'/api/article/articleMark', // 文章点赞
  articleCollect:'/api/article/articleCollect'  //文章收藏
}
