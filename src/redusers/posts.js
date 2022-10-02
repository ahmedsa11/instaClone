import {createSlice} from '@reduxjs/toolkit'
 const posts=createSlice({
    name:"posts",
    initialState: {
        post:[],
        userName:'',
        caption:'',
        imgeUrl:'',
        progress:''
    },
    reducers:{
        getposts:(state,action)=>{
            state.post=action.payload;
        },
        addPosts:(state,action)=>{
            state.post= action.payload;
        },
        
    }
})
export const{getposts, addPosts} =posts.actions
export default posts.reducer