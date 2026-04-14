import React from 'react'
import accImg from '../../assets/Account/fotoperfil.jpg'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orders'


const ShoppingAccount = () => {
  return (
    <div  className='flex flex-col'>
      {/* <div className='relative h-[350px] w-full overflow-hidden'>
        <img 
        src={accImg} 
        className='h-full w-full object-cover object-center' />
      </div> */}
      <div className='container mx-auto grid-cols-1 gap-8 py-8'>
        <div className=' flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='orders'>
                My Purchases
              </TabsTrigger>
              <TabsTrigger value='address'>
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value='address'>
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount