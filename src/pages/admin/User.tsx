import Sidebar from "../../components/admin/Sidebar";
import Users from "../../components/admin/Users";

const User = () => {
    return (
        <div className="flex">
          <div className="w-1/4">
            <Sidebar />
          </div>
          <div className="mt-20">
            <Users />
          </div>
        </div>
      )
}

export default User