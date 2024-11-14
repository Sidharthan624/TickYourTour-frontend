import Sidebar from "../../components/admin/Sidebar";
import RequestDetails from "../../components/admin/RequestDetails";



const RequestDetailsPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="mt-20">
        <RequestDetails />
      </div>
    </div>
  )
}

export default RequestDetailsPage