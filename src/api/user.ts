import Api from '../services/axios'
import userEndpoints from '../services/endpoints/userEndPoints'

interface BookingDetails {
    _id: string,
    userId: string,
    packageId: string,
    bookingDate: Date,
    endDate: Date,
    startDate: Date,
    paymentSuccess: false
}

export const signup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(userEndpoints.userSignUp,{ name, email, password })
        const token = res.data.token
        console.log(token);
        
        localStorage.setItem('userotp', token)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const forgotPassword = async (email: string) => {
    try {
        const res = await Api.post(userEndpoints.userForgotPassword, {email})
        const token = res.data.token
        localStorage.setItem('userForgotPassword', token)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const verifyOtp = async (otp: string) => {
   try {
    const token = localStorage.getItem('userotp')
    const res = await Api.post(userEndpoints.userVerifyOtp, {otp},{
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    if(res.data.success) {
        localStorage.removeItem('userotp')
    }
    return res
   } catch (error) {
    console.error(error);
    
   }
}
export const verifyOtpForgotPassword = async (otp: string) => {
    try {
        const token = localStorage.getItem('userForgotPassword')
        const res = await Api.post(userEndpoints.userVerifyOtpForgotPassword,{otp},{
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const resendOtp = async () => {
    try {
        const token = localStorage.getItem('userotp')
        const res = await Api.post(userEndpoints.userResendOtp, '', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        } )
        const newToken = res.data.token
        localStorage.setItem('userotp', newToken)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const resetPassword = async (email: string, password: string) => {
    try {
        const token = localStorage.getItem('userForgotPassword')
        const res = await Api.post(userEndpoints.userResetPassword, { email, password }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        if(res.data.success) {
            localStorage.removeItem('userForgotPassword')
        }
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(userEndpoints.userLogin, { email, password })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const userLogout = async () => {
    try {
        const res = await Api.post(userEndpoints.userLogout)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const gSignUp = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(userEndpoints.userGsignup, { name, email, password })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const profile = async () => {
    try {
        const res = await Api.get(userEndpoints.userProfile)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const editProfile = async (formData: FormData) => {
    try {
        const res = await Api.put(userEndpoints.userEditProfile, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const singlePackageList = async (id: string) => {
    try {
        const res = await Api.get(userEndpoints.singlePackage(id), {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        return res
    } catch (error) {
        
    }
}
export const getMessages = async (conversationId: string) => {
    try {
        const res = await Api.get(`${userEndpoints.userGetMessages}?conversationId=${conversationId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const newConversation = async(providerId: string) => {
    try {
        const res = await Api.post(`${userEndpoints.userNewConversation}?providerId=${providerId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const newMessage = async(message: string, conversationId: string, providerId: string) => {
    try {
        const res = await Api.post(userEndpoints.userNewMessage, { message, conversationId, senderId: providerId})
        return res
    } catch (error) {
        
    }
}
export const newImageMessage = async(formData: FormData) => {
    try {
        const res = await Api.post(userEndpoints.userNewImageMessage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const newVideoMessage = async (formData: FormData) => {
    try {
        const res = await Api.post(userEndpoints.userNewVideoMessage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const book = async(id: string, userId: string, startDate: string, endDate: string) => {
    try {
        const res = await Api.post(userEndpoints.userBook, { packageId: id, userId: userId, startDate: startDate, endDate: endDate})
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getCheckout = async(bookingId: string) => {
    try {
        const res = await Api.get(userEndpoints.getCheckout(bookingId))
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const proceedForPayment = async (booking: BookingDetails) => {
    try {
        const res = await Api.post(userEndpoints.userProceedForPayment, { bookingDetails: booking })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const saveSession = async (sessionId: string, bookingId: string) => {
    try {
        const res = await Api.post(userEndpoints.userSaveSession, { sessionId, bookingId })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getBooking = async (userId: string, page: number, limit: number) => {
    try {
        const res = await Api.get(`${userEndpoints.userGetBookings}?userId=${userId}&page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const cancelBooking = async (bookingId: string) => {
    try {
        const res = await Api.post(userEndpoints.userCancel, { bookingId })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const fetchPackages = async (searchTerm: string, sortOption: string, selectedCategory: string, page: number, limit: number) => {
    try {
        const res = await Api.get(`${userEndpoints.userFetchPackage}?searchTerm=${searchTerm}&sortOption=${sortOption}&selectedCategory=${selectedCategory}&page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const rate = async (bookingId: string, rating: number, review: string, userId: string) => {
    try {
        const res = await Api.post(userEndpoints.userRate, { bookingId, rating, review, userId })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getRatings = async (id: string) => {
    try {
        const res = await Api.get(`${userEndpoints.userGetRatings}?id=${id}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getProvider = async (providerId: string) => {
    try {
        const res = await Api.get(`${userEndpoints.getProvider}?providerId=${providerId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const findRateById = async (bookingId: string) => {
    try {
        const res = await Api.get(`${userEndpoints.findRateById}?bookingId=${bookingId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const editRate = async (bookingId: string, rating: number, review: string, userId: string) => {
    try {
        const res = await Api.post(userEndpoints.editRate, { bookingId, rating, review, userId })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getBookingDetails = async (bookingId: string) => {
    try {
        const res = await Api.get(`${userEndpoints.getBookingDetails}?bookingId=${bookingId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const findUser = async () => {
    try {
        const res = Api.get(userEndpoints.findUser)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
