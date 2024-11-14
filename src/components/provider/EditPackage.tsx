import { useParams } from "react-router-dom";
import React, { useState,useEffect } from "react";
import { category } from "../../api/admin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { editPackage, findPackageById } from "../../api/provider";

interface Category {
    id: string,
    name: string,
    isHidden: boolean
}
interface Itenerary {
    value: string
}

const itineraryData = [
    { value: "Arrival and hotel check-in" },
    { value: "Welcome dinner with local cuisine" },
    { value: "City tour with visits to main attractions" },
    { value: "Guided museum or historical site visit" },
    { value: "Adventure activity (hiking, biking, etc.)" },
    { value: "Boat cruise or lake/river excursion" },
    { value: "Cultural experience (local market, festival, etc.)" },
    { value: "Beach day with water activities" },
    { value: "Wildlife safari or nature reserve visit" },
    { value: "Free time for shopping or leisure" },
    { value: "Day trip to nearby village or town" },
    { value: "Sunset viewing at a scenic spot" },
    { value: "Spa or wellness experience" },
    { value: "Mountain or nature trail hike" },
    { value: "Farewell dinner with entertainment" },
    { value: "Final day breakfast and check-out" },
    { value: "Transfer to airport or next destination" }
  ];

  
  const EditProperty = () => {

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [destination, setDestination] = useState('');
const [price, setPrice] = useState(0);
const [categoryForm, setCategoryForm] = useState('');
const [duration, setDuration] = useState(0);
const [groupSize, setGroupSize] = useState(0); 
const [itineraries, setItinerary] = useState<Itenerary[]>([]);
const [photos, setPhotos] = useState<File[]>([]); 
const [transportation, setTransportation] = useState('');
const [accommodation, setAccommodation] = useState('');
const [categories, setCategories] = useState<Category[]>([]);

const navigate = useNavigate()
const { id } = useParams()

useEffect(() => {
    const fetchCategoriesData = async () => {
        try {
            const res = await category()
            if(res?.data.success) {
                setCategories(res.data.getCategory)
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    fetchCategoriesData()
},[])
useEffect(() => {
    const fetchPackageData = async () => {
        try {
            if(id) {
                const res = await findPackageById(id)
                if(res?.data.success) {
                  console.log(res.data.data)                 
                    setTitle(res.data.data.title)
                    setDescription(res.data.data.description)
                    setPrice(res.data.data.price)
                    setAccommodation(res.data.data.accommodation)
                    setCategoryForm(res.data.data.category)
                    setDestination(res.data.data.destination)
                    setDuration(res.data.data.duration)
                    setGroupSize(res.data.data.groupSize)
                    setItinerary(res.data.data.itinerary)
                    setPhotos(res.data.data.photos)
                    setTransportation(res.data.data.transportation)
                    
                }
            }
        } catch (error) {
            console.error(error);
            
        }
    }
    fetchPackageData()
    console.log(photos);
    
    
},[id])
const handleItineraryChange = (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
    const itinerary = { value: event.target.value }
    const updatedItinerary = [...itineraries]
    if(isChecked) {
        updatedItinerary.push(itinerary)
    } else {
        const index = updatedItinerary.findIndex(existingItinerary => existingItinerary.value === itinerary.value)
        if(index !== -1) {
            updatedItinerary.splice(index, 1)
        }
    }
    setItinerary(updatedItinerary)
}
console.log(itineraries);

const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files
    if(selectedFile) {
        const filesArray = Array.from(selectedFile) as File[]
        setPhotos(filesArray)
    }
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault()
        if(title.trim().length < 3) {
            toast.error('Title should have more than 3 characters !!')
            return
        } else if(description.trim().length < 5) {
            toast.error('Description should have atleast 5 characters')
            return
        }
        const formData = new FormData()
        if(id) {
            formData.append('id', id)
        }
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price.toString())
        formData.append('category', categoryForm)
        formData.append('transportation', transportation)
        formData.append('duration', duration.toString())
        formData.append('groupSize', groupSize.toString())
        formData.append('accommodation', accommodation)
        
        itineraries.forEach((itinerary, index) => 
            formData.append(`itineararis[${index}]`, JSON.stringify(itinerary))
    )
    photos.forEach((file) => {
        formData.append('photos', file)
    })
    const res = await editPackage(formData)
    if(res?.data.success) {
        toast.success('Package updated successfully...')
        navigate('/provider/listing')
    } else {
        toast.error('Something went wrong...')
    }
    } catch (error) {
        console.error(error);
        
    }
}

    return (
        <div className="flex min-h-screen justify-center items-center mt-20">
        <form className="max-w-md mx-auto w-3/4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="floating_description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              rows={Number("3")}
            ></textarea>
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="floating_description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              rows={Number("3")}
            ></textarea>
            <label
              htmlFor="floating_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Destination
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              name="floating_price"
              id="floating_price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="floating_price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Price per head(₹)
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-900">Select Category: </legend>
              {
                categories.map((val) => {
                  return (
                    <div className={`flex items-center ${val.isHidden && 'hidden'} `}>
                      <input
                        type="radio"
                        id={`${val.name}`}
                        name="category"
                        value={val.name}
                        className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                        checked={categoryForm === val.name}
                        onChange={(e) => setCategoryForm(e.target.value)}
                      />
                      <label htmlFor={`${val.id}`} className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                        {val.name}
                      </label>
                    </div>
                  )
                })
              }
  
            </fieldset>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="string" 
              name="guest_capacity"
              id="guest_capacity"
              value={transportation}
              onChange={(e) => setTransportation(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="" 
            />
            <label
              htmlFor="guest_capacity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Transportation
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="guest_capacity" 
              id="guest_capacity"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="guest_capacity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Duration
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="guest_capacity" 
              id="guest_capacity"
              value={groupSize}
              onChange={(e) => setGroupSize(parseInt(e.target.value))}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="guest_capacity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Group size
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <fieldset className="space-y-2">
              <legend className="text-sm text-gray-900 font-semibold">Itineraries (select all that apply):</legend>
              {itineraryData.map((amenity) => (
                <div key={amenity.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity_${amenity.value}`}
                    name="amenities[]"
                    value={amenity.value}
                    className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                    onChange={(event) => handleItineraryChange(event.target.checked, event)}
                  />
                  <label htmlFor={`amenity_${amenity.value}`} className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                    {amenity.value}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <>
              <label
                className="block mb-2 text-sm text-gray-900 font-semibold"
                htmlFor="multiple_files"
              >
                Upload Images
              </label>
              <input
                name='images'
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                onChange={handleImage}
                type="file"
                multiple
              />
            </>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
  
  export default EditProperty
  