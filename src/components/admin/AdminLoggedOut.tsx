import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface Rootstate {
    auth: {
        adminInfo: string
    }
}

const AdminLoggedOut = () => {
    const { adminInfo } = useSelector((state: Rootstate) => state.auth)
  return (
    adminInfo ? <Navigate to='/admin/user' /> : <Outlet />
  )
}

export default AdminLoggedOut