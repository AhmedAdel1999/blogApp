import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../components/utils/baseUrl';
const initialState = {
  categories:[],
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  status: 'idle',
};

export const createCategory =createAsyncThunk(
  "category/createCategory",
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      let response = await axiosInstance.post("/api/categories",{...obj})
      return fulfillWithValue(await response.data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const updateCategory =createAsyncThunk(
  "category/updateCategory",
  async({id,name},{rejectWithValue,fulfillWithValue})=>{
    try {
      let response = await axiosInstance.put(`/api/categories/${id}`,{...name})
      return fulfillWithValue(await response.data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const deleteCategory =createAsyncThunk(
  "category/deleteCategory",
  async(id,{fulfillWithValue,rejectWithValue})=>{
    try {
      let response = await axiosInstance.delete(`/api/categories/${id}`)
      return fulfillWithValue(await response.data)
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
export const ourCategory =createAsyncThunk(
  "category/ourCategory",
  async()=>{
    try {
      let response = await axiosInstance.get(`/api/categories`)
      return await response.data
    } catch (error) {
      return (error.response)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearState:((state)=>{
      state.isError=false
      state.isSuccess=false
      state.successMsg=""
      state.errorMsg=""
    })
  },
  extraReducers:{
    
    //create category
    [createCategory.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.successMsg="A New Category Has Been Created!"
    }),
    [createCategory.rejected]:((state,action)=>{
      state.isError=true;
      state.errorMsg=`${action.payload.data.msg}!`
    }),

    //update category
    [updateCategory.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.successMsg="Category Has Been Updated!"
    }),
    [updateCategory.rejected]:((state,action)=>{
      state.isError=true;
      state.errorMsg=`${action.payload.data.msg}!`
    }),

    //delete category
    [deleteCategory.fulfilled]:((state)=>{
      state.isSuccess=true;
      state.successMsg="Category Has Been Deleted!"
    }),
    [deleteCategory.rejected]:((state)=>{
      state.isError=true;
      state.errorMsg="Error!! Failed To Delete Category!"
    }),

    //get all categories
    [ourCategory.fulfilled]:((state,action)=>{
      state.categories=[...action.payload]
    }),
  },
});

export const { clearState } = categorySlice.actions
export default categorySlice.reducer;
