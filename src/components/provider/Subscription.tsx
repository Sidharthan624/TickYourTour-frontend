import { useState, useEffect } from "react";
import payment from '../../assets/payment.svg'
import { loadStripe } from "@stripe/stripe-js";
import { proceedForSubscription, profile, cancelSubscription } from "../../api/provider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Provider {
    id: string,
    name: string,
    email: string,
    image: string,
    password: string,
    isBlocked: boolean,
    phone: string,
    creationTime: Date,
    isVerified: boolean
}



const Subscription = () => {
    const [provider, setProvider] = useState<Provider>()
    const [providerId, setProviderId] = useState('')
    const [subs, setSubs] = useState(false)

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const res = await profile()
                if(res?.data.providerProfile) {
                    setProvider(res.data.providerProfile)
                    setProviderId(res.data.providerProfile)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchProviderData()
    },[])
    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51Q7ETi08W6jwrtPYZuzOeGEkhypQJ0SVqIiz1SsfVETc83FYKTpR3AX7Lw07cLe8KqS16GW4QmuJyJJYgzfRAYi900dWbqv1zX')
        const res = await proceedForSubscription()
        if(res?.data.success) {
            const sessionId = res.data.data
            console.log(sessionId);
            
            await stripe?.redirectToCheckout(
                {
                    sessionId: sessionId
                }
                
            )
            setSubs(!subs)

        }
    }
    const handleCancel = async () => {
        const res = await cancelSubscription(providerId)
        if(res?.data.success) {
            setSubs(!subs)
            toast.success('Subscription cancelled...')
        } else if(!res?.data.success) {
            toast.error('Something went wrong...')
        }
    } 
  return (
    <div className='m-20'>
            <div className="bg-white dark:bg-gray-800 overflow-hidden relative m-10">
                <div className="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                    <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                        <span className="block">Step into a world of endless opportunities!</span>
                        <span className="block text-indigo-500">It's today or never.</span>
                    </h2>
                    <p className="text-xl mt-4 text-gray-400">
                        Ready to take your business to the next level? Subscribe now and start enjoying the benefits instantly! Monthly subscription plans starting at ₹1500/-
                    </p>
                    <div className="lg:mt-0 lg:flex-shrink-0">
                        {
                            provider?.isVerified ?
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <button
                                        onClick={handleCancel}
                                        type="button"
                                        className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Cancel Subscription
                                    </button>
                                </div>
                                :
                                <div className="mt-12 inline-flex rounded-md shadow">
                                    <button
                                        onClick={makePayment}
                                        type="button"
                                        className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Subscribe
                                    </button>
                                </div>
                        }
                    </div>
                </div>
                <img
                    src={payment}
                    className="absolute top-0 right-0 hidden h-full max-w-1/2 lg:block"
                />
            </div>
        </div>
  )
}

export default Subscription
