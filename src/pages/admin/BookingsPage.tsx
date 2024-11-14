import Sidebar from "../../components/admin/Sidebar";
import Bookings from "../../components/admin/Bookings";

const BookingsPage = () => {
  return (
    <div className="flex">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="mt-20">
                <Bookings />
            </div>
        </div>
  )
}

export default BookingsPage