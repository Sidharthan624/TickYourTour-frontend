import { useState, useEffect } from "react";
import { profile } from "../../api/user";
import { getBooking } from "../../api/user";
import { cancelBooking } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Package {
    id:  string,
    title: string,
    description: string,
    status: string,
    photos: string,
    price: number
}
interface Booking {
    id: string,
    packageId: Package,
    userId: string,
    startDate: Date,
    endDate: Date,
    bookingDate: string,
    paymentSuccess: boolean,
    isCancelled: boolean
}

const Booking = () => {
    const[bookings, setBookings] = useState<Booking[]>([])
    const [userId, setUserId] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const navigate = useNavigate()
    const itemsPerPage = 8

    const handleClickPage = (page: number) => {
       setCurrentPage(page)
    }
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profile()
                if(res?.data.success) {
                    setUserId(res.data.userProfile._id)
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
            if(userId.length) {
                const res = await getBooking(userId, currentPage, itemsPerPage)
                if(res?.data.success) {
                    const filteredBookings = res.data.booking.filter((booking: Booking) => booking.paymentSuccess === true)
                    setBookings(filteredBookings)
                    setTotalPages(Math.floor(res.data.length) / itemsPerPage)
                }
            }
        } catch (error) {
            console.error(error);
            
        }
     }
     fetchBookingData()
    },[userId, currentPage])
    const formatDate = (startDateString: Date, endDateString: Date ) => {
        const startDate = new Date(startDateString)
        const endDate = new Date(endDateString)
        const startDay = startDate.getDay()
        const startMonth = startDate.getMonth()
        const startYear = startDate.getFullYear()
        const formattedStartDate = `${String(startDay).padStart(2, '0')}/${String(startMonth).padStart(2, '0')}/${startYear}`
        const endDay = endDate.getDate();
    const endMonth = endDate.getMonth() + 1;
    const endYear = endDate.getFullYear() % 100;
    const formattedEndDate = `${String(endDay).padStart(2, '0')}/${String(endMonth).padStart(2, '0')}/${endYear}`
    return {
        startDateFormated: formattedStartDate,
        endDateFormatted: formattedEndDate,
    }
    }
    const handleCancel = async (bookingId: string) => {
        try {
            const res = await cancelBooking(bookingId)
            if(res?.data.success) {
                toast.success('Amount will be refunded within 5 days...')
            } else if(!res?.data.success) {
                toast.error('Something went wrong...')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    const bookingDetails = async (bookingId: string) => {
        try {
            navigate(`/bookingDetails/${bookingId}`)
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <>
      {bookings.length == 0 ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div>
            <div className='m-10 mt-10'>
              <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl m-10">
                <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
                  No bookings done yet...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                {bookings
                  .filter(val => val.paymentSuccess)
                  .map(val => {
                    const { startDateFormated, endDateFormatted } = formatDate(val.startDate, val.endDate);
                    const total = val.packageId.price;

                    return (
                      <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val.packageId.id}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            onClick={() => bookingDetails(val.id)}
                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                            src={val.packageId.photos[0]}
                            alt=""
                          />
                        </div>
                        <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                          <p className="text-lg text-black font-semibold">{val.packageId.title}</p>
                          <p className="text-sm text-black-500 ">{val.packageId.description}</p>
                          <h3 className="mb-2 text-sm text-gray-500">{!val.isCancelled ? `Amount paid : ₹${total}` : `Refunded: ₹${total}`}</h3>
                          {(startDateFormated === endDateFormatted) ? <p>{startDateFormated}</p> : <p>{startDateFormated} to {endDateFormatted}</p>}
                        </div>
                        {!val.isCancelled ? (
                          <button onClick={(e) => {
                            e.preventDefault();
                            handleCancel(val.id);
                          }} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                            <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                              Cancel
                            </div>
                          </button>
                        ) : (
                          <p className='text-red-500 m-3'>Cancelled</p>
                        )}
                      </article>
                    );
                  })}
              </div>
            </div>
            <div className='flex justify-center m-20'>
              <nav>
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => handleClickPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page}>
                      <a
                        href="#"
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${page === currentPage ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        onClick={() => handleClickPage(page)}
                      >
                        {page}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => handleClickPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      )
      }
    </>
  )
}

export default Booking