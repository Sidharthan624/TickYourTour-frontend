import user from '../../assets/user.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../api/provider'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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


const Profile = () => {
    const [image, setImage] = useState<string | null>(null)
    const [provider, setprovider] = useState<Provider>()

    useEffect(() => {
      const fetchProviderData = async () => {
        try {
            const res = await profile()
            if(res?.data.providerProfile) {
                setprovider(res.data.providerProfile)
                setImage(res.data.providerProfile.image || user)
            }
        } catch (error) {
            console.error(error);
            
        }
      }
      fetchProviderData()
    },[])
    function formatDate(dateString: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} ${month}, ${year}`;
      }
    const src = image || user
  return (
    <div className="flex justify-center items-start h-screen mt-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center mt-20">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={src}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {provider?.name} {provider?.isVerified && <span><FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue', marginRight: '5px' }} /></span>}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Email :  {provider?.email}
          </span>
          {
            provider?.phone &&
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Contact : {provider?.phone}
            </span>
          }

          {provider?.creationTime && <span className="text-sm text-gray-500 dark:text-gray-400">
            Since {formatDate(provider?.creationTime)}
          </span>}
          <div className="flex mt-4 md:mt-6">
            <Link
              to='/provider/editProfile'
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile