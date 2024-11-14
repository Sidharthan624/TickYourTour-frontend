import userimg from '../../assets/user.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../api/user'

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


const Profile = () => {
    const [image, setImage] = useState('')
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await profile()
                if(res?.data.success) {
                    setUser(res.data.userProfile)
                    setImage(res.data.userProfile.image || user)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchUserData()
    }, [])
    function formatDate(dateString: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} ${month}, ${year}`;
      }
      const src = image || userimg
  return (
    <div className="flex justify-center items-start h-screen">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center mt-20">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            src={src}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Email : {user?.email}
          </span>
          {
            user?.phone &&
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Contact : {user?.phone}
            </span>
          }
          
          {user?.creationTime && <span className="text-sm text-gray-500 dark:text-gray-400">
            Since {formatDate(user?.creationTime)}
          </span>}


          <div className="flex mt-4 md:mt-6">
            <Link
              to='/editProfile'
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