import {configureStore} from '@reduxjs/toolkit'
import { languageSlice } from './languageSlice'

// import logger from 'redux-logger'   

const store = configureStore({
    reducer: {
        language : languageSlice.reducer

    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),


})

export default store