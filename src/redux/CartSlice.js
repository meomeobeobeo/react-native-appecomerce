import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart_id : '',
        cartItems: [{
            product_item_id : '',
            product_image : '',
            name : '',
            price : '',
            qty : '',
            variation_list : [
                {
                    product_configuration_id : '',
                    variation_name : '',
                    variation_id : ''
                }
            ]
        }],

    },
    reducers: {
        addProductToCart: (state, action) => {
            state.cartItems.push[action.payload]
        },
        deleteProductInCart: (state, action) => {
            const currentCart = state.cartItems.filter((value, index) => {
                return value?.product_item_id != action.payload?.product_item_id_delete
            })

            state.cartItems = currentCart
        },
    },
})
