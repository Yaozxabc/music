/**
 * Created by Administrator on 2018/9/7.
 */
export const singer=state=>state.singer

export const playing=state=>state.playing

export  const fullScreen=state=>state.fullScreen

export  const playlist=state=>state.playlist

export  const sequencelist=state=>state.sequencelist

export  const mode=state=>state.mode

export  const  curIndex=state=>state.curIndex

export  const curSong=(state)=>{
  return state.playlist[state.curIndex] || {}
}
