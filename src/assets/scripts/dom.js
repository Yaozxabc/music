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
