import {SmartphoneNfcIcon,EarIcon ,HeadsetIcon,WatchIcon,BluetoothIcon} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails} from '@/store/shop/productSlice'
import ShoppingProductTile from '@/components/shopping-view/productTile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice'
import ProductDetailsDialog from '@/components/shopping-view/productDetails'
import { getFeatureImages } from '@/store/commonSlice'

const categoriesWithIcon = [
    {id: 'earbuds', label: 'Earbuds', icon: BluetoothIcon},
    {id: 'earphones', label: 'Earphones', icon: EarIcon},
    {id: 'watches', label: 'Watches', icon: WatchIcon},
    {id: 'soundbars', label: 'Soundbars', icon: SmartphoneNfcIcon},
    {id: 'headsets', label: 'Headsets', icon: HeadsetIcon},
  ]

  const brand = [
      { id: "ultima", label: "Ultima" },
      { id: "boat", label: "Boat" },
      { id: "jbl", label: "JBL" },
      { id: "kick", label: "Kick" },
      { id: "gravity", label: "Gravity" },
    ]


const ShoppingHome = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const {productList, productDetails} = useSelector((state)=> state.shopProducts);
  const {featureImageList} = useSelector((state)=>state.commonFeature)

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();


  function handleNavigateToListingPage(getCurrentItem, section){
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddToCart(getCurrentProductId){
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

  useEffect(()=> {
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails]);

  
  useEffect(()=>{
    if (!featureImageList || featureImageList.length === 0) return; 
    const timer = setInterval(()=>{
      setCurrentSlide((prevSlide)=> (prevSlide + 1) % featureImageList.length)
    },3000)

    return () => clearInterval(timer);
  },[featureImageList])
  
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts({filterParams:{}, sortParams:'price-lowtohight'}))
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getFeatureImages());
  },[dispatch])

  return (
    <div className = 'flex flex-col min-h-screen'>
      <div className = 'flex flex-col relative w-[640px] h-[300px] md:w-full md:h-[600px] overflow-hidden bg-slate-200'>
        <div className='h-[520px] w-[520px] bg-yellow-400 rotate-45 ml-40 rounded-3xl'></div>
        <h3 className=' absolute text-2xl font-bold md:text-6xl lg:text-7xl w-[600px] pt-4 md:pt-20 pl-0 md:pl-64 text-center '>
       Our Products</h3>
        <p className=' relative opacity-0 md:opacity-90 md:absolute lg:absolute mt-10 w-[600px] md:pt-60 md:pl-64 text-center'>
       We offer high-quality products selected with care to meet your needs. Our collection is crafted to 
       ensure reliability, style, 
       and lasting value for every customer</p>
       
           
        </div>
        {/*Seccion con tarjeta para navegar a productos filtrando por item deseado*/}
        <section className='py-12 bg-gray-50'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {
                  categoriesWithIcon.map(categoryItem => 
                  <Card onClick={()=>handleNavigateToListingPage(categoryItem,'category')} 
                  className='cursor-pointer hover:shadow-lg transition-shadow'>
                    <CardContent className='flex flex-col items-center justify-center p-6'>
                      <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                      <span className='font-bold' >
                        {categoryItem.label}
                      </span>
                    </CardContent>
                  </Card>)
                }
              </div>
          </div>
        </section>
        <section className='py-12 bg-slate-200'>
          <div className="container mx-auto px-4">
            <h2 className='text-3xl font-bold text-center mb-8'>
             Featured Products
            </h2>
            <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList &&productList.length > 0 ? 
              productList.slice(0,4).map((productItem)=>(
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddToCart={handleAddToCart}
              />))
              : null
            }
            </div>
          </div>
        </section>
        <ProductDetailsDialog 
        open={openDetailsDialog} 
        setOpen={setOpenDetailsDialog} 
        productDetails={productDetails}/>
 
        </div>
      )}

export default ShoppingHome
