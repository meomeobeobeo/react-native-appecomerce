import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart : []
    },
    reducers: {
        addProductToCart : (state , action) =>{
            
            state.cart.push[action.payload]
        
        },
        deleteProductInCart : (state , action)=>{
            
            const currentCart = state.cart.filter((value , index)=>{
                return value?.product_item_id != action.payload?.product_item_id_delete
            })    

            state.cart = currentCart
        }
    },
})
