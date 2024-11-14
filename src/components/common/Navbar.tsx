import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {profile, userLogout} from '../../api/user'
import user from '../../assets/user.png'
import logo from '../../assets/tick your tour.png'
import { logout } from '../../store/slice/authSlice'
import { toast } from 'react-toastify'
interface RootState {
   auth: {
    userInfo: string
   }
}

const Navbar = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [sideBarOpen,setSidBarOpen] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const [name,setName] = useState('')
    const [image,setImage] = useState('')

    const toggleSideBar = () => {
      setSidBarOpen(!sideBarOpen)
    }
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await profile()
      if(res?.data.userProfile) {
        setName(res.data.userProfile.name)
        setImage(res.data.userProfile.image || user)
      }
        } catch (error) {
          console.error(error);
          
        }
      }
      fetchUserData()
    },[])
    const sideBarClass = `items-center justify-between ${sideBarOpen ? "visible" : "hidden"
    } w-full md:flex md:w-auto md:order-1`
    const handleLogout = async () => {
      try {
        const res = await userLogout()
        if(res?.data.success) {
          dispatch(logout())
          toast.success('Logged out successfully...')
          navigate('/login')
        }
      } catch (error) {
        console.error(error);
        
      }
    }
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tick Your Tour
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userInfo ? (
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center focus:outline-none border border-gray-300 rounded-full px-2 py-1"
              >
                <img
                  src={image}
                  className="h-6 w-6 text-black mr-2 rounded-full object-cover"
                />
                {/* User icon with margin */}
                <span className="text-sm font-medium text-gray-700">
                  {name}
                </span>
                {/* Username display */}
              </button>
              {isOpen && ( // Conditionally render dropdown menu
                <div className="absolute right-0 z-10 origin-top-right focus:block">
                  <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 w-48">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/booking"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Bookings
                    </Link>
                    <Link
                      to="/trips"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Trips
                    </Link>
                    <Link
                      to="/provider/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Seller portal
                    </Link>
                    <a
                      href="#" // Set the actual logout URL
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200"
                      onClick={handleLogout} // Call logout logic as well
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>
            </Link>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={toggleSideBar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className={sideBarClass} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to='/'
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <Link
                to='/packages'
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Packages
              </Link>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar