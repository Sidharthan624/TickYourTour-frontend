import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

interface Rootstate {
   auth: {
    ProviderInfo: string
   }
}

const ProviderLoggedIn = () => {
    const providerInfo = useSelector((state: Rootstate) => state.auth)
  return (
    providerInfo ? <Outlet /> : <Navigate to='/provider/login' />
  )
}

export default ProviderLoggedIn