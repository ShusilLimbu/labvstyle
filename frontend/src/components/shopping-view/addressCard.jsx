import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo , handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress,selectId}) => {
  return (
    <Card 
    onClick={()=>setCurrentSelectedAddress ? setCurrentSelectedAddress(addressInfo): null} 
    className={`cursor-pointer border-red-700 ${selectId?._id === addressInfo?._id ? 'border-red-900 border-[3px]' : 'border-black'}`}>
        <CardContent className={`${selectId === addressInfo?._id ? 'border-black': ''} grid gap-4 p-4`}>
            <Label>Address: {addressInfo.address}</Label>
            <Label>City: {addressInfo.city}</Label>
            <Label>Postal Code: {addressInfo.pincode}</Label>
            <Label>Telephone: {addressInfo.phone}</Label>
            <Label>Notes: {addressInfo.notes}</Label>
        </CardContent>
        <CardFooter className='p-3 flex justify-between'>
            <Button onClick={()=>{handleEditAddress(addressInfo)}}>Edit</Button>
            <Button onClick={()=>{handleDeleteAddress(addressInfo)}}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard