/**
 * Created by Administrator on 2018/9/9.
 */
import Jsonp from 'res/scripts/jsonp'
import {options,commonParams,ERR_ok} from 'res/api/config'
export default class song{
  constructor({id,mid,singer,url,name,album,duration,image}){
    this.id=id;
    this.mid=mid;
    this.url=url;
    this.name=name;
    this.album=album;
    this.duration=duration;
    this.image=image;
  }
}
//设计成类的两大好处，
// 1、可以集中于一个地方维护，不需要在大量地方写相同代码
//2、类的拓展性要比对象好，属于面向对象的编程
export function createSong(musicData){
  return new song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://isure.stream.qqmusic.qq.com/C400${musicData.strMediaMid}.m4a?vkey=`+getVkey(musicData)+`guid=3022422968&fromtag=66`
    //http://isure.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?91C3C7A352B41E7F84C676FB4E96ADBF3615D6B5C66A94BDED424116C364D5198F52724A79EA87762C8E058F1A2A9E58236A2755D4BE78EA&guid=3022422968&uin=0&fromtag=66

  })
}

function filterSinger(singers){
  let ret=[];
  if(!singers){
    return;
  }
  singers.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}
//过滤歌手，如果一首歌有多名歌手，则从歌手数组中取出他们的名字，然后用/进行连接
export function getVkey(musicData){
 const url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&jsonpCallback=MusicJsonCallback14232947155777964&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback14232947155777964&uin=0&songmid=003OUlho2HcRHC&filename=C400003OUlho2HcRHC.m4a&guid=3022422968'
  const data=Object.assign({},commonParams,{
    //jsonpCallback:
    notice:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    uin:0,
    songmid:musicData.songmid,
    filename:`C400${musicData.strMediaMid}.m4a`,
    guid:3022422968
  })
  //const option={
  //  param:'jsonpCallback',
  //  prefix:'MusicJsonCallback5523773015595799'
  //}
var self=Jsonp(url,data).then((res)=>{
  var name=res.data.items
return res.data.items
  })
  return name;
}
