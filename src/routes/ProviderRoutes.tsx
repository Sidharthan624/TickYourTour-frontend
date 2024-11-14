import { Route, Routes } from 'react-router-dom'
import Signup from '../pages/provider/Signup'
import Otp from '../pages/provider/Otp'
import Login from '../pages/provider/Login'
import NewPackage from '../pages/provider/NewPackage'
import ProviderLoggedOut from '../components/provider/ProviderLoggedOut'
import ProviderLoggedIn from '../components/provider/ProviderLoggedIn'
import TodayPage from '../pages/provider/TodayPage'
import ListingPage from '../pages/provider/ListingPage'
import EditPackagePage from '../pages/provider/EditPackagePage'
import BookingsPage from '../pages/provider/BookingsPage'
import NewListing from '../pages/provider/NewListing'
import ReviewsPage from '../pages/provider/ReviewsPage'
import ProfilePage from '../pages/provider/ProfilePage'
import EditProfilePage from '../pages/provider/EditProfilePage'
import SubscriptionPage from '../pages/provider/SubscriptionPage'
import PaymentSuccess from '../pages/provider/PaymentSuccess'
import PaymentFail from '../pages/provider/PaymentFail'
import NotificationPage from '../pages/provider/NotificationPage'
import InboxPage from '../pages/InboxPage'



const ProviderRoutes = () => {
  return (
    <Routes>
        <Route path='' element={<ProviderLoggedOut />} >
        <Route path='signup' element={<Signup/>}/>
        <Route path='otp' element={<Otp/>}/>
        <Route path='login' element={<Login/>}/>
        </Route>
        <Route path='' element={<ProviderLoggedIn />} >
        <Route path='newPackage' element={<NewPackage/>}/>
        <Route path='dashboard' element={<TodayPage />} />
        <Route path='listing' element={<ListingPage />} />
        <Route path='editPackage/:id' element={<EditPackagePage />} />
        <Route path='bookings' element={<BookingsPage />} />
        <Route path='newListing' element={<NewListing />} />
        <Route path='review' element={<ReviewsPage />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='editProfile' element={<EditProfilePage />} />
        <Route path='subscription' element={<SubscriptionPage />} />
        <Route path='paymentSuccess' element={<PaymentSuccess />} />
        <Route path='paymentFail' element={<PaymentFail />} />
        <Route path='notification' element={<NotificationPage />} />
        <Route path='inbox' element={<InboxPage />} />
        </Route>
        
    </Routes> 
  )
}

export default ProviderRoutes