import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../components/utils/baseUrl';
const initialState = {
  userInfo:{},
  isError:false,
  isSuccess:false,
  isLoading:false,
  errMessage:"",
  status: 'idle',
};


export const register =createAsyncThunk(
  "user/register",
  async(values,{ rejectWithValue,fulfillWithValue })=>{
    try {
      let response = await axiosInstance.post(`/api/auth/register`,values)
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
      let response = await axiosInstance.post(`/api/auth/login`,values)
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
      let response = await axiosInstance.put(`/api/users/${id}`,user)
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
      let response = await axiosInstance.get(`/api/users/${id}`)
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
    }),
    imgUpload:((state)=>{
      state.isLoading=true
    })
  },
  extraReducers:{
  
    //register user
    [register.pending]:((state)=>{
      state.isLoading=true
    }),
    [register.fulfilled]:((state)=>{
      state.isSuccess=true
      state.isLoading=false
    }),
    [register.rejected]:((state,action)=>{
      state.isLoading=false
      state.isError=true
      state.errMessage=action.payload.error
    }),

    //login user
    [login.pending]:((state)=>{
      state.isLoading=true
    }),
    [login.fulfilled]:((state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.userInfo={...action.payload}
    }),
    [login.rejected]:((state,action)=>{
      state.isLoading=false
      state.isError=true
      state.errMessage=action.payload.error
    }),

    //get user info
    [UserInfo.fulfilled]:((state,action)=>{
      state.userInfo={...action.payload}
    }),

    //update user info
    [updateProfile.pending]:((state)=>{
      state.isLoading=true
    }),
    [updateProfile.fulfilled]:((state,action)=>{
      console.log(action.payload)
      state.isSuccess=true
      state.isLoading=false
    }),
    [updateProfile.rejected]:((state,action)=>{
      console.log(action.payload)
      state.isError=true
      state.isLoading=false
    }),
  },
});

export const {logout,clearState,imgUpload}=userSlice.actions
export default userSlice.reducer;
