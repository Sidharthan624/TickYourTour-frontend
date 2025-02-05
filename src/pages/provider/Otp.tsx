import { useState, useEffect, MouseEvent } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../api/provider";
import { useDispatch } from "react-redux";
import { setProviderCredentials } from "../../store/slice/authSlice";
import { otpResend } from "../../api/provider";

import React from 'react'

const Otp = () => {
    const [otp, setOtp] = useState('')
    const [seconds, setSeconds] = useState(59)
    const [resendOtp, setResendOtp] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => {
            if(prevSeconds === 0) {
                clearInterval(interval)
                setResendOtp(true)
                return 0
            }
            return prevSeconds - 1
        })
        
      }, 1000)
      return () => clearInterval(interval)
    },[seconds])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(otp.trim().length !==4) {
                toast.error("OTP is not valid")
                return
            }
            const res = await verifyOtp(otp)
            if(res?.data.saveProvider.success) {
                dispatch(setProviderCredentials(res.data.token))
                toast.success
                navigate('/provider/login')
            } else if(!res?.data.saveProvider.success) {
                toast.error(res?.data.message)
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    const handleResendOtp = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const res = await otpResend()
        setResendOtp(false)
        setSeconds(59)
        if(res?.data.success) {
            toast.success('new otp sent...')
        } else if(!res?.data.success) {
            toast.error('Something went wrong')
        }
    }
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-full md:max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col justify-center space-y-5 p-6">
            <div className="flex flex-col space-y-2 text-center">
                <h6 className="md:text-2xl font-bold text-left">Verify OTP</h6>
            </div>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="px-3 py-2 md:px-4 md:py-3 border-2 border-black-500 rounded-lg font-medium placeholder:font-normal"
                />
                <div className="flex justify-between items-center">
                    {!resendOtp && (
                        <p>
                            Time remaining 00:{seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    )}
                </div>
                {!resendOtp ? (
                    <button
                        type="submit"
                        className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-blue-500 bg-blue-500 text-white"
                    >
                        Confirm
                    </button>
                ) : (
                    <button
                        onClick={handleResendOtp}
                        className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-blue-500 bg-blue-500 text-white"
                    >
                        Resend OTP
                    </button>
                )}
            </form>
        </div>
    </div>
</div>
  )
}

export default Otp