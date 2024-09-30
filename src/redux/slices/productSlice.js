import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
export const fectchAllProducts = createAsyncThunk("products/fetchAllProducts",async()=>{
    const result = await axios.get("https://dummyjson.com/products")
    console.log(result.data.products);
    sessionStorage.setItem("allProducts",JSON.stringify(result.data.products))
    return result.data.products//used to store data in session storage of browser
})

const productSlice = createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        dummyAllProducts:[],
        loading : false,
        error: ""
    },
    reducers:{
        //search product action
        searchProduct:(state,actionFromHeader)=>{
        state.allProducts =  state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(actionFromHeader.payload))
        }

    },
    extraReducers : (builder)=>{
        builder.addCase(fectchAllProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload
            state.dummyAllProducts=apiResult.payload
            state.loading = false
            state.error = ""
        })
        builder.addCase(fectchAllProducts.pending,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts=[]
            state.loading= true
            state.error = ""
        })
        builder.addCase(fectchAllProducts.rejected,(state,apiResult)=>{
            state.allProducts = []
            state.dummyAllProducts=[]
            state.loading= false
            state.error = "API Call failed ... please try after sometime !!!"
        })

    }
})

export const {searchProduct} = productSlice.actions
export default productSlice.reducer