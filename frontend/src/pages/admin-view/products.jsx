import ProductImageUpload from '@/components/admin-view/imageUpload'
import AdminProductTile from '@/components/admin-view/productTile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, editProduct, fetchAllProducts, deleteProduct } from '@/store/admin/productSlice'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand:'',
  price: '',
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [imageFile, setImageFile]=useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedID, setCurrentEditedId] = useState(null);
  const {productList} = useSelector((state) => state.adminProduct)
  const dispatch = useDispatch();
  const {toast} = useToast();

  function onSubmit(event){
    event.preventDefault();
    currentEditedID !== null ?
    dispatch(editProduct({id: currentEditedID ,formData})).then((data)=>{
      if(data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    })
    : dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl,
    })).then((data)=>{
      if (data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        setImageFile(null);
        setFormData(initialFormData);
        toast ({
          title: 'Product added successfully'
        })

      }
    })
  }

  function handleDelete(getCurrentProductID) {
    dispatch(deleteProduct(getCurrentProductID)).then(data => {
      if (data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    })
  }


  function isFormValid(){
    return Object.keys(formData)
    .map((key) => formData[key] !== '')
    .every((item)=> item);
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log(productList,'productList')

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={()=>setOpenCreateProductsDialog(true)}>
          Add a New Product
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem => <AdminProductTile 
            setFormData ={setFormData}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
            setCurrentEditedId ={setCurrentEditedId} 
            product={productItem}
            handleDelete={handleDelete}
            />
          ) : null
        }
      </div>
      <Sheet 
      open={openCreateProductsDialog} 
      onOpenChange={()=>{
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      }}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedID !== null ?
                'Edit Product' : 'Add a New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload 
          imageFile={imageFile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
          isEditMode={currentEditedID !== null}
          />
          <div className='py-3'>
            <CommonForm 
            onSubmit={onSubmit} 
            formData={formData} 
            setFormData={setFormData} 
            buttonText= { currentEditedID !== null ? 'To Edit' : 'To Add'} 
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  ) 

}

export default AdminProducts