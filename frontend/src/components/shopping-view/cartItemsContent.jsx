import { Button } from '../ui/button';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartQuantity } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

const UserCartItemsContent = ({cartItem}) => {

  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state)=>state.shopCart);
  const { productList } = useSelector((state)=>state.shopProducts);
  const {toast} = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction){

    if(typeOfAction==='plus'){
      
    let getCartItems = cartItems || [];

  if(getCartItems.lenght){
    const indexOfCurrentCartItems = getCartItems.findIndex(item=>item.productId === getCartItem?.productId);

    const getCurrentProductIndex = productList.findIndex(product => product.id === getCartItem?.productId);
    
    const getTotalStock = productList[getCurrentProductIndex].totalStock;

    if(indexOfCurrentCartItems > -1){
      let getQuantity = getCartItems[indexOfCurrentCartItems].quantity;
      if(getQuantity + 1 > getTotalStock){
        toast({
          title:`Can be added ${getQuantity} Maximum of this item`,
          variant: 'destructive'
        });
        return;
      }
    }
    
  }

    }

    dispatch(updateCartQuantity({
      userId: user?.id, 
      productId: getCartItem?.productId, 
      quantity: 
      typeOfAction === 'plus' ?
      getCartItem?.quantity + 1 : 
      getCartItem?.quantity - 1 
    })).then((data)=>{
      if(data?.payload?.success) {
        toast({
          title: 'Quantity Updated'
        })
      }
    })
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId}))
      .then((data)=>{
      if(data?.payload?.success) {
        toast({
          title: 'Product Removed'
        })
      }
    });
  }

  return (
    <div className='flex items-center space-x-4' >
      <img 
        src={cartItem?.image} 
        alt={cartItem?.title} 
        className='w-20 h-20 rounded object-cover'
        />
      <div className='flex-1'>
        <h3 className="font-extrabold">{cartItem?.title}</h3>
      <div className='flex items-center gap-2 mt-1'>
        <Button 
          variant='outline' 
          className='w-8 h-8 rounded-full' 
          size='icon'
          disabled={cartItem?.quantity === 1}
          onClick={()=>handleUpdateQuantity(cartItem,'minus')}
          >
          <Minus className='w-4 h-4'/>
          <span className='sr-only'>Remove</span>
        </Button>
        <span className='font-semibold' >{cartItem?.quantity}</span>
        <Button
          variant='outline' 
          className='w-8 h-8 rounded-full' 
          size='icon'
          onClick={()=>handleUpdateQuantity(cartItem,'plus')}
          >
          <Plus className='w-4 h-4'/>
          <span className='sr-only'>Add</span>
        </Button>
      </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-semibold' >
          Rs.
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * 
            cartItem?.quantity).toFixed(2)}
            </p>
            <Trash onClick={()=>handleCartItemDelete(cartItem)} className='cursor-pointer mt-1' size={20}/>
      </div>
    </div>
    
  );
}

export default UserCartItemsContent