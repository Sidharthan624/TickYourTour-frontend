import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface  Rootstate {
    auth: {
        adminInfo: string
    }
}


const AdminLoggedIn = () => {
    const { adminInfo } = useSelector((state: Rootstate) => state.auth)
  return (
   adminInfo ? <Outlet /> : <Navigate to= '/admin/login' />
  )
}

export default AdminLoggedIn