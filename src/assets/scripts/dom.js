/**
 * Created by Administrator on 2018/8/26.
 */
export function addClass(el,className){

  if(hasClass(el,className)){
    return
  }else{
    var newClassName=el.className.split(' ');
    newClassName.push(className);
    el.className=newClassName.join(' ');
  }
}
export function hasClass(el,className){
  var Reg=new  RegExp(/^|\\s/+className+/\\s$/)
  return Reg.test(el.className)
}
export  function getData(el,name,val){
  const prefix='data-';
  name=prefix+name;
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name)
  }

}

let elementStyle=document.createElement('div').style//能力检测

let vendor=(()=>{ //浏览器供应商
 let transformNames={
   webkit:'webkitTransfrom',
   Moz:'MozTransform',
   O:'OTransform',
   ms:"msTransform",
   standard:'transform'
 }
  for(let key in transformNames){
    if(elementStyle[transformNames[key]]!==undefined){
      return key
    }
  }
return false;
})()

export  function prefixStyle(style){//对transform动画进行封装
  if(vendor === false){
    return false
  }
  if(vendor ==='standard'){
    return style
  }
return vendor + style.charAt(0).toUpperCase() +style.substr(1)
}
export  function debounce(fn,delay){
  let timer;
  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    timer=setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}
