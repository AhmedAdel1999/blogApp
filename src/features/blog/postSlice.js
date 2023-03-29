import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../components/utils/baseUrl';
const initialState = {
  posts:[],
  isError:false,
  isSuccess:false,
  isLoading:false,
  errorMsg:"",
  successMsg:"",
  status: 'idle',
};


export const ourPosts =createAsyncThunk(
  "post/ourPosts",
  async(str,{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await axiosInstance.get(`/api/posts${str}`)
      let data = await response.data
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const CreatePost =createAsyncThunk(
  "post/CreatePost",
  async(newpost,{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await axiosInstance.post(`/api/posts`, newpost)
      let data = await response.data
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const UpdatePost =createAsyncThunk(
  "post/UpdatePost",
  async({id,newpost},{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await axiosInstance.put(`/api/posts/${id}`, newpost)
      let data = await response.data
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const deletePost =createAsyncThunk(
  "post/deletePost",
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const{id,username}=obj
    let response = await axiosInstance.delete(`/api/posts/${id}`,{data:{username}})
    let data = await response.data; 
    return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearState:((state)=>{
      state.isError=false;
      state.isSuccess=false;
      state.successMsg="";
      state.errorMsg="";
    }),
    imgUpload:((state)=>{
      state.isLoading=true
    })
  },
  extraReducers:{
    //creating
    [CreatePost.pending]:((state)=>{
      state.isLoading=true
    }),
    [CreatePost.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.isLoading=false;
      state.isError=false
      state.successMsg="Post Was Created!"
    }),
    [CreatePost.rejected]:((state,action)=>{
      state.isSuccess=false;
      state.isLoading=false;
      state.isError=true
      state.errorMsg="Post Was Not Created!"
    }),

    //updating
    [UpdatePost.pending]:((state)=>{
      state.isLoading=true
    }),
    [UpdatePost.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.isLoading=false
      state.isError=false
      state.successMsg="Post Was Updated!"
    }),
    [UpdatePost.rejected]:((state)=>{
      state.isLoading=false
    }),

    //deleting
    [deletePost.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.isError=false
      state.successMsg="Post Was Deleted!"
    }),

    //getting posts
    [ourPosts.fulfilled]:((state,action)=>{
      state.posts=[...action.payload]
    }),


  },
});
export const{ clearState,imgUpload } = postSlice.actions
export default postSlice.reducer;
