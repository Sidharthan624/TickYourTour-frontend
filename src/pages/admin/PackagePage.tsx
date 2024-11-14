import Sidebar from "../../components/admin/Sidebar";
import Packages from "../../components/admin/Packages";


const PackagePage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="mt-20">
        <Packages />
      </div>
    </div>
  )
}

export default PackagePage