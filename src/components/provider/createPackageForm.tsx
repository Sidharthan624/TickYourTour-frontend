import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPackage } from "../../api/provider";
import { useNavigate } from "react-router-dom";
import React from 'react';

const CreatePackageForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0); // Change to number
  const [destination, setDestination] = useState(''); // New field
  const [groupSize, setGroupSize] = useState(0); // Changed from guestCapacity
  const [itinerary, setItinerary] = useState('');
  const [transportation, setTransportation] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);  
      setImages(selectedFiles);
    }
  };
  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (price <= 0) {
      toast.error('Price must be greater than zero');
      return false;
    }
    if (duration <= 0) {
      toast.error('Duration must be greater than zero');
      return false;
    }
    if (!destination.trim()) {
      toast.error('Destination is required');
      return false;
    }
    if (groupSize <= 0) {
      toast.error('Group size must be greater than zero');
      return false;
    }
    if (!itinerary.trim()) {
      toast.error('Itinerary is required');
      return false;
    }
    if (!transportation.trim()) {
      toast.error('Transportation details are required');
      return false;
    }
    if (!accommodation.trim()) {
      toast.error('Accommodation details are required');
      return false;
    }
    if (images.length === 0) {
      toast.error('At least one image is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    try {
      e.preventDefault();
      if (!validateForm()) return;
    
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('duration', duration.toString()); // Ensure it's a string
      formData.append('destination', destination); // Append destination
      formData.append('groupSize', groupSize.toString()); // Append groupSize
      formData.append('itinerary', itinerary);
      formData.append('transportation', transportation);
      formData.append('accommodation', accommodation); 

      
      images.forEach((file) => {
        formData.append('image', file); 
      });
      
      console.log(formData);
      
      const res = await createPackage(formData);
      console.log(res);
      if (res?.data.success) {
        toast.success('Package created successfully');
        setTitle('');
        setDescription('');
        setDestination('')
        setPrice(0);
        setDuration(0);
        setGroupSize(0);
        setItinerary('');
        setTransportation('');
        setImages([]);
        setAccommodation('')
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
      } else {
        toast.error('Something went wrong');
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during submission');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Create Package</h2>

      <div>
        <label className="block text-gray-600 mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter package title"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the package"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter price"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Duration (in days):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter duration"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter destination"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Group Size:</label>
        <input
          type="number"
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter group size"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Itinerary:</label>
        <textarea
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Outline the itinerary"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Transportation:</label>
        <input
          type="text"
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Transportation details"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Accommodation:</label>
        <input
          type="text"
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Accommodation details"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Images:</label>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default CreatePackageForm;
