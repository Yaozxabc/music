/**
 * Created by Administrator on 2018/12/24.
 */
/*用于存放storage相关逻辑信息*/
import  storage from 'good-storage'
const SEARCH_KEY='_search_'/*搜索key的值*/
const SEARCH_MAX_LENGTH=15 /*搜索做多的条目*/

function deleteSearch(arr,compare){
  let index=arr.findIndex(compare)
  if(index>-1){
    arr.splice(index,1)
  }
}

function insertArray(arr,val,compare,maxLen){
  const index=arr.findIndex(compare);//查找当前数组中是否存在某个元素，findIndex为
  if(index==0){
    return;
  }//如果是第一条数据，则不操作
  if(index>0){
    arr.splice(index,1)//如果当前数组后面有个元素，则删掉它
  }
  arr.unshift(val)//将值插入数组头部
  if(maxLen && arr.length >maxLen){
    arr.pop()
  }//如果当前数组有最大限制值，则删除超出条目

}/*arr:存入的数组，val：存入的值，compare：比较函数查找当前数组是否有某个元素，max：最大值*/
/*函数功能：判断要插入的值是否存在于数组中，如果存在则提前，不存在则插入，并删除超出的值*/
export  function saveSearch(query){
  let searches=storage.get(SEARCH_KEY,[])/*获取key值,如果有，则获取。无则返回空数组*/
  insertArray(searches,query,(item)=>{
    return item ===query
  },SEARCH_MAX_LENGTH)
  //搜索获取到的storage数组缓存，将当前查找的值传入去判断，如果存在返回,并设置最大条目15条
  storage.set(SEARCH_KEY,searches)//将当前重新搜索后的缓存值放入storage中
  return searches //返回缓存数组
}

export  function loadSearch(){
 return  storage.get(SEARCH_KEY,[])
}//加载搜索结果，以利于第一次使用时调用

export function deleteSearchHistory(query){
  let searches=storage.get(SEARCH_KEY,[]);
  deleteSearch(searches,(item)=>{
    return item ===query
  });
  storage.set(SEARCH_KEY,searches)
  return searches //返回缓存数组
}
//删除包含当前字符串的字符

export  function clearSearchHistory(){
  storage.remove(SEARCH_KEY)
  return [];
}
