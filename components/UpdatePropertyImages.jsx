'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AiOutlineClose} from 'react-icons/ai';
import {FaTimes} from 'react-icons/fa'

const UpdatePropertyImages = ({ images }) => {
const [existingImages, setExistingImages] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
    useEffect(() => {
        if (!images || !Array.isArray(images)) {
          console.error('Something went wrong')
        } else {
            
            setExistingImages(images)
        }
        
  }, [images])
  const handleDeleteImage = (image) => {
      setImagesToDelete((prev) => [...prev, image])
          
    }
    const handleRestoreImages = (image) => {
            setImagesToDelete((prev) => prev.filter((img) => img !== image))
    }
    return ( 
        <div className="bg-blue-50 p-4">
            <h1 className='text-center font-bold py-2 px-4 py-4'>Property Images</h1>
            <div  className="container mx-auto">
                {!existingImages.length ? '' :
                    
                    existingImages.length === 1 ? (
                        <div className='relative'>
                            {existingImages[0] !== imagesToDelete[0] ? (

                    <button
                                onClick={() => handleDeleteImage(existingImages[0])}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                            >
                                <AiOutlineClose size={16} />
                            </button>
                            ) : (
                                    <button onClick={() => handleRestoreImages(existingImages[0])}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                            >
                                <FaTimes size={30} />
                            </button>
                            )}
                    <Image src={existingImages[0]}
                        alt='Image 1'
                        className='object-cover h-[400px] mx-auto rounded-xl'
                        width={800}
                        height={400}
                                priority={true}
                        />
                        </div>
                    
                ) : (
                        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            
                            {existingImages.map((image, index) => (
                                <div key={index} className={`relative ${existingImages.length === 3 && index === 2 ? 'col-span-2' : 'col-span-1'}`}>
                                    {imagesToDelete && imagesToDelete.includes(image) ? (
                                        <button type='button'
                                        onClick={() => handleRestoreImages(image)} 
                                        
                                        className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 flex items-center justify-center"
                                        >
                                        <input type="text" className='hidden' defaultValue={image} name='image_to_delete' id='image_to_delete' />
                                <FaTimes size={30} />
                            </button>
                                    )
                                        : (
                                    <button type='button'
                                        onClick={() => handleDeleteImage(image)}
                                    
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 flex items-center justify-center"
                            >
                                <AiOutlineClose size={16} />
                            </button>        
                                  )  
                                }
                                    

                                    <Image src={image}
                        alt=''
                        className='object-cover h-[400px] w-full rounded-xl'
                        width={800}
                        height={400}
                        priority={true}
                    />
                                </div>
                            ))}
                        </div>
                )}
            </div>
        </div>
     );
}
 
export default UpdatePropertyImages;




