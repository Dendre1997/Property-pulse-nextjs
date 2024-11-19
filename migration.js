const  User =  require('./models/User'); // Adjust based on your project structure

async function updateBookmarksField() {
    try {
        // Update users without bookmarks field
        await User.updateMany({ bookmarks: { $exists: false } }, { bookmarks: [] });
        console.log('Migration completed: Bookmarks field added');
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

updateBookmarksField().catch(console.error);