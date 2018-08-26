import  $ from 'jquery'

export  function getJson(url,data){
  url +=(url.indexOf('?')<0?'?':'&')+param(data)
  return new Promise((resolve,reject)=>{
      var ws = new WebSocket(url);
      ws.onopen = function(evt) {
        console.log("Connection open ...");
        ws.send("Hello WebSockets!");
      };
      ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        ws.close();
      };
      ws.onclose = function(evt) {
        console.log("Connection closed.");
      };


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
