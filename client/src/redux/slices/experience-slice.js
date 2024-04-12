import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    exp :[],
    loading:false,
    error:null

}

const expSlice = createSlice({

    name:'exp',
    initialState,
    reducers:{
        addExp:(state,action)=>{
            state.exp =  action.payload,
            state.loading  = false,
            state.error = null
        },
        addExpFailed:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        
        },
        addExpPending:(state)=>{
            state.loading = true,
            state.error = null
        }
    },
  
})

export const {addExp,addExpPending,addExpFailed} =  expSlice.actions
export default expSlice.reducer