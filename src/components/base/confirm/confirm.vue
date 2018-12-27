<template>
<transition name="confirm-fade" >
  <div class="confirm" v-show="showFlag">
    <div class="confirm_warpper">
      <div class="confirm_con">
        <p class="text">{{title}}</p>
        <div class="operate">
          <div @click="confirm" class="operate-btn left">{{sureBtnText}}</div>
          <div @click='cancel' class="operate-btn">{{cancelBtnText}}</div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
    export default{
      props:{
        title:{
          type:String,
          default:""
        },
        sureBtnText:{
          type:String,
          default:"确定"
        },
        cancelBtnText:{
          type:String,
          default:"取消"
        }
      },
        data(){
            return {
              showFlag:false
            }
        },
    methods:{
      show(){
        this.showFlag=true;
      },
      hidden(){
        this.showFlag=false;
      },
      cancel(){
        this.hidden()
        this.$emit('hide')
      },
      confirm(){
        this.hidden()
        this.$emit('confirm')
      }
    }
    }
</script>


<style scoped lang="scss">
  .confirm {position:fixed;left:0;right:0;top:0;bottom:0;z-index:998;background:rgba(0,0,0,.8);
      .confirm_warpper{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:998;
        .confirm_con{width:270px;border-radius:13px;background:#ddd;
          .text{padding: 19px 15px;line-height: 22px;text-align: center;font-size: $font-md-Size;}
          .operate{display:flex;align-items:center;text-align:center;
            .operate-btn{flex: 1;line-height: 22px;padding: 10px 0;border-top: 1px solid #00262c;color: #fff0e3;
              background: #006666;}
            .left{border-right: 1px solid #00262c;margin-right: 16px;}
          }
        }
      }
  }
  .confirm_warpper{animation: confirm-fadeIn .3s;}
  .confirm_con{animation: confirm-zoom .3s}
  @keyframes confirm-fadeIn {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes confirm-zoom {
    0%{
      transform: scale(0.5);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }

</style>
