'use server'
import connecteDB from "@/config/database"
import User from '@/models/User'
import { getSessionUser } from "@/utils/getSessionUser"
import { revalidatePath } from "next/cache"

async function checkBookmarkStatus(propertyId) {
    connecteDB()
    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }

    const { userId } = sessionUser
    
    const user = await User.findById(userId)

    // Check if user exists
    if (!user) {
        throw new Error("User not found");
    }

    let isBookmarked = user.bookmarks.includes(propertyId)

return { isBookmarked }
}

 

export default checkBookmarkStatus