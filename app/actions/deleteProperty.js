'use server'

import cloudinary from "@/config/cloudinary"
import connectDB from '@/config/database'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'
import { revalidatePath } from 'next/cache'
import Message from "@/models/Message"

async function deleteProperty(propertyId) {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User Id is required')

    }

    const { userId } = sessionUser;

    const property = await Property.findById(propertyId)

    if (!property) throw new Error('Property Not Found')
    
    // Verify ownership

    if (property.owner.toString() !== userId) {
        throw new Error('Unauthorized');
    }

    // Extract public id from image URLs

    const publicIds = property.images.map((imageUrl) => {
        const parts = imageUrl.split('/');
        return parts.at(-1).split('.').at(0)
    });

    // Delete images from cloudinary 
    if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('propertypulse/' + publicId)
        }
    }

    try {
        await Message.deleteMany({ property: propertyId });
    } catch (error) {
        console.error(`Failed to delete messages for propertyId: ${propertyId}`, error);
    }
    await property.deleteOne()

    
revalidatePath('/', 'layout')
    



}

export default deleteProperty
