import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google' 
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
   <StrictMode>
    <GoogleOAuthProvider clientId='878707156134-1i27d1q4bdi1i14795t7171fako95kjc.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
    
  </StrictMode>
  </Provider>
 
)
