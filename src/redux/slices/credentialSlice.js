import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    email: "",
    token: "",
}

export const credentialSlice = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        setCredential(state, action) {
            state.token = action.payload.token
            state.name = action.payload.name
            state.email = action.payload.email
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCredential } = credentialSlice.actions

export default credentialSlice.reducer