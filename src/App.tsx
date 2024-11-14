import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserRoutes from "./routes/UserRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderRoutes from "./routes/ProviderRoutes";
import AdminRoutes from "./routes/adminRoutes";

function App() {
 

  return (
   <>
   <ToastContainer/>
   <Router>
    <Routes>
      <Route path="/*" element = {<UserRoutes />}/>
      <Route path="/provider/*" element = {<ProviderRoutes/>}/>
      <Route path="/admin/*" element={<AdminRoutes/>}/>
    </Routes>
   </Router></>
  )
}

export default App
