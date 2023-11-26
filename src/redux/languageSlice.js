import { createSlice } from '@reduxjs/toolkit'

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        language: 'en',
    },
    reducers: {
        switchLanguage: (state, action) => {
            state.language = action.payload // set language = action.payload as 'vi' , 'en'
        },
    },
})
