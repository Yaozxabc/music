/**
 * Created by Administrator on 2018/10/16.
 */
export function shuffle(arr){
  let _arr=arr.slice();//建立数组副本，防止更改原先序列
  for(let i=0;i<_arr.length;i++){
    let j= getRandomInt(0,i);//随机生成0到当前索引的值
    let t =_arr[i];//设置当前索引值赋值给变量t
    _arr[i]=_arr[j];//当前索引与随机生成的数值位置进行交换
    _arr[j]=t;
  }
  return _arr;
}//随机生成一个数，然后遍历数组，轮流与arr[i]交换


function getRandomInt(min,max){
  return Math.floor(Math.random()* (max - min + 1) + min)
}//获取指定值中最大到最小的值的随机数；math.random随机生成0-1中的小数
