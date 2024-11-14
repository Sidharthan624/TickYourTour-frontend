import Sidebar from "../../components/admin/Sidebar";
import Request from "../../components/admin/Request";


const RequestPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="mt-20">
        <Request />
      </div>
    </div>
  )
}

export default RequestPage