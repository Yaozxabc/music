/**
 * Created by Administrator on 2018/9/1.
 */
import {commonParams,options} from 'res/api/config'
import Jsonp from 'res/scripts/jsonp.js'

export function getSinger(){
  var params=getData(out)
  const url='https://u.y.qq.com/cgi-bin/musicu.fcg?callback=getUCGI44460870518583806&g_tk=5381&jsonpCallback=getUCGI44460870518583806&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A10000%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D'
  const odata=Object.assign({},commonParams)
  return Jsonp(url,odata,options)
}

const out={
  data:{
    comm:{
      ct:24,
      cv:10000},
    singerList:{
      module:"Music.SingerListServer",
      method:"get_singer_list",
      //param:{
      //  area:200,
      //  sex:0,
      //  genre:-100,
      //  index:-100,
      //  sin:0,
      //  cur_page:1
      //}
    }
  }
}
function param(data){//data为传入的对象
  let url='';
  for(var k in data ){//k为data对象的属性名
    let value=data[k]!==undefined?data[k]:'';//循环遍历data对象的属性，如果定义的对象值为未定义，则设为空
    url +=`&${k}=${encodeURIComponent(value)}`//拼接属性及其属性值，并利用encodeURIComponent对属性值进行转码
  }
  return url?url.substring(1):""//返回url，并对url的首字符‘&’进行切除
}

function getData(data){
  var str=""
  for(var i in data){
  if(typeof (data[i])==='object'){
    for(var j in data[i]){
        str+=param(data[i][j])
    }
  }else{
    str+=param(data[i])
  }
  }
  return str;
}
