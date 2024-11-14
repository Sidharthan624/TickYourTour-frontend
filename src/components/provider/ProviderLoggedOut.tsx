import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface Rootstate {
    auth: {
        providerInfo: string
    }
}

const providerLoggedOut = () => {
    const providerInfo = useSelector((state: Rootstate) => state.auth)
  return (
    providerInfo.providerInfo ? <Navigate to='/provider/dashboard' /> : <Outlet />
  )
}

export default providerLoggedOut