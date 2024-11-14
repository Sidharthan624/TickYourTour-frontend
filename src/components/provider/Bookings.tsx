import { useState, useEffect } from "react";
import { providerList, getBookingByProviderId } from "../../api/provider";

interface Package {
    _id: string,
    title: string,
    description: string,
    status: string,
    photos: string,
    isBlocked: boolean,
    price: number
}

interface User {
    _id: string,
    name: string,
    email: string,
    phone: number
}
interface Booking {
    id: string,
    packageId: Package,
    userId: User,
    startDate: Date,
    endDate: Date,
    bookingDate: Date
    paymentSuccess: boolean,
    isCancelled: boolean
}


const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [providerId, setProviderId] = useState('')

    useEffect(() => {
       const fetchPackageData = async () => {
        try {
            const res = await providerList()
            if(res?.data.success) {
                setProviderId(res.data.getPackage[0].providerId)
            }
        } catch (error) {
            console.error(error);
            
        }
       }
       fetchPackageData()
    })
    useEffect(() => {
        const fetchBookingData = async () => {
            const res = await getBookingByProviderId(providerId)
            if(res?.data.success) {
                setBookings(res.data.data)
            }
        }
        fetchBookingData()
    },[providerId])
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
  return (
    <>
    {
        bookings.length == 0 ? (
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
                            {bookings.map((val) => {
                                if (val.paymentSuccess) {
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
                                            <div className="absolute top-0 m-2 rounded-full bg-white">
                                                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-black sm:py-1 sm:px-3">
                                                    {val.isCancelled ? 'Cancelled' : 'Paid'}
                                                </p>
                                            </div>
                                            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                                <p className="text-lg text-black font-semibold">{val.packageId.title}</p>
                                                <p className="text-sm text-black-500 ">{val.packageId.description}</p>
                                                <h3 className="mb-2 text-sm text-gray-400">Amount : ₹{total}</h3>
                                                {(startDateFormatted == endDateFormatted) ? <p className='text-sm text-gray-500'>Date: {startDateFormatted}</p> : <p className='text-sm text-gray-500'>{startDateFormatted} to {endDateFormatted}</p>}
                                                <p className="text-sm text-gray-500 ">Customer name : {val.userId.name}</p>
                                                <p className="text-sm text-gray-500 ">Contact : {val.userId.phone}</p>
                                            </div>
                                        </article>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
</>
  )
}

export default Bookings