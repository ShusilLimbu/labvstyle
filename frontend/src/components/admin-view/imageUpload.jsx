import { useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';

const ProductImageUpload = ({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    imageLoadingState,
    isEditMode,
    isCustomStyling=false,
}) => {

    const inputRef = useRef(null);
    const API=import.meta.env.VITE_API_BASE_URL;

    function handleImageFileChange(event){
        const selectedFile = event.target.files?.[0]
        if (selectedFile)
            setImageFile(selectedFile);
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveIamge(){
     setImageFile(null)
     if(inputRef.current){
        inputRef.current.value =''
     }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('myfile',imageFile);
        const response = await axios.post(`${API}/api/admin/products/uploadImage`, data)
        if(response.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
    }

    useEffect(()=>{
        if(imageFile !== null) uploadImageToCloudinary()
    },[imageFile])

  return (
    <div className={`w-full mt-2 ${isCustomStyling ? '': 'max-w-md mx-auto'}`}>
        <Label className='text-md font-semibold mb-2 block'>
            Product Image
        </Label>
        <div 
            onDragOver ={handleDragOver} 
            onDrop={handleDrop} 
            className={`${isEditMode ? 'opacity-60' : ''} border-2 border-dashed rounded-lg p-4`} >
            <Input 
            id='imageUpload' 
            type='file' 
            className='hidden' 
            ref={inputRef} 
            onChange={handleImageFileChange}
            disabled={isEditMode}
            />
            {
            !imageFile ? (
            <Label 
            htmlFor='imageUpload' 
            className={` ${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-14 cursor-pointer`} >
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                <span>Click to load the image</span>
            </Label> ) :  imageLoadingState ? (
            <Skeleton className='h-10 bg-gray-100' />) : (
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <FileIcon className='w-8 text-primary mr-2 h-8'/>
                </div>
                <p className='text-sm font-medium'>{imageFile.name}</p>
                <Button 
                    variant='ghost' 
                    size='icon' 
                    className='text-muted-foreground hover:text-foreground' 
                    onClick = {handleRemoveIamge} >
                    <XIcon className='w-4 h-4'/>
                    <span className='sr-only'>Delete File</span>
                </Button>
            </div>
            )}
        </div>
    </div>
  )
}

export default ProductImageUpload;