import {createSlice} from '@reduxjs/toolkit'
 const Users=createSlice({
    name:"Users", 
    initialState: {
        userName:'',
        Email:'',   
        password:'',
        user:null
    }, 
    reducers:{
        setEmail:(state,action)=>{
            state.Email = action.payload
        },
        setName:(state,action)=>{ 
            state.userName = action.payload
        },
        setPassword:(state,action)=>{
            state.password = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        
    }
})
export const{setEmail, setName,setPassword,setUser} =Users.actions
export default Users.reducer