import Navbar from "../../components/provider/Navbar";
import CreatePackageForm from "../../components/provider/createPackageForm";
import React from 'react'

const NewPackage = () => {
  return (
    <div>
        <Navbar/>
        <CreatePackageForm/>
    </div>
  )
}

export default NewPackage