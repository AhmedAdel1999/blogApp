import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const initialState = {
  posts:[],
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  status: 'idle',
};


export const ourPosts =createAsyncThunk(
  "post/ourPosts",
  async(str,{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await axios.get(`http://localhost:5000/api/posts${str}`)
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
      let response = await axios.post(`http://localhost:5000/api/posts`, newpost)
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
      let response = await axios.put(`http://localhost:5000/api/posts/${id}`, newpost)
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
    let response = await axios.delete(`http://localhost:5000/api/posts/${id}`,{data:{username}})
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
    })
  },
  extraReducers:{
    //creating
    [CreatePost.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.isError=false
      state.successMsg="Post Was Created!"
    }),
    [CreatePost.rejected]:((state,action)=>{
      state.isSuccess=false;
      state.isError=true
      state.errorMsg="Post Was Not Created!"
    }),

    //updating
    [UpdatePost.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.isError=false
      state.successMsg="Post Was Updated!"
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
export const{ clearState } = postSlice.actions
export default postSlice.reducer;
