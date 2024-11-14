import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { login } from '../../api/user';
import { setCredentials } from '../../store/slice/authSlice';
import GoogleSignup from '../../components/user/GoogleSignup';

const Login = () => {
    const [email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
               toast.error('Please enter a valid email')
               return 
            } else if(password.trim().length > 8) {
                toast.error('Password should be 8 characters long')
                return
            }
            const res = await login(email, password)
            if(res?.data.success) {
                dispatch(setCredentials(res.data.token))
                toast.success('Successfully logged in')
                navigate('/')
            } else if(!res?.data.success) {
                toast.error(res?.data.message)
            }
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      {/* <!-- Login component --> */}
      <div className="flex shadow-md">
        {/* <!-- Login form --> */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: "24rem", height: "32rem" }}
        >
          <div className="w-72">
            {/* <!-- Heading --> */}
            <Link to='/' className='text-xl font-bold text-blue-900'>Tick Your Tour</Link><br></br>
            <small className="text-gray-400">
              Welcome back! Please enter your details
            </small>
            {/* <!-- Form --> */}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-900"
                />
              </div>
              <Link to='/forgotPassword'>
                <p className="text-xs font-bold text-blue-600 font mb-1">Forgot password?</p>
              </Link>
              <div className="mb-3">
                <button className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md">
                  Log in
                </button>
                <GoogleSignup userLogin={true} user={true} />
              </div>
            </form>
            {/* <!-- Footer --> */}
            <div className="text-center">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have an account?
              </span>
              <Link
                to="/signup"
                className="text-xs font-semibold text-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login