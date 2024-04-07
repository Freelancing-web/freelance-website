
import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
    currentUser:null,
    error:false,
    loading:false

}
const userSlice  = createSlice({
    name:'use',
        initialState:initialState,
        reducers:{
            signInStart:(state)=>{
                state.loading =  true 
            },
            signInSuccess:(state,action)=>{
                console.log('hello ',action.payload.data)
                state.currentUser = action.payload
                state.loading =  false , 
                state.error = null
                // console.log("login function ", userData, expiresIn);
                // const expirationTime = new Date().getTime() + action.payload.data.expiresIn * 1000;
                // localStorage.setItem("ExpireTime", expirationTime.toString());
                // localStorage.setItem("USER", JSON.stringify(action.payload));
                // const user  =  localStorage.getItem('USER')
                // state.currentUser   = JSON.parse(user) || null
            },
         
            signInFailure:(state,action)=>{
                state.loading =  false,
                state.error = action.payload
            },
            signout:(state)=>{
                state.currentUser =  null
            }
        }
})

export const {signInFailure,signInSuccess,signInStart,signout} =  userSlice.actions
export default userSlice.reducer