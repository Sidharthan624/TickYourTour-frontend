import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { singlePackageList } from '../../api/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { io, Socket } from 'socket.io-client'
import { getMessages, newMessage, newConversation, getRatings, getProvider } from '../../api/user'
import { book } from '../../api/user'
import Calender from './Calender'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from 'react-router-dom'

let userId: string | undefined

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
interface User {
    id: string,
    name: string,
    email: string,
    image: string,
    password: string,
    isBlocked: boolean,
    phone: string
    creationTime: Date
}
interface Provider {
    id: string,
    name: string,
    email: string,
    image: string,
    password: string,
    isBlocked: boolean,
    phone: string,
    creationTime: Date
}
interface Booking {
    id: string,
    packageId: string,
    userId: string,
    startDate: Date,
    endDate: Date,
    bookingDate: Date,
    paymentSuccess: boolean,
    sessionId: string,
    isCancelled: boolean,
    payment_intent: string
}
interface Review {
    id: string,
    bookingId: Booking,
    userId: User,
    rating: number,
    review: string,
    reply: string
}
interface Message {
    senderId: string,
    message: string,
    conversationId: string,
    creationTime: Date
}


const SinglePackage: React.FC = () => {
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    })
    const handleDateChange = (newDate: { startDate: Date; endDate: Date}) => {
        newDate.startDate.setHours(12,0,0,0)
        newDate.endDate.setHours(12,0,0,0)
        setDate(newDate)
    }
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')
    const [conversationId, setConversationId] = useState('')
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null)
    const socket = useRef<Socket | null>(null)
    const [singlePackage, setSinglePackage] = useState<Package>()
    const [largeImage, setLargeImage] = useState('')
    const [chatBox, setChatBox] = useState(false)
    const [providerId, setProviderId] = useState('')
    const [provider, setProvider] = useState<Provider>()
    const [rate, setRate] = useState(false)
    const [review, setReview] = useState<Review[]>([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                if(providerId) {
                    const res = await getProvider(providerId)
                    if(res?.data.success) {
                        setProvider(res.data.data)
                    }
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchProviderData()
    },[providerId])

    useEffect(() => {
        const fetchRatings = async () => {
            if(id) {
                const res = await getRatings(id)
                if(res?.data.success) {
                    setReview(res.data.data)
                }
            }
        }
        fetchRatings()
    },[id])

    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                message: data.text,
                creationTime: data.createdAt


            } as Message)
        })
    },[])

    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.on('getImageMessage', (data) => {
            setArrivalMessage({
                 senderId: data.senderId,
                 message: data.text,
                 creationTime: data.createdAt
            } as Message)
        })
    },[])
    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.on('getVideoMessage', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                message: data.text,
                creationTime: data.createdAt

            } as Message)
        })
    },[])
    
    useEffect(() => {
        arrivalMessage && 
        setMessages(prev => [...prev, arrivalMessage] as Message[])
    },[arrivalMessage])

    useEffect(() => {
        const userData = localStorage.getItem('userInfo')
        if(userData) {
            const tokenPayload = userData.split('.')[1]
            const decodedPayload = atob(tokenPayload)
            const payloadObject = JSON.parse(decodedPayload)
            userId = payloadObject.id
            socket.current?.emit('addUser', userId)
        }
    }, [])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
               if(conversationId) {
                const messageResponse = await getMessages(conversationId)
                const messages = messageResponse?.data.data
                
                setMessages(messages)
               }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchMessages()
    },[conversationId])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    }, [message])

    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                if(id) {
                    const res = await singlePackageList(id)
                    if(res?.data.success) {
                        setSinglePackage(res.data.getPackage)
                        setLargeImage(res.data.getPackage.photos[0])
                        setProviderId(res.data.getPackage.providerId)
                    }
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchPackageData()
    },[id])

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            if(userId) {
                const res = await newMessage(message, conversationId, userId)
                socket.current?.emit('sendMessage', {
                    senderId: userId,
                    receiverId: providerId,
                    text: message,
                    createdAt: Date.now()

                })
                setMessage('')
                setMessages([...messages, res?.data.data])
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    const itineraries = singlePackage?.itinerary
    const parsedItineraries = []

    if(itineraries) {
      for(let i=0; i< itineraries.length; i++) {
        parsedItineraries.push(JSON.parse(itineraries[i]))
      }
    }
    const handleImageClick = async (imageUrl: string) => {
        try {
            setLargeImage(imageUrl)
        } catch (error) {
            console.error(error);
            
        }
    }
    const handleConversation = async () => {
        try {
            setChatBox(true)
            const providerId = singlePackage?.providerId
            const res = await newConversation(providerId as string)
            console.log(res);
            
            setConversationId(res?.data.data._id)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    const handleBook = async () => {
        try {
            const startDate = date.startDate.toISOString().slice(0, 19).replace('T', ' ');
            
            const endDate = date.endDate.toISOString().slice(0, 19).replace('T', ' ');
            
            if(id && userId) {
                
                const res = await book(id, userId, startDate, endDate)
                if(res?.data.success) {
                    toast.success('Continue to payment')
                    navigate(`/checkout/${res.data.data._id}`)
                } else {
                    toast.error('Something went wrong...')
                }
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    function formatTime(dateString: Date) {
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure 2-digit format
        const amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${hours}:${minutes} ${amPM}`;
    }

    function isMediaUrl(url: string): 'image' | 'video' | 'unknown' {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm'];
        if (!url.startsWith("https://")) {
            return 'unknown';
        }
        for (const ext of imageExtensions) {
            if (url.endsWith(ext)) {
                return 'image';
            }
        }
        for (const ext of videoExtensions) {
            if (url.endsWith(ext)) {
                return 'video';
            }
        }
        return 'unknown';
    }

  return (
    <div>
            <section className="">
                <div className="container mx-auto px-4">
                    <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img
                                            className="h-[450px] w-[700px] max-w-full object-cover"
                                            src={largeImage}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singlePackage?.photos[0]}
                                                alt=""
                                                onClick={() => {
                                                    if (singlePackage?.photos[0]) {
                                                        handleImageClick(singlePackage?.photos[0]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singlePackage?.photos[1]}
                                                alt=""
                                                onClick={() => {
                                                    if (singlePackage?.photos[1]) {
                                                        handleImageClick(singlePackage?.photos[1]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singlePackage?.photos[2]}
                                                alt=""
                                                onClick={() => {
                                                    if (singlePackage?.photos[2]) {
                                                        handleImageClick(singlePackage?.photos[2]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singlePackage?.photos[3]}
                                                alt=""
                                                onClick={() => {
                                                    if (singlePackage?.photos[3]) {
                                                        handleImageClick(singlePackage?.photos[3]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singlePackage?.photos[4]}
                                                alt=""
                                                onClick={() => {
                                                    if (singlePackage?.photos[4]) {
                                                        handleImageClick(singlePackage?.photos[4]);
                                                    }
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                                {singlePackage?.title}
                            </h1>
                            <div className="mt-5 flex items-center">
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                    {singlePackage?.description}
                                </p>
                            </div>
                            <h2 className="mt-8 text-base text-gray-900 font-semibold">Basics</h2>
                            <p className='text-gray-500 mt-2'>{singlePackage?.groupSize} Group Size | {singlePackage?.accommodation} accommodation | {singlePackage?.transportation} Transportation | {singlePackage?.duration} days Duration</p>
                            <div>
                                <h2 className="mt-8 text-base text-gray-900 font-semibold">Itinararies</h2>
                                <ul>
                                    {parsedItineraries.map((itinerary, index) => (
                                        <li className='text-gray-600 text-sm' key={index}>
                                            <span>&#8226;</span> {itinerary.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='mt-10'>
                                <Calender dateRange={date} onDateChange={handleDateChange} />
                            </div>
                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className="text-3xl font-bold">₹{singlePackage?.price}</h1>
                                    <span className="text-base">/head</span>
                                </div>
                                <button
                                    onClick={handleBook}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-blue-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                >
                                    Book Now
                                </button>
                            </div>
                            <ul className="mt-8 space-y-2">
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                    <svg
                                        className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            className=""
                                        />
                                    </svg>
                                    Category : {singlePackage?.category}
                                </li>
                                <li>
                                    <div className="col-span-12 lg:col-span-10 rounded-lg">
                                        <div className="sm:flex">
                                            <img
                                                src={provider?.image}
                                                alt="Robert image"
                                                className="w-10 h-10 m-2 rounded-full"
                                            />
                                            <div className="text">
                                                <p className="text-sm  text-gray-600 mt-5">
                                                    Hosted By {provider?.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-300">
                                {
                                    rate ?
                                        <nav className="flex gap-4">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRate(false)
                                                }}
                                                title=""
                                                className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                                            >
                                                {" "}
                                                Description{" "}
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRate(true)
                                                }}
                                                title=""
                                                className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                            >
                                                Reviews
                                            </a>
                                        </nav>
                                        :
                                        <nav className="flex gap-4">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRate(false)
                                                }}
                                                title=""
                                                className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                            >
                                                {" "}
                                                Description{" "}
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRate(true)
                                                }}
                                                title=""
                                                className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                                            >
                                                Reviews
                                            </a>
                                        </nav>
                                }

                            </div>
                            {rate ?
                                <div className="mt-8 sm:mt-12 flex justify-start">
                                    <section className="relative">
                                        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                                            <div className="grid grid-cols-1 gap-8">
                                                <div className="grid grid-cols-12 max-w-sm sm:max-w-full mx-auto">
                                                    {
                                                        review.map((val) => (
                                                            <>
                                                                <div className="col-span-12 lg:col-span-10 ">
                                                                    <div className="sm:flex gap-6">
                                                                        <img
                                                                            src={val.userId.image}
                                                                            alt="Robert image"
                                                                            className="w-10 h-10 rounded-full"
                                                                        />
                                                                        <div className="text">
                                                                            <p className="font-semibold text-base leading-8 text-gray-900">
                                                                                {val.userId.name}
                                                                            </p>
                                                                            <div className="col-span-12 lg:col-span-2 max-lg:hidden flex lg:items-center justify-start max-lg:pt-6">
                                                                                <div className="flex justify-start mb-2">
                                                                                    {
                                                                                        Array.from({ length: val.rating }).map((_, index) => (
                                                                                            <svg
                                                                                                key={index}
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                width={15}
                                                                                                height={15}
                                                                                                viewBox="0 0 30 30"
                                                                                                fill="none"
                                                                                            >
                                                                                                <g clipPath="url(#clip0_13624_2090)">
                                                                                                    <path
                                                                                                        d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                                                                                        fill="#FBBF24"
                                                                                                    />
                                                                                                </g>
                                                                                                <defs>
                                                                                                    <clipPath id="clip0_13624_2090">
                                                                                                        <rect width={30} height={30} fill="white" />
                                                                                                    </clipPath>
                                                                                                </defs>
                                                                                            </svg>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <p className="font-normal text-sm leading-7 text-gray-800 mb-4 lg:pr-8">
                                                                                {val.review}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    {val.reply &&
                                                                        <div className="ml-10 col-span-12 lg:col-span-10 rounded-lg bg-gray-100">
                                                                            <div className="sm:flex gap-6">
                                                                                <img
                                                                                    src={provider?.image}
                                                                                    alt="Robert image"
                                                                                    className="w-10 h-10 m-2 rounded-full"
                                                                                />
                                                                                <div className="text">
                                                                                    <p className="font-semibold text-base leading-8 text-gray-900">
                                                                                        {provider?.name}
                                                                                    </p>
                                                                                    <p className="font-normal text-sm leading-7 text-gray-800 mb-4 lg:pr-8">
                                                                                        {val.reply}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="pb-8 border-b border-gray-100 w-full" />
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                                <div className="pb-8 border-b border-gray-100 w-full" />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                :
                                <div className="mt-8 flow-root sm:mt-12">
                                    <h1 className="text-3xl font-bold">{singlePackage?.title}</h1>
                                    <p className="mt-4">
                                        {singlePackage?.description}
                                    </p>
                                </div>}
                        </div>
                    </div>
                </div>
            </section>
            <>
                {/* component */}
                <div className="fixed bottom-0 right-0 mb-4 mr-4">
                    <button
                        id="open-chat"
                        onClick={handleConversation}
                        className="bg-blue-800 text-white py-2 px-3 rounded-full hover:bg-blue-900 transition duration-300 flex items-center w-11"  >
                        <FontAwesomeIcon icon={faComment} className="w-6 h-6 mr-2 text-currentColor" />
                    </button>
                </div>

                <div id="chat-container" className={`fixed bottom-16 right-4 w-96 ${chatBox ? '' : 'hidden'}`}>
                    <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                        <div className="p-4 border-b bg-blue-900 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Chat with host</p>
                            <button
                                id="close-chat"
                                onClick={() => setChatBox(false)}
                                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            {/* Chat messages will be displayed here */}
                            {messages && messages.map((message: Message, index) => (
                                <>
                                    {message.senderId == userId ?
                                        <div className="mb-2 text-right" ref={index === messages.length - 1 ? scrollRef : null}>
                                            {(() => {
                                                const mediaType = isMediaUrl(message.message);
                                                if (mediaType === 'image') {
                                                    return <img src={message.message} alt="Sent Image" />;
                                                } else if (mediaType === 'video') {
                                                    return <video src={message.message} controls />;
                                                } else {
                                                    return <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                                                        {message.message}
                                                    </p>
                                                }
                                            })()}
                                            <p className='text-xs text-gray-600'>{formatTime(message.creationTime)}</p>
                                        </div>
                                        :
                                        <div className="mb-2" ref={index === messages.length - 1 ? scrollRef : null}>
                                            {(() => {
                                                const mediaType = isMediaUrl(message.message);
                                                if (mediaType === 'image') {
                                                    return <img src={message.message} alt="Sent Image" />;
                                                } else if (mediaType === 'video') {
                                                    return <video src={message.message} controls />;
                                                } else {
                                                    return <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                                                        {message.message}
                                                    </p>
                                                }
                                            })()}
                                            <p className='text-xs text-gray-600'>{formatTime(message.creationTime)}</p>
                                        </div>
                                    }
                                </>
                            ))}
                        </div>
                        <div className="p-4 border-t flex">
                            <input
                                id="user-input"
                                type="text"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSend}
                                id="send-button"
                                className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </>

        </div>
  )
}

export default SinglePackage