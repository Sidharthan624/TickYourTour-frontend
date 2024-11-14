import React, { useState} from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { login } from '../../api/admin'
import { useNavigate } from 'react-router-dom'
import { setAdminCredentials } from '../../store/slice/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(email)) {
                toast.error('Please enter a valid email')
                return 
            } else if(password.trim().length < 6) {
                toast.error('Please enter valid password')
                return
            }
            const res = await login(email, password)
            if(res?.data.success) {
                dispatch(setAdminCredentials(res.data.token))
                toast.success('Sign in successfull...')
                navigate('/admin/dashboard')
            } else if(!res?.data.success) {
                toast.error(res?.data.message)
                console.log(res);
                
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
            <div className="flex shadow-md">
                <div
                    className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
                    style={{ width: "24rem", height: "24rem" }}
                >
                    <div className="w-72">
                        <h1 className="text-xl font-semibold">Welcome back admin</h1>
                        <small className="text-gray-400">
                            Welcome back! Please enter your details
                        </small>
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
                            <div className="mb-3">
                                <button className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md">
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login