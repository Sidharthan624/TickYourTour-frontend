import { useState, useRef, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { changePackageStatus, packageRequest, addNotification } from "../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let adminId: string | undefined

interface Package {
    id: string,
    title: string,
    description: string,
    status: string,
    photos: string,
    providerId: string
}


const Request = () => {
    const [packages, setPackages] = useState<Package[]>([])
    const navigate = useNavigate()
    const socket = useRef<Socket | undefined>()

    useEffect(() => {
        socket.current = io('ws://localhost:5173')
    },[])
    useEffect(() => {
      const adminData = localStorage.getItem('adminInfo')
      if(adminData) {
        const tokenPayload = adminData.split('.')[1]
        const decodedPayload = atob(tokenPayload)
        const payloadObject = JSON.parse(decodedPayload)
        adminId = payloadObject.id
        socket.current?.emit('addUser', adminId)
      }
    }, [])

    useEffect(() => {
      const fetchPackageData = async () => {
        try {
          const res = await packageRequest()
          if(res?.data.success) {
            setPackages(res.data.getPackage)
          }
        } catch (error) {
          console.error(error);
          
        }
      }
      fetchPackageData()
    })
    const handleAccept = async (id: string, status: string, providerId: string) => {
      try {
        const res = await changePackageStatus(id, status)
        await addNotification(providerId, status, id)
        socket?.current?.emit('changeStatus', {
          providerId: providerId,
          notification: 'Your package has been approved...',
          createdAt: Date.now()
        })
        if(res?.data.success) {
          toast.success('Status changed successfully...')
        } else {
          toast.error('Something went wrong')
        }
      } catch (error) {
        console.error(error);
        
      }
    }
    const handleReject = async (id: string, status: string, providerId: string) => {
      try {
        const res = await changePackageStatus(id, status)
        await addNotification(providerId, status, id)
        socket.current?.emit('changeStatus', {
          providerId: providerId,
          notification: 'Your package has been rejected...',
          createdAt: Date.now()
        })
        if(res?.data.success) {
          toast.success('Status changed successfully...')
        }
      } catch (error) {
        console.error(error);
        
      }
    }
    const handleImgClick = async (id: string) => {
      try {
        navigate(`/admin/requestDetails/${id}`)
      } catch (error) {
        console.error(error);
        
      }
    }
  return (
    <div>
            {packages.length == 0 ? (
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                    <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
                        No incoming requests at the moment..
                    </p>
                </div>
            ) : (
                packages.map((val) => (
                    <div className='grid md:grid-cols-3 grid-cols-2'>
                        <div key={val.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 '>
                            <img className="rounded-t-lg h-40 w-full" src={val.photos[0]} alt="" onClick={() => handleImgClick(val.id)} />
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {val.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {val.description}
                                </p>
                                <p className="mb-3 font-thin text-red-700 dark:text-gray-400">
                                    {val.status}
                                </p>
                                <button
                                    onClick={() => handleAccept(val.id, 'Accepted', val.providerId)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-5"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(val.id, 'Rejected', val.providerId)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-500"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
  )
}

export default Request