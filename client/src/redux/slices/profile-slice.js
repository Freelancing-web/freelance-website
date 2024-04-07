// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//     error:null, 
//     profileInfo :{},
//     loading:false

// }

// const profileInfo = createSlice({

//     name:'profile',
//     initialState,
//     reducers:{
//         addProfile:(state,action)=>{
//             state.profileInfo =  action.payload,
//             state.loading  = false,
//             state.error = null
//         },
//         addProfileFailied:(state,action)=>{
//             state.loading = false,
//             state.error = action.error.payload
        
//         },
//         addProfileInfoStart:(state)=>{
//             state.loading = true,
//             state.error = null
//         }
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(getUserProfile.pending,(state)=>{
//             state.loading = true,
//             state.error = null
//         }).addCase(getUserProfile.fulfilled,(state,action)=>{
//             console.log('user information',action.payload)
//             state.loading = false,
//             state.error = null , 
//             state.profileInfo =  action.payload
//         }).addCase(getUserProfile.rejected,(state,action)=>{
//             state.loading = false,
//             state.error = action.error
          
//         })
//     }
// })

// export const {addProfile,addProfileFailied,addProfileInfoStart} =  profileInfo.actions
// export default profileInfo.reducer