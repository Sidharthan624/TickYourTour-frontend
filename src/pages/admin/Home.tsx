import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "../../components/admin/Dashboard";

const Home = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 mt-20">
        <Dashboard />
      </div>
    </div>
  )
}

export default Home