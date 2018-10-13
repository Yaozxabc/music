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
    this.singer=singer;
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
    url:`http://157.255.154.152/amobile.music.tc.qq.com/C400003OUlho2HcRHC.m4a?guid=7160149260&vkey=987FA3252B46B3389DB281EE667EFF8D38BB5DE59ADC61C6B008B65DA394E0B0BC18CC737F59BE8B711314C35A745F15D6105B1CBAFBCD82&uin=0&fromtag=66`
    //http://isure.stream.qqmusic.qq.com/C400001J5QJL1pRQYB.m4a?guid=7160149260&vkey=1F257C8870B2CE1564A78CFC97784220BBACBFE97D007A41D343B306ED724DD0FF5B50666F8EB8DC3D38D260191DF4AFF07A3E2807780889&uin=0&fromtag=66
    //  http://dl.stream.qqmusic.qq.com/C400001zMQr71F1Qo8.m4a?guid=7160149260&vkey=DCC8A921F68AB85734D36BE6E7CED31B0BF5595EC896346C3CB0C8762789511ECD2F20F37A41170EA8DCBAA3BB9FE15E8348F9EB877716FB&uin=0&fromtag=66
    //  http://112.90.152.148/amobile.music.tc.qq.com/C400003OUlho2HcRHC.m4a?guid=7160149260&vkey=1620DFF6F90B5EE0968AC8A5D8A699DCA3EFC4C8BED3834E6AF0DC3BA9770CF8DD06B85F5C8F1DE1C64EBAD65FA1522149694449F9141C01&uin=0&fromtag=66
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
 const url='https://u.y.qq.com/cgi-bin/musicu.fcg?'
  const data=Object.assign({},commonParams,{
    callback:'getplaysongvkey013206165477022802',
    g_tk:5381,
    format:'jsonp',
    loginUin:0,
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    data:`{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7160149260","songmid":[${musicData.songmid}],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}`
  })
  const option={
    param:'jsonpCallback',
    prefix:'getplaysongvkey013206165477022802'
  }
var self=Jsonp(url,data).then((res)=>{

  })
}
