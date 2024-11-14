import { useState, useEffect } from "react";
import { providerList, dasboard } from "../../api/provider";
import MonthlySales from "./MonthlySales";
import MonthlyRevenue from "../admin/MonthlyRevenue";

interface Package {
    _id: string,
    title: string,
    description: string,
    status: string,
    photos: string,
    isBlocked: string,
    price: number
}
interface User {
    _id: string,
    name: string,
    email: string,
    phone: string
}
interface Booking {
    id: string,
    packageId: Package,
    userId: User,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    isCancelled: boolean
}

const Today = () => {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [providerId, setProviderId] = useState('')
    const [totalPackages, setTotalPackages] = useState(0)
    const [approvedPackages, setApprovedPackages] = useState(0)
    const [rejectedPackages, setRejectedPackages] = useState(0)

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
    },[])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dasboard()
                if(res?.data.success) {
                    setTotalPackages(res.data.data.totalPackages)
                    setApprovedPackages(res.data.data.acceptedPackages)
                    setRejectedPackages(res.data.data.rejectedPackages)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchData()
    },[])
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
            <div className="p-6 mt-20 ml-10 mr-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{totalPackages}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Total Packages</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-4">
                            <div>
                                <div className="flex items-center mb-1">
                                    <div className="text-2xl font-semibold">{approvedPackages}</div>
                                </div>
                                <div className="text-sm font-medium text-gray-400">Approved Packages</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
                        <div className="flex justify-between mb-6">
                            <div>
                                <div className="text-2xl font-semibold mb-1">{rejectedPackages}</div>
                                <div className="text-sm font-medium text-gray-400">Rejected Packages</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                        Monthly Sales
                                    </h3>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <MonthlySales />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-2">
                    <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
                        <div className="rounded-t mb-0 px-0 border-0">
                            <div className="flex flex-wrap items-center px-4 py-2">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                                        Monthly Revenue
                                    </h3>
                                </div>
                            </div>
                            <div className="block w-full overflow-x-auto">
                                <MonthlyRevenue />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <h3>Today's Customer</h3>
                    <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                        {bookings.map((val) => {
                            const startDate = new Date(val.startDate);
                            const today = new Date();
                            let sameDay
                            if (
                                startDate.getDate() === today.getDate() &&
                                startDate.getMonth() === today.getMonth() &&
                                startDate.getFullYear() === today.getFullYear()
                            ) {
                                sameDay = true
                            } else {
                                sameDay = false
                            }
                            if (val.paymentSuccess && !val.isCancelled && sameDay) {
                                const { startDateFormatted, endDateFormatted } = formatDateAndCalculateDays(val.startDate, val.endDate);
                                const total = val.packageId.price
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
        </>
    )
}

export default Today