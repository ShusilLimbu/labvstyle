// import ProductImageUpload from "@/components/admin-view/imageUpload";
// import { Button } from "@/components/ui/button";
// import { addFeatureImage, getFeatureImages } from "@/store/commonSlice";
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { addNewProduct, editProduct, fetchAllProducts, deleteProduct } from '@/store/admin/productSlice'
// import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, resetOrderDetails } from "@/store/admin/orderSlice";



// const adminDashboard = () => {

//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const {featureImageList} = useSelector((state)=>state.commonFeature);
//   const {productList} = useSelector((state) => state.adminProduct);
//   const {orderList}=useSelector((state)=>state.adminOrder);


//   function handleUploadFeatureImage(){
//     dispatch(addFeatureImage(uploadedImageUrl)).then((data)=>{
//       if(data?.payload?.success){
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     })
//   }

//   useEffect(()=>{
//     dispatch(getFeatureImages())
//      dispatch(getAllOrdersForAdmin())
//   },[dispatch]);

//   console.log(orderList);


//   return (
//     <div>
//       <h1>Summary</h1>
//       <p>Total Products: {productList.length}</p>
//       <p>Total Orders: {orderList.length}</p>
//       {/* <ProductImageUpload
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         setImageLoadingState={setImageLoadingState}
//         imageLoadingState={imageLoadingState}
//         isCustomStyling={true}
//       />
//       <Button 
//         onClick = {handleUploadFeatureImage}
//         className = 'mt-5 w-full' >
//           Upload
//       </Button>
//       <div className="flex flex-col gap-4 mt-5">
//         {
//           featureImageList && featureImageList.length > 0 ?
//           featureImageList.map((featureImgItem) => (
//           <div className="relative">
//             <img 
//               src={featureImgItem.image}
//               className="w-full h-[300px] object-cover rounded-md"
//             />
//             <h1>Banner Images</h1>
//           </div>)) : null
//         }
//       </div> */}
//     </div>
//   )
// }

// export default adminDashboard









// /* Pantalla de Jura Canarios Mundial Quilombo!!!

// recordarles lo ignorante que son y como quisieron tapar errores del sistema culpandome


// import CommonForm from '@/components/common/form'
// import { Button } from '@/components/ui/button'
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
// import { Fragment, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'


// const AdminDashboard = () => {


//   const [count , setCount] = useState(22);
//   const incrementar =()=> setCount(prev => prev+1);
//   const decrementar =()=> setCount(prev => prev-1);



//   return (
//     <div className='bg-gray-200 flex flex-row'>
//       <Fragment>
//       <div className='mb-5 w-full flex flex-col justify-center items-center'>
//         <Link to = "/admin/products">
//         <Button className='mt-4 w-[300px]'>
//           Volver a la lista de Pajaros
//         </Button>
//         </Link>

//          <div className="bg-white pl-30 pr-30 mt-4 rounded-md">
//           <h3 className='text-center justify-center items-center pt-10 font-bold'>Planilla de Jura - Jaula:8521</h3>
//           <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
//             <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Forma</p>
//             <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
//               <button onClick={decrementar} className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
//                 -
//               </button>
//               <div className='text-center'>
//                 <h2>{count}</h2>
//               </div>
//               <button onClick={incrementar} className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
//                 +
//               </button>

//             </div>
//           </div>
//           <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
//             <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Plumaje</p>
//             <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
//               <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
//                 -
//               </div>
//               <div className='text-center'>
//                 17
//               </div>
//               <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
//                 +
//               </div>

//             </div>
//           </div>
//           <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
//             <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Nuca y Cuello</p>
//             <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
//               <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
//                 -
//               </div>
//               <div className='text-center'>
//                 9
//               </div>
//               <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
//                 +
//               </div>

//             </div>
//           </div>
//           <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
//             <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Cabeza</p>
//             <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
//               <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
//                 -
//               </div>
//               <div className='text-center'>
//                 9
//               </div>
//               <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
//                 +
//               </div>

//             </div>
//           </div>
//           <div className=' bg-blue-700 pl-80 pr-80 mr-4 ml-4 mt-8 mb-8 grid grid-cols-2'>
//             <p className='-ml-72 text-white mt-2 mb-2 pt-4 pb-4'>Color</p>
//             <div className='-mr-72 ml-24 grid grid-cols-3 bg-black text-white items-center mb-2 mt-2'>
//               <div className='ml-1 text-center pt-3 bg-red-600 pb-3 rounded-md '>
//                 -
//               </div>
//               <div className='text-center'>
//                 9
//               </div>
//               <div className='text-center pt-3 bg-green-600 mr-1 pb-3 rounded-md'>
//                 +
//               </div>

//             </div>
//           </div>
//       </div>

//       </div>
       
      
//       <Sheet >
//         <SheetContent side='center' className='overflow-auto'>
//           <SheetHeader>
//             <SheetTitle className='bg-black text-white'>
             
//             </SheetTitle>
//           </SheetHeader>
          
//           <div className='py-3'>
//             <CommonForm 
            
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//     </div>
    
//   ) 

// }


// export default AdminDashboard */



import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getFeatureImages } from "@/store/commonSlice";
import { getAllOrdersForAdmin } from "@/store/admin/orderSlice";
import { fetchAllProducts } from "@/store/admin/productSlice";

function AnimatedCount({ target }) {
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const dur = 900, step = 16;
    const inc = target / (dur / step);
    const t = setInterval(() => {
      start = Math.min(start + inc, target);
      if (ref.current) ref.current.textContent = Math.round(start).toLocaleString();
      if (start >= target) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [target]);
  return <span ref={ref}>0</span>;
}

const AdminDashboard = () => {

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProduct);
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(getAllOrdersForAdmin());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const totalRevenue = orderList?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
  const pendingOrders = orderList?.filter(o => o.orderStatus === "pending")?.length || 0;

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor"/>
              <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Total Products</p>
          <p className="text-3xl font-semibold text-gray-900">
            <AnimatedCount target={productList?.length || 0} />
          </p>
          <p className="text-xs text-blue-500 mt-2 font-medium">{productList?.length || 0} listed</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-purple-600" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Total Orders</p>
          <p className="text-3xl font-semibold text-gray-900">
            <AnimatedCount target={orderList?.length || 0} />
          </p>
          <p className="text-xs text-purple-500 mt-2 font-medium">all time</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Pending Orders</p>
          <p className="text-3xl font-semibold text-gray-900">
            <AnimatedCount target={pendingOrders} />
          </p>
          <p className="text-xs text-amber-500 mt-2 font-medium">needs attention</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-green-600" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h2l2 4 4-8 2 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Total Revenue</p>
          <p className="text-3xl font-semibold text-gray-900">
            Rs. <AnimatedCount target={totalRevenue} />
          </p>
          <p className="text-xs text-green-600 mt-2 font-medium">from all orders</p>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
          <span className="text-xs text-gray-400">{orderList?.length || 0} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Order ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orderList && orderList.length > 0 ? (
                orderList.slice(0, 8).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-gray-600 font-mono text-xs">
                      #{order._id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-xs">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                        order.orderStatus === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : order.orderStatus === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : order.orderStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {order.orderStatus || 'unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-900 font-medium text-right">
                      Rs. {(order.totalAmount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard