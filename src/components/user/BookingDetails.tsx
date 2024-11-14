import { useState, useEffect } from "react"
import { getBookingDetails } from "../../api/user"
import { profile } from "../../api/user"
import { useParams } from "react-router-dom"


interface Package {
    id: string,
    title: string,
    description: string,
    status: string,
    photos: string,
    price: number
}

interface User {
    id: string,
    name: string,
    email: string,
    image: string,
    password: string,
    isBlocked: string,
    phone: string,
    creationTime: Date
}

interface Booking {
    id: string,
    packageId: Package,
    userId: string,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean,
    totalPrice: number
}
const BookingDetails = () => {
    const [bookings, setBookings] = useState<Booking>()
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState<User>()
    const { bookingId } = useParams()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profile()
                if(res?.data.success) {
                    setUserId(res.data.userProfile._id)
                    setUser(res.data.userProfile)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchUserData()
    },[])

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                if(bookingId) {
                    const res = await getBookingDetails(bookingId)
                    if(res?.data.success) {
                        setBookings(res.data.success)
                    }
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchBookingData()
    },[bookingId, userId])

    function formatDate(inputDate: Date) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
  return (
    <>

    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
        <img src={bookings?.packageId?.photos[0]} />
        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
            {bookings?.packageId?.title}
        </h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Invoice</h1>
            <div className="text-gray-700">
                <div>Date: {bookings?.bookingDate ? formatDate(bookings.bookingDate) : 'N/A'}</div>
            </div>

        </div>
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Billed To:</h2>
            <div className="text-gray-700 mb-2">{user?.name}</div>
            <div className="text-gray-700 mb-2">{user?.phone}</div>
            <div className="text-gray-700">{user?.email}</div>
        </div>
        <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Booking Details :</h2>
            <div className="text-gray-700 mb-2">Start Date : {bookings?.startDate ? formatDate(bookings?.startDate) : 'N/A'}</div>
            <div className="text-gray-700 mb-2">End Date : {bookings?.endDate ? formatDate(bookings?.endDate) : 'N/A'}</div>
        </div>
        <table className="w-full mb-8">
            <tfoot>
                <tr>
                    <td className="text-left font-bold text-gray-700">Total</td>
                    <td className="text-right font-bold text-gray-700">₹ {bookings?.totalPrice}</td>
                </tr>
            </tfoot>
        </table>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
    </div>
</>
  )
}

export default BookingDetails