import Navbar from "../../components/provider/Navbar"
import Bookings from "../../components/provider/Bookings"

const BookingsPage = () => {
  return (
    <div>
    <Navbar />
    <div className="mt-5">
        <Bookings />
    </div>
    </div>
  )
}

export default BookingsPage