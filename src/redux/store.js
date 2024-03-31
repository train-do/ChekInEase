import { configureStore } from '@reduxjs/toolkit'
import credentialSlice from './slices/credentialSlice'

export const store = configureStore({
    reducer: {
        credential: credentialSlice
    },
})