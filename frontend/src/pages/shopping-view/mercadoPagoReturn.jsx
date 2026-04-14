import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/paymentSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

const MercadoPagoReturnPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('payment_id');
    const payerId = params.get('payerID');
    
    console.log(paymentId)
    

    useEffect(()=>{
        if (paymentId /*&& payerId*/){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
            dispatch(capturePayment({paymentId, /*payerId,*/ orderId})).then((data)=>{
                if(data?.payload?.success)
                    sessionStorage.removeItem('currentOrderId')
                window.location.href = '/shop/paymentSuccess'
            }
            )
        }
    },[paymentId,/* payerId,*/ useDispatch])

  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Processing Payment... Please Wait!
            </CardTitle>
        </CardHeader>
    </Card>
  )
}

export default MercadoPagoReturnPage