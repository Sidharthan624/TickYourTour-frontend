import { useState, useEffect } from "react";
import { profile } from "../../api/user";
import { getBooking } from "../../api/user";
import { useNavigate } from "react-router-dom";


interface Package {
    id: string,
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
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean,
    rating: boolean
}



const Trip = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
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
                        const filteredBookings = res.data.booking.filter((booking: Booking) => {
                            const endDate = new Date(booking.endDate)
                            const today = new Date()
                            return endDate < today && (!booking.isCancelled) && (booking.paymentSuccess)
                        })
                        setBookings(filteredBookings)
                        if(filteredBookings.length / itemsPerPage < 1) {
                            setTotalPages(1)
                        } else {
                            setTotalPages(Math.floor(filteredBookings.length / itemsPerPage))
                        }
                            
                    }
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchBookingData()
    },[userId, currentPage])

    const formatDateAndCalculateDays = (startDateString: Date, endDateString: Date) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        const differenceInMs = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth() + 1;
        const startYear = startDate.getFullYear() % 100;
        const formattedStartDate = `${String(startDay).padStart(2, '0')}/${String(startMonth).padStart(2, '0')}/${startYear}`;
        const endDay = endDate.getDate();
        const endMonth = endDate.getMonth() + 1;
        const endYear = endDate.getFullYear() % 100;
        const formattedEndDate = `${String(endDay).padStart(2, '0')}/${String(endMonth).padStart(2, '0')}/${endYear}`;
        return {
          startDateFormatted: formattedStartDate,
          endDateFormatted: formattedEndDate,
          numberOfDays: differenceInDays
        };
      }
      const handleRating = async (bookingId: string, rating: boolean) => {
        try {
            if(rating) {
                navigate(`/editRating/${bookingId}`)
            } else if(!rating) {
                navigate(`/rating/${bookingId}`)
            }
        } catch (error) {
            console.error(error);
            
        }
      }
  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      {
        bookings.length == 0 ? (
          <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
              No trips done yet...
            </p>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                {bookings.map((val) => {
                  const { startDateFormatted, endDateFormatted, numberOfDays } = formatDateAndCalculateDays(val.startDate, val.endDate);
                  const total = (numberOfDays + 1) * val.packageId.price
                  return (
                    <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val.id}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                          src={val.packageId.photos[0]}
                          alt=""
                        />
                      </div>
                      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                        <p className="text-lg text-black font-semibold">{val.packageId.title}</p>
                        <p className="text-sm text-black-500 ">{val.packageId.description}</p>
                        <h3 className="mb-2 text-sm text-gray-500">{!val.isCancelled ? `Amount paid : ₹${total}` : `Refunded: ₹${total}`}</h3>
                        {(startDateFormatted == endDateFormatted) ? <p>{startDateFormatted}</p> : <p>{startDateFormatted} to {endDateFormatted}</p>}
                      </div>
                      {!val.isCancelled ? <button onClick={(e) => {
                        e.preventDefault()
                        handleRating(val.id, val.rating)
                      }} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                        <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                          {val.rating ? 'Edit rating' : 'Add rating'}
                        </div>
                      </button>
                        :
                        <p className='text-red-500 m-3'>Cancelled</p>
                      }
                    </article>
                  )
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
          </>
        )
      }
    </section>
  )
}

export default Trip