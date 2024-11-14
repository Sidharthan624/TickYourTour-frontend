import { Routes, Route } from 'react-router-dom'
import Login from '../pages/admin/Login'
import Home from '../pages/admin/Home'
import CategoryPage from '../pages/admin/CategoryPage'
import CategoryForm from '../pages/admin/CategoryForm'
import EditCategory from '../components/admin/EditCategory'
import User from '../pages/admin/User'
import ProviderPage from '../pages/admin/ProviderPage'
import PackagePage from '../pages/admin/PackagePage'
import BookingsPage from '../pages/admin/BookingsPage'
import RequestPage from '../pages/admin/RequestPage'
import RequestDetailsPage from '../pages/admin/RequestDetailsPage'
import AdminLoggedIn from '../components/admin/AdminLoggedIn'
import AdminLoggedOut from '../components/admin/AdminLoggedOut'

const adminRoutes = () => {
  return (
<Routes>
  <Route path='' element={<AdminLoggedOut />} >
  
     <Route path='login' element={<Login/>} />
  </Route>
  <Route path='' element={<AdminLoggedIn />} >
    <Route path='dashboard' element={<Home/>} />
    <Route path='category' element={<CategoryPage />} />
    <Route path='addCategory' element={<CategoryForm />} />
    <Route path='editCategory/:id' element={<EditCategory />} />
    <Route path='user' element={<User />} />
    <Route path='host' element={<ProviderPage />} />
    <Route path='package' element={<PackagePage />} />
    <Route path='booking' element={<BookingsPage />} />
    <Route path='request' element = {<RequestPage />} />
    <Route path='requestDetails/:id' element={<RequestDetailsPage />} />
    
  </Route>
</Routes>
  )
}

export default adminRoutes