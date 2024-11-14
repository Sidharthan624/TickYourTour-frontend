import { Routes, Route } from "react-router-dom"
import SignUp from "../pages/user/SignUp"
import Otp from "../pages/user/Otp"
import Login from "../pages/user/Login"
import Home from "../pages/user/Home"
import UserLoggedOut from "../components/user/UserLoggedOut"
import AboutPage from "../pages/user/AboutPage"
import PackagePage from "../pages/user/PackagePage"
import ContactPage from "../pages/user/ContactPage"
import UserLoggedIn from "../components/user/UserLoggedIn"
import ProfilePage from "../pages/user/ProfilePage"
import EditProfilePage from "../pages/user/EditProfilePage"
import BookingPage from "../pages/user/BookingPage"
import SinglePackagePage from "../pages/user/SinglePackagePage"
import CheckoutPage from "../pages/user/CheckoutPage"
import PaymentSuccess from "../pages/user/PaymentSuccess"
import PaymentFail from "../pages/user/PaymentFail"
import TripsPage from "../pages/user/TripsPage"
import RatingPage from "../pages/user/RatingPage"
import EditRatingPage from "../pages/user/EditRatingPage"
import BookingDetailsPage from "../pages/user/BookingDetailsPage"
import Error from "../pages/user/Error"

const UserRoutes = () => {
  return (
   <Routes>
    <Route path="" element={<Home/>}/>
    <Route path="about" element={<AboutPage/>}/>
    <Route path="contact" element={<ContactPage/>} />
    <Route path="packages" element={<PackagePage/>}/>
    <Route path="" element={<UserLoggedOut/>}>
    <Route path="signup" element={<SignUp/>}/>
    <Route path="otp" element={<Otp user={false}/>}/>
    <Route path="login" element={<Login/>}/>
    </Route>
    <Route path="" element={<UserLoggedIn />}>
    <Route path="profile" element={<ProfilePage/>}/>
    <Route path="editProfile" element={<EditProfilePage/>} />
    <Route path="booking" element={<BookingPage />} />
    <Route path="singlePackage/:id" element={<SinglePackagePage/>}/>
    <Route path="checkout/:id" element={<CheckoutPage/>}/>
    <Route path="paymentSuccess" element={<PaymentSuccess/>} />
    <Route path="paymentFail" element={<PaymentFail/>} />
    <Route path="trips" element={<TripsPage />} />
    <Route path="rating/:bookingId" element={<RatingPage />} />
    <Route path="editRating/:bookingId" element={<EditRatingPage />}/>
    <Route path="bookingDetails/:bookingId" element={<BookingDetailsPage/>}/>
    </Route>
    <Route path="*" element={<Error/>}/>

    

   </Routes>
  )
}

export default UserRoutes