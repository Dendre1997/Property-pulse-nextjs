'use server'

import connecteDB from "@/config/database"
import Property from '@/models/Property'
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import cloudinary from '@/config/cloudinary'

async function updateProperty(propertyId, formData) {
    try {

    
        await connecteDB();
    
        const sessionUser = await getSessionUser();
        // console.log(sessionUser)
        if (!sessionUser || !sessionUser.userId) {
            throw new Error('User ID is required');
        }
    
        const { userId } = sessionUser;
    
        const existingProperty = await Property.findById(propertyId)
        
        // Verify ownership 
        if (existingProperty.owner.toString() !== userId) {
            throw new Error("Current User doesn't own this property")
        }
    
        const images = formData
            .getAll('images')
            .filter((image) => image.name !== '')
    
        
    
        const propertyData = {
            owner: userId,
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
                
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities: formData.getAll('amenities'),
            rates: {
                nightly: formData.get('rates.nightly'),
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
         
        };



        // Extract public id from image URLs
        const imagesToDelete = formData.getAll('image_to_delete')
        const publicIdsToDelete = imagesToDelete.map((imageUrl) => {
            const parts = imageUrl.split('/');
            return parts.at(-1).split('.').at(0)
        });

        // Delete images from cloudinary 
        if (publicIdsToDelete.length > 0) {
            for (let publicId of publicIdsToDelete) {
    try {
        await cloudinary.uploader.destroy('propertypulse/' + publicId);
    } catch (error) {
        console.log('Error deleting image:', error);
    }
}
        }

        // Keep the existing images, and remove the ones marked for deletion
        const remainingImages = existingProperty.images.filter(image =>
            !imagesToDelete.includes(image)
        );
        const imageUrls = [...remainingImages]

        for (const imageFile of images) {
            try {
                const imageBuffer = await imageFile.arrayBuffer();
                const imageArray = Array.from(new Uint8Array(imageBuffer));
                const imageData = Buffer.from(imageArray);

                // Convert to base 64
                const imageBase64 = imageData.toString('base64');

                // Make request to cloudinary 
                const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
                    folder: 'propertypulse'
                });

                imageUrls.push(result.secure_url);
            }catch (error) {
        console.log('Error uploading image:', error);
    }

        }
        propertyData.images = imageUrls  
        console.log('Images:', propertyData);
        try {
            const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData, {new: true})
            if (!updatedProperty) {
            throw new Error('Property update failed');
            }
            
            
            
            revalidatePath('/', '/layout')
           
        } catch (error) {
            console.error('Error at step X:', error.message, error.stack);
        }
        
        
    } catch (error) {
        console.error('Error is updatedProperty:', error)
        throw new Error('Internal Server Error:', error)
    }
}
         
export default updateProperty;