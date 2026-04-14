import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const initialState ={
    isLoading: false,
    productList: [],
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (formData)=>{
        const result = await axios.post(`${API}/api/admin/products/addProduct`, formData,{
            headers : {
                'Content-Type':'application/json',
            }
        })
        return result?.data;
    }
);


export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts',
    async ()=> {
        const result = await axios.get(`${API}/api/admin/products/getProducts`)
        return result?.data;
    }
);


export const editProduct = createAsyncThunk('/products/editProduct',
    async ({id,formData})=>{
        const result = await axios.put(`${API}/api/admin/products/editProduct/${id}`,
        formData,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
        return result?.data;
    }
);


export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id)=>{
        const result = await axios.delete(`${API}/api/admin/products/deleteProduct/${id}`)
        return result?.data;
    }
);

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder.addCase(fetchAllProducts.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state,action)=>{
            state.isLoading=false;
            state.productList = action.payload.data;
        }).addCase(fetchAllProducts.rejected, (state,action)=>{
            state.isLoading=false;
            state.productList = [];
        })
    }
})

export default AdminProductSlice.reducer;