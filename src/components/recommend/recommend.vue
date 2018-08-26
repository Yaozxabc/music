<template>
<div>
    <slider>
      <div v-if="recommend.length" v-for="item in recommend">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt=""/>
        </a>
      </div>
    </slider>
</div>
</template>

<script type="text/ecmascript-6">
  import slider from 'base/slider'
    export default{
        data(){
            return {
              recommend:[]
            }
        },
  components:{
    slider
  },
  methods:{
    _getcommend(){
      getRecommend().then((res)=>{
        alert(res.data.code)
        if(res.code===err_ok){

        }else{
          alert('dda')
        }
      })

    },
    _getJson(){
      getRecommendJson().then((res)=>{
        alert(res)
      })
    },
    _getData(){
      this.$http.get(this.$api.index.productList).then((res)=> {
        var oData = res.data
        if (oData.code == 0) {
          this.recommend=oData.data.slider
        }
      })
    }
  },
  created(){
    this._getData()
  },
  mounted(){

  }
    }
</script>


<style scoped>

</style>
