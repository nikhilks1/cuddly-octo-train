import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        //add to cart
        addToCart:(state,actionFromView)=>{
           const existingProduct = state.find(item=>item.id==actionFromView.payload.id)
           if(existingProduct){
              const remainingProducts = state.fitler(item => item.id!=existingProduct.id)
              existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
              state=[...remainingProducts,existingProduct]
           }else{
              state.push({...actionFromView.payload,quantity:1,totalPrice:actionFromView.payload.price})
           }
        },
        //remove single item
        removeCartItem:(state,actionFromCart)=>{
            return state.filter(item=>item.id!=actionFromCart.payload)
        },
        //increment qty
         incQuantity:(state,actionFromCart)=>{
            const existingProduct = state?.find(item=>item.id==actionFromCart.payload)
            existingProduct.quantity++
            existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
            const remainingProducts=state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProducts,existingProduct]
         },
        //decrement qty 
       decQuantity:(state,actionFromCart)=>{
         const existingProduct = state?.find(item=>item.id==actionFromCart.payload)
         existingProduct.quantity--
         existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
         const remainingProducts=state.filter(item=>item.id!=existingProduct.id)
         state = [...remainingProducts,existingProduct]
      },
        //empty cart
         emptyCart:(state)=>{
            return state =[]
         }
    }
})

export const {addToCart,removeCartItem,incQuantity,decQuantity,emptyCart} = cartslice.actions
export default cartslice.reducer