import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const initialState = {
  userInfo:{},
  isError:false,
  isSuccess:false,
  errMessage:"",
  status: 'idle',
};


export const register =createAsyncThunk(
  "user/register",
  async(values,{ rejectWithValue,fulfillWithValue })=>{
    try {
      let response = await axios.post(`http://localhost:5000/api/auth/register`,values)
      let data = await response.data
      return fulfillWithValue(data)
    }catch(error){
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)

export const login =createAsyncThunk(
  "user/login",
  async(values,{ rejectWithValue,fulfillWithValue })=>{
    try {
      let response = await axios.post(`http://localhost:5000/api/auth/login`,values)
      let data = await response.data
      console.log(data)
      return fulfillWithValue(data)
    }catch(error){
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateProfile =createAsyncThunk(
  "user/updateProfile",
  async({id,user},{ rejectWithValue,fulfillWithValue })=>{
    try {
      let response = await axios.put(`http://localhost:5000/api/users/${id}`,user)
      let data = await response.data
      console.log(data)
      return fulfillWithValue(data)
    }catch(error){
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)
export const UserInfo =createAsyncThunk(
  "user/UserInfo",
  async(id,{ rejectWithValue,fulfillWithValue })=>{
    try {
      let response = await axios.get(`http://localhost:5000/api/users/${id}`)
      let data = await response.data
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout:((state)=>{
      state.userInfo={};
    }),
    clearState:((state)=>{
      state.isError=false
      state.isSuccess=false
      state.errMessage=""
    })
  },
  extraReducers:{
  
    //register user
    [register.fulfilled]:((state)=>{
      state.isSuccess=true
    }),
    [register.rejected]:((state,action)=>{
      state.isError=true
      state.errMessage=action.payload.error
    }),

    //login user
    [login.fulfilled]:((state,action)=>{
      state.isSuccess=true
      state.userInfo={...action.payload}
    }),
    [login.rejected]:((state,action)=>{
      state.isError=true
      state.errMessage=action.payload.error
    }),

    //get user info
    [UserInfo.fulfilled]:((state,action)=>{
      state.userInfo={...action.payload}
    }),

    //update user info
    [updateProfile.fulfilled]:((state,action)=>{
      console.log(action.payload)
      state.isSuccess=true
    }),
    [updateProfile.rejected]:((state,action)=>{
      console.log(action.payload)
      state.isError=true
    }),
  },
});

export const {logout,clearState}=userSlice.actions
export default userSlice.reducer;
