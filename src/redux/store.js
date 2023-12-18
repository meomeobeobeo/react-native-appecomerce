import { configureStore } from '@reduxjs/toolkit'
import { languageSlice } from './languageSlice'
import { cartSlice } from './CartSlice'

// import logger from 'redux-logger'

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
        cart : cartSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
