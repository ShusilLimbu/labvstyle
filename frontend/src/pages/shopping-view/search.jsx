import ProductDetailsDialog from '@/components/shopping-view/productDetails';
import ShoppingProductTile from '@/components/shopping-view/productTile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { fetchCartItems } from '@/store/shop/cartSlice';
import { fetchProductDetails } from '@/store/shop/productSlice';
import { getSearchResults, resetSearchResult } from '@/store/shop/searchSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {

  const [keyword, setKeyword] = useState('');
  const [openDetailsDialog,setOpenDetailsDialog]= useState(false);
  const [searchParamas, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {searchResults} = useSelector((state)=>state.shopSearch);
  const {cartItems} = useSelector((state)=>state.shopCart);
  const {productDetails} = useSelector((state)=>state.shopProducts)
  const {user} = useSelector((state)=>state.auth);
  const {toast} = useToast();

  useEffect(()=>{
    if(keyword && keyword.trim() !== '' && keyword.trim().length >3)
    {
       setTimeout(()=>{
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(getSearchResults(keyword))
    },1000)
    }
     else{
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
      dispatch(resetSearchResult())
     }
  },[keyword])

  function handleAddToCart(getCurrentProductId, getTotalStock){
    let getCartItems = cartItems || [];
  
    if(getCartItems.length){
      const indexOfCurrentItems = getCartItems.findIndex(item=>item.productId === getCurrentProductId);
      if(indexOfCurrentItems > -1){
        let getQuantity = getCartItems[indexOfCurrentItems].quantity;
        if(getQuantity + 1 > getTotalStock){
          toast({
            title:`You can add a maximum of ${getQuantity} of this item`,
            variant: 'destructive'
          });
          return;
        }
      }
      
    }
    dispatch(
      addToCart({
        userId: user?.id, 
        productId: getCurrentProductId, 
        quantity: 1})
      ).then((data) => {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title: 'Product Added to Cart'
        })
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(()=>{
    if (productDetails !== null) setOpenDetailsDialog(true);
  },[productDetails])

  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
        <div className='w-full flex items-center'>
          <Input
            value={keyword} 
            name='keyword' 
            onChange={(event)=>setKeyword(event.target.value)} 
            className='py-6' 
            placeholder = 'Search Product...'
          />
        </div>
      </div>
      {
        !searchResults.length ? (<h1 className='text-5xl font-extrabold'>No Matches Found</h1>) : null
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {
          searchResults.map((item)=>(
          <ShoppingProductTile 
            key={item.id}
            handleAddToCart={handleAddToCart} 
            product={item}
            handleGetProductDetails={handleGetProductDetails}
            />))
        }
      </div>
      <ProductDetailsDialog
        open = {openDetailsDialog}
        setOpen = {setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  )
}

export default SearchProducts