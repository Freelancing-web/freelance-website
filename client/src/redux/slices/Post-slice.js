import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


// export const getPosts =  createAsyncThunk('post/posts',async()=>{
//     try {
//         const {data}  = await axios.get('/api/posts/user-posts')
//         if(data.error){
//             console.log('error post',error)
//             return []
//         }
//         return data
//     } catch (error) {
//         return error.message
//     }
// })
const initialState  = {
    loading:false,
    posts:[],
    error:null
}

const postSlice  = createSlice({
    name:'post',
    initialState,
    reducers:{

        getPostsSuccess:(state,action)=>{
            state.error  =   null, 
            state.posts = action.payload , 
            state.loading  = false
        },
        getPostsPending:(state,action)=>{
            state.error  =   null, 
            state.loading  = true
        },
        getPostsFail:(state,action)=>{
            state.error  =   action.payload, 
             
            state.loading  = false
        }
    }
    ,
    // extraReducers:(builder)=>{
    //     builder.addCase(getPosts.pending,(state)=>{
    //         state.loading = true,
    //         state.error = null
    //     })
    //     .addCase(getPosts.fulfilled,(state,action)=>{
    //         state.posts = action.payload,
    //         state.loading = false
            
    //     })
    //     .addCase(getPosts.rejected,(state,action)=>{
    //         state.loading =false,
    //         state.posts = action.error
    //     })
    // }
})

export const {getPostsPending,getPostsSuccess,getPostsFail}  = postSlice.actions
export default  postSlice.reducer