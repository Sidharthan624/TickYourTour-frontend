import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { singlePackageList } from "../../api/user";
import { getCheckout } from "../../api/user";
import { loadStripe } from "@stripe/stripe-js";
import { proceedForPayment, saveSession } from "../../api/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Package {
    id: string,
    providerId: string,
    title: string,
    description: string,
    destination: string,
    category: string,
    price: number,
    duration: number,
    groupSize: number,
    itinerary: string,
    photos: string,
    transportation: string,
    accommodation: string,
    status: string,
    rating: number,
    isBlocked: boolean,
    creationTime: Date
  }

  interface Book {
   _id: string,
   userId: string,
   packageId: string,
   bookingDate: Date,
   endDate: Date,
   startDate: Date,
   paymentSuccess: false
  }

  
  const Checkout = () => {
    const [singlePackage, setSinglePackage] = useState<Package>()
    const [booking, setBooking] = useState<Book>()

    const { id } = useParams()

    useEffect(() => {
        const fetchBookingData = async () => {
            if(id) {
                const res = await getCheckout(id)
                if(res?.data.success) {
                    setBooking(res.data.data)
                }
            }
        }
        fetchBookingData()
    },[id])
    const endDateString: Date | undefined = booking?.endDate;
    const startDateString: Date | undefined = booking?.startDate;
    let roundedDifference
    let totalPrice
    if (endDateString && startDateString) {
        const endDate: Date = new Date(endDateString);
        const startDate: Date = new Date(startDateString);
        const differenceInMs: number = endDate.getTime() - startDate.getTime();
        const differenceInDays: number = differenceInMs / (1000 * 60 * 60 * 24);
        roundedDifference = Math.round(differenceInDays) + 1;
        if (singlePackage) {
            totalPrice = singlePackage?.price
        }
    } else {
        console.log("Either endDate or startDate is undefined.");
    }

    useEffect(() => {
      const fetchPackageData = async () => {
        try {
            if(booking) {
                const res = await singlePackageList(booking.packageId)
                if(res?.data.success) {
                    setSinglePackage(res.data.getPackage)
                }
            }
        } catch (error) {
            console.error(error);
            
        }
      }
      fetchPackageData()
    },[booking])
    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51Q7ETi08W6jwrtPYZuzOeGEkhypQJ0SVqIiz1SsfVETc83FYKTpR3AX7Lw07cLe8KqS16GW4QmuJyJJYgzfRAYi900dWbqv1zX')
        if(booking) {
            const res = await proceedForPayment(booking)
            if(res?.data.success) {
                console.log('hii');
                
                const sessionId = res.data.data
                const save = await saveSession(sessionId, booking._id)
                if(save?.data.success) {
                    await stripe?.redirectToCheckout({
                        sessionId: sessionId
                    }) 
                } else if (!save?.data?.success) {
                        toast.error('Something went wrong')
                }
            } else if(!res?.data.success) {
                toast.error(res?.data.message)
            }
        }
    }
    return (
        <div className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl"> {/* Increased max-w-lg to max-w-xl */}
            <h1 className="text-xl text-gray-800 mb-6">Booking Summary</h1>
            <ul className="space-y-6">
                <li className="flex items-center border-b pb-4">
                    <div className="flex-shrink-0 mr-4">
                        <img
                            src={singlePackage?.photos[0]}
                            alt="Product"
                            className="rounded w-16"
                        />
                    </div>
                    <div className="flex-grow m-10">
                        <span className="text-gray-800 text-md font-semibold block">{singlePackage?.title}</span>
                        <span className="text-gray-700 text-sm">{roundedDifference} night</span>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="text-gray-800 font-semibold block">₹{singlePackage?.price}</span>
                    </div>
                </li>
            </ul>
            <div className="flex justify-between mt-6">
                <span className="text-xl text-gray-700">Total</span>
                <span className="text-xl text-gray-800 font-semibold">₹{totalPrice}</span>
            </div>
            <button onClick={makePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 w-full">
                Pay now
            </button>
        </div>
    </div>
    )
  }
  
  export default Checkout