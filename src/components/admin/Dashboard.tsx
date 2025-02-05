import {useState, useEffect} from 'react'
import { dasboard } from '../../api/admin'
import MonthlySales from './MonthlySales'
import MonthlyRevenue from './MonthlyRevenue'


const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalProviders, setTotalProviders] = useState(0)
  const [totalPackages, setTotalPackages] = useState(0)
  const [blockedUsers, setBlockedUsers] = useState(0)
  const [blockedProviders, setBlockedProviders] = useState(0)
  const [rejectedPackages, setRejectedPackages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await dasboard()
      if(res?.data.success) {
        setTotalUsers(res.data.data.totalUsers)
        setTotalProviders(res.data.data.totalProviders)
        setTotalPackages(res.data.data.totalPackages)
        setBlockedProviders(res.data.data.blockedProviders)
        setRejectedPackages(res.data.data.rejectedPackages)
        setBlockedUsers(res.data.data.blockedUsers)
      }
    }
    fetchData()
  }, [])
  return (
    <>
    {/* Content */}
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{totalUsers}</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Total Users</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{totalProviders}</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Total Providers</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">{totalPackages}</div>
              <div className="text-sm font-medium text-gray-400">Total Packages</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{blockedUsers}</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Blocked Users</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">{blockedProviders}</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Blocked Providers</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-2xl font-semibold mb-1">{rejectedPackages}</div>
              <div className="text-sm font-medium text-gray-400">Rejected Packages</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-4">
        <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
          <div className="rounded-t mb-0 px-0 border-0">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                  Monthly Sales
                </h3>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <MonthlySales />
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-4 mt-2">
        <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
          <div className="rounded-t mb-0 px-0 border-0">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                  Monthly Revenue
                </h3>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <MonthlyRevenue />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Content */}
  </>
  )
}

export default Dashboard