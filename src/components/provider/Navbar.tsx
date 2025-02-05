import { Link } from 'react-router-dom'
import logo from '../../assets/tick your tour.png'
import { useState, useRef, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/provider'
import { toast } from 'react-toastify'
import { providerLogout } from '../../store/slice/authSlice'

let providerId: string | undefined

interface RootState {
   auth: {
    providerInfo: string
   }
}
interface Notification {
  id: string,
  notification: string,
  createdAt: Date,
  providerId : string
}

const Navbar = () => {
    const { providerInfo } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const socket = useRef<Socket | undefined>()
    const [notification, setNotification] = useState<Notification>()
    const [expand, setExpand] = useState(false)
    const [dropdownToggle, setDropDownToggle] = useState(false)

    useEffect(() => {
      socket.current = io('ws://localhost:5000')
      socket.current.on('getNotification', (data) => {
        setNotification({
          providerId: data.providerId,
          notification: data.notification,
          createdAt: data.createdAt

        } as Notification)
      })
    }, [])
    useEffect(() => {
      const providerData = localStorage.getItem('providerInfo')
      if(providerData) {
        const tokenPayload = providerData.split('.')[1]
        const decodedPayload = atob(tokenPayload)
        const payloadObject = JSON.parse(decodedPayload)
        providerId = payloadObject.id;
        socket.current?.emit('addUser', providerId)
      }
    },[])
    useEffect(() => {
      if(notification) {
        toast.info(notification.notification)
      }
    }, [notification])
    const dropDownToggle = () => {
      setDropDownToggle(!dropdownToggle)
    }

    const handleLogout = async () => {
        try {
            const res = await logout()
            if(res?.data.success) {
                dispatch(providerLogout())
                toast.success('Logged out successfully')
                navigate('/provider/login')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/provider"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tick Your Tour
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {providerInfo ?
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
            :
            <Link to='/provider/login'>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            </Link>
          }
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setExpand(!expand)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
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
        {providerInfo && <div
          className={`${expand ? 'block' : 'hidden'
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/provider/dashboard"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Today
              </a>
            </li>
            <li>
              <Link
                to='/provider/listing'
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                to="/provider/inbox"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Inbox
              </Link>
            </li>
            <li>
              <div className="relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  onClick={dropDownToggle}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Menu{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                {dropdownToggle && (
                  <div
                    className="absolute top-full left-0 mt-1 w-full md:w-auto md:left-auto md:top-auto md:right-0 md:mt-0 md:border md:border-gray-100 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 dark:border-gray-700"
                    id="navbar-dropdown"
                  >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton" style={{ width: '120px' }}>
                      <li>
                        <Link to="/provider/bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bookings</Link>
                      </li>
                      <li>
                        <Link to="/provider/review" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Ratings</Link>
                      </li>
                      <li>
                        <Link to="/provider/newListing" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">New listing</Link>
                      </li>
                      <li>
                        <Link to="/provider/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                      </li>
                      <li>
                        <Link to="/provider/subscription" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Subscription</Link>
                      </li>
                      <li>
                        <Link to="/provider/notification" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Notifications</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>}
      </div>
    </nav>
  )
}

export default Navbar