import { useState, useEffect } from "react";
import { providerList } from "../../api/provider";
import { useNavigate } from "react-router-dom";

interface Package {
    _id: string,
    title: string,
    description: string,
    status: string,
    photos: string,
    isBlocked: boolean,
    price: number
}


const Listing = () => {
    const [packages, setpackages] = useState<Package[]>([])
    const navigate = useNavigate()

    useEffect(() => {
       const fetchPackageData = async () => {
        try {
            const res = await providerList()
            if(res?.data.success) {
                setpackages(res.data.getPackage)
            }
        } catch (error) {
            console.error(error);
            
        }
       }
       fetchPackageData()
    })
    const handleClick = async (id: string) => {
        try {
            navigate(`/provider/editPackage/${id}`)
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            {
                packages.length == 0 ? (
                    <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                        <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
                            No listings yet...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                                {packages.map((val) => {
                                    return (
                                        <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val._id}>
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                                                    src={val.photos[0]}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="absolute top-0 m-2 rounded-full bg-white">
                                                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-black sm:py-1 sm:px-3">
                                                    {val.status}
                                                </p>
                                            </div>
                                            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                                <p className="text-lg text-black font-semibold">{val.title}</p>
                                                <p className="text-sm text-black-500 ">{val.description}</p>
                                                <h3 className="mb-2 text-sm text-gray-400">₹{val.price} /head</h3>
                                            </div>
                                            <button onClick={() => handleClick(val._id)} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                                                <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                                                    Edit
                                                </div>
                                            </button>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            }
        </section>
  )
}

export default Listing