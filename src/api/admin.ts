import Api from "../services/axios";
import AdminEndPoints from '../services/endpoints/adminEndpoints'


export const login = async (email: string, password: string) => {
    try {
        const res = await Api.post(AdminEndPoints.adminLogin, { email, password })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const adminLogout = async () => {
    try {
        const res = await Api.post(AdminEndPoints.adminLogout)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const users = async () => {
    try {
        const res = await Api.get(AdminEndPoints.adminUser)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const blockUser = async (id: string) => {
    try {
        const res = await Api.post(`${AdminEndPoints.blockUser}/${id}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const providers = async () => {
   try {
    const res = await Api.get(AdminEndPoints.adminProvider)
    return res
   } catch (error) {
    console.error(error);
    
   }
}
export const blockProvider = async (id: string) => {
    try {
        const res = await Api.post(`${AdminEndPoints.blockProvider}/${id}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const addCategory = async (name: string, description: string) => {
    try {
        const res = await Api.post(AdminEndPoints.addCategory, { name, description})
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const editCategory = async (id: string, name: string, description: string) => {
    try {
        const res = await Api.post(AdminEndPoints.adminEditCategory, { id, name, description })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const category = async () => {
    try {
        const res = await Api.get(AdminEndPoints.adminCategory)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const hideCategory = async (id: string) => {
    try {
        const res = await Api.post(AdminEndPoints.hideCategory, { id })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const adminPackage = async () => {
    try {
        const res = await Api.get(AdminEndPoints.adminPackage)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const changePackageStatus = async (id: string, status: string) => {
    try {
        const res = await Api.post(AdminEndPoints.packageStatusChange, { id, status })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const hidePackage = async (id: string) => {
    try {
        const res = await Api.post(AdminEndPoints.hidePackage, { id })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const findCategory = async (id: string) => {
    try {
        const res = await Api.get(`${AdminEndPoints.findCategory}?id=${id}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getBooking = async () => {
    try {
        const res = await Api.get(AdminEndPoints.getBooking)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const fetchBooking = async (filter: string) => {
    try {
        const res = Api.get(`${AdminEndPoints.fetchBooking}?filter=${filter}`)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const dasboard = async () => {
    try {
        const res = await Api.get(AdminEndPoints.dasboard)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getMonthlySales = async () => {
    try {
        const res = await Api.get(AdminEndPoints.getMonthlySales)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const getMonthlyRevenue = async () => {
    try {
        const res = await Api.get(AdminEndPoints.getMonthlyRevenue)
        return res
    } catch (error) {
        console.error(error);
        
    }
}
export const packageRequest = async () => {
   try {
    const res = await Api.get(AdminEndPoints.packageRequest)
    return res
   } catch (error) {
    console.error(error);
    
   }
}
export const addNotification = async (providerId: string, status: string, id: string) => {
    try {
        const res = await Api.post(AdminEndPoints.addNotification, { providerId, status, id })
        return res
    } catch (error) {
        console.error(error);
        
    }
}
