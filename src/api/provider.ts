import Api from "../services/axios";
import providerEndpoints from '../services/endpoints/providerEndpoints'

export const signup = async (name: string, email: string, password: string) => {
    try {
        const res = await Api.post(providerEndpoints.providerSignup, { name,email,password})
        const token = res.data.token
        localStorage.setItem('providerotp', token)
        return res
    } catch (error) {
        console.error(error);
        
    }
}

export const verifyOtp = async(otp: string) => {
    try {
        const token = localStorage.getItem('providerotp')
        const res = await Api.post(providerEndpoints.providerVerifyOtp,{ otp }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        localStorage.removeItem('providerotp')
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const otpResend = async () => {
    try {
        const token = localStorage.getItem('providerotp')
        const res = await Api.post(providerEndpoints.providerResendOtp, '', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        localStorage.setItem('providerotp',res.data.token)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(providerEndpoints.providerLogin, { email, password})
        return res
    } catch (error) {
        console.error(error);
        
    }
} 
export const profile = async () => {
    try {
        const res = await Api.get(providerEndpoints.providerProfile)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const logout = async () => {
    try {
        const res = await Api.post(providerEndpoints.providerLogout)
        return res
    } catch (error) {
        
    }
}
export const createPackage = async(formData: FormData) => {
    try {
        
        const res = await Api.post(providerEndpoints.providerCreatePackage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true,
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const editPackage = async (formData: FormData) => {
    try {
        const res = Api.post(providerEndpoints.providerEditPackage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const providerList = async () => {
    try {
        const res = await Api.get(providerEndpoints.providerList)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const editProfile = async (formData: FormData) => {
    try {
        const res = await Api.put(providerEndpoints.providerEditProfile, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getProviderConversation = async (providerId: string) => {
    try {
        const res = await Api.get(`${providerEndpoints.getConversations}?providerId=${providerId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const findUserById = async (id: string) => {
    try {
        const res = await Api.get(`${providerEndpoints.findUserById}?userId=${id}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getUser = async (userId: string) => {
    try {
        const res = await Api.get(`${providerEndpoints.providerGetUser}?userId=${userId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getBookingByProviderId = async (providerId: string) => {
    try {
        
        const res = await Api.get(`/book/getBookingByproviderId/${providerId}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const dasboard = async () => {
    try {
        const res = await Api.get(providerEndpoints.dasboard)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getMonthlySales = async () => {
    try {
        const res = await Api.get(providerEndpoints.getMonthlySales)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getMonthlyRevenue = async () => {
    try {
        const res = Api.get(providerEndpoints.geetMonthlyRevenue)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const addReply = async (rewieId: string, reply: string) => {
    try {
        const res = await Api.post(providerEndpoints.addReply,{rewieId, reply})
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const findPackageById = async (packageId: string) => {
    try {
        const res = await Api.get(`${providerEndpoints.findPackageById}?packageId=${packageId}`)
        return res
    } catch (error) {
        
    }
}
export const proceedForSubscription = async () => {
    try {
        const res = await Api.post(providerEndpoints.proceedForSubscription)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const cancelSubscription = async (providerId: string) => {
    try {
        const res = Api.post(providerEndpoints.cancelSubscription, { providerId})
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getNotification = async () => {
    try {
        const res = await Api.get(providerEndpoints.getNotification)
        return res
    } catch (error) {
        console.error(error);
        
    }
}