import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string ) : null,
    providerInfo: localStorage.getItem('providerInfo') ? JSON.parse(localStorage.getItem('providerInfo') as string ) : null,
    adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo') as string ): null
  }
  

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        },
        setAdminCredentials: (state, action) => {
            state.adminInfo = action.payload
            localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        admLogout: (state) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        },
        setProviderCredentials: (state, action) => {
            state.providerInfo = action.payload
            localStorage.setItem('providerInfo', JSON.stringify(action.payload))
        },
        providerLogout: (state) => {
            state.providerInfo = null
            localStorage.removeItem('providerInfo')
        }
    }
})
export const { setCredentials, logout, setAdminCredentials, admLogout, setProviderCredentials, providerLogout } = authSlice.actions
export default authSlice.reducer