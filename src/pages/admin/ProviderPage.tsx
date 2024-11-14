import Sidebar from "../../components/admin/Sidebar";
import Providers from "../../components/admin/Providers";

const ProviderPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="mt-20">
        <Providers />
      </div>
    </div>
  )
}

export default ProviderPage