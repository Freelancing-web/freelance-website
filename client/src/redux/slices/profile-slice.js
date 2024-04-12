import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
   
    profileInfo :{},
    loading:false

}

const profileInfo = createSlice({

    name:'profile',
    initialState,
    reducers:{
        addProfile:(state,action)=>{
            state.profileInfo =  action.payload,
            state.loading  = false,
            state.error = null
        },
        addProfileFailied:(state,action)=>{
            state.loading = false,
            state.error = action.error.payload
        
        },
        addProfileInfoStart:(state)=>{
            state.loading = true,
            state.error = null
        }
    },
  
})

export const {addProfile,addProfileFailied,addProfileInfoStart} =  profileInfo.actions
export default profileInfo.reducer