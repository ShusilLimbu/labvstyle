import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const ShoppingOrderDetailsView = ({orderDetails}) => {

    const {user} = useSelector(state=>state.auth)

  return (
    <DialogContent className='sm:max-w-[600px]'>
        <div className='grid gap-6'>
            <div className='grid gap-2'>
                <div className='flex mt-6 items-center justify-between'>
                    <p className='font-medium'>Order No.</p>
                    <Label>{orderDetails?._id}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Date</p>
                    <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Price</p>
                    <Label>Rs.{orderDetails?.totalAmount}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Method</p>
                    <Label>Khalti{orderDetails?.paymentMethod}</Label>
                </div>
                <div className='flex mt-2 items-center justify-between'>
                    <p className='font-medium'>Payment Status</p>
                    <Label>{orderDetails?.paymentStatus}</Label>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Status</p>
                    <Label>
                        <Badge className={`py-1 px-3 
                            ${orderDetails?.orderStatus === 'Confirmed' ? 
                            'bg-green-500' :
                            orderDetails?.orderStatus === 'Rejected' 
                            ? 'bg-red-800' :
                            orderDetails?.orderStatus === 'Pending' ?
                            'bg-yellow-400' : 
                            'bg-black'}`}>
                            {orderDetails?.orderStatus}
                        </Badge>
                    </Label>
                </div>
            </div>
            <Separator/>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Order Details</div>
                    <ul className='grid gap-3'>
                        {
                            orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                            orderDetails?.cartItems.map((item)=> 
                            <li className='flex items-center justify-between'>
                            <span>Product: {item.title}</span>
                            <span>Quantity: {item.quantity}</span>
                            <span>Price: Rs. {item.price}</span>
                        </li>
                        ) : null
                        }
                        
                    </ul>
                </div>
            </div>
            <div className='grid gap-4'>
                <div className='grid gap-2'>
                    <div className='font-medium'>Shipping Information</div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>Name: {user.userName}</span>
                        <span>Address: {orderDetails?.addressInfo?.address}</span>
                        <span>City: {orderDetails?.addressInfo?.city}</span>
                        <span>Postal Code: {orderDetails?.addressInfo?.pincode}</span>
                        <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                        <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                    </div>
                </div>
            </div>

        </div>
    </DialogContent>
  )
}

export default ShoppingOrderDetailsView