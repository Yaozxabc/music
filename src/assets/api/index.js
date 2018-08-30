/**
 * Created by Administrator on 2018/8/26.
 */
import {commonParams} from 'res/api/config.js'

function param(data){//data为传入的对象
  let url='';
  for(var k in data ){//k为data对象的属性名
    let value=data[k]!==undefined?data[k]:'';//循环遍历data对象的属性，如果定义的对象值为未定义，则设为空
    url +=`&${k}=${encodeURIComponent(value)}`//拼接属性及其属性值，并利用encodeURIComponent对属性值进行转码
  }
  return url?url.substring(1):""//返回url，并对url的首字符‘&’进行切除
}
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

export default{
  // 产品相关操作
  sliderList:'/api'+'/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'+param(data), // 产品列表
  playlists:'/music'+"weapi/v3/playlist/detail", // 产品详情
  productCount:'/api/product/productCount', // 产品种数
  // 社区相关操作
  articleList:'/api/article/articleList', // 文章列表
  articleListDetails:'/api/article/productDetails', // 文章详情
  articleListCount:'/api/article/productCount', // 文章总数
  articleMark:'/api/article/articleMark', // 文章点赞
  articleCollect:'/api/article/articleCollect'  //文章收藏
}
