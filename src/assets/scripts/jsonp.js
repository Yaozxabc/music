import originJsonp from 'jsonp'
//原生jsonp为jsonp（url，option，fn）
//其中url为访问地址，options为选项，包括param=>返回方法，fn为回调函数

export default function Jsonp(url,data,option){
  //url为请求地址
  //data为后端传递回来的参数对象
  //option为选项

  url +=(url.indexOf('?')<0?'?':'&')+param(data)
  return new Promise((resolve,reject)=>{
    originJsonp(url,option,(error,data)=>{
      if(!error){
        resolve(data)
      }else{
        reject(error)
      }
    })
  })
}

function param(data){//data为传入的对象
  let url='';
  for(var k in data ){//k为data对象的属性名
    let value=data[k]!==undefined?data[k]:'';//循环遍历data对象的属性，如果定义的对象值为未定义，则设为空
    url +=`&${k}=${encodeURIComponent(value)}`//拼接属性及其属性值，并利用encodeURIComponent对属性值进行转码
  }
  return url?url.substring(1):""//返回url，并对url的首字符‘&’进行切除
}
