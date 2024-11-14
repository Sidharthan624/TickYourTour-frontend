import userimg from '../../assets/user.png'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { providerLogout } from '../../store/slice/authSlice' 
import { providers } from '../../api/admin' 
import { blockProvider } from '../../api/admin' 

interface Provider {
    id: string,
    name: string,
    email: string,
    isBlocked: boolean,
    image: string,
    phone: string
}


function Providers() {
    const [provider, setProvider] = useState<Provider[]>([])
    const [block, setBlock] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const res = await providers()
                if(res?.data.success) {
                    setProvider(res.data.getProvider)
                }
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchProviderData()
    },[block])
    const handleBlock = async (id: string) => {
        try {
            const res = await blockProvider(id)
            if(res?.data.success) {
                dispatch(providerLogout())
                setBlock(!block)
                toast.success('Successfully changed access...')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>{provider.map((val) => {
                return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            <img
                                className="w-10 h-10 rounded-full"
                                src={val.image ? val.image : userimg}
                                alt="Jese image"
                            />
                        </th>
                        <td className="px-6 py-4">
                            <div className="ps-3">
                                <div className="text-base text-black font-semibold">
                                    {val.name}
                                </div>
                                <div className="font-normal text-gray-600">
                                    {val.email}
                                </div>
                                <div className="font-normal text-gray-600">
                                    {val.phone}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-4">
                                <button className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 " onClick={() => handleBlock(val.id)}>
                                    {val.isBlocked ? 'Unblock' : 'Block'}
                                </button>
                            </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Providers