/**
 * Created by Administrator on 2018/8/25.
 */
import {options,commonParams,err_ok} from 'res/api/config'
import Jsonp from 'res/scripts/jsonp.js'

export function getRecommend(){//自定义获取jsonp数据的处理方法
  const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';//请求地址
  const data=Object.assign({},commonParams)//合并处理后的数据对象属性,以及传入的属性值
 return Jsonp(url,data,options)
}
  //https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1535186832583
  //https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1535186832583
