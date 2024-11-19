import mongoose from 'mongoose';

let connected = false


const connecteDB = async () => {
    mongoose.set('strictQuery', true);

    // If database is already connected dont connect again

    if (connected) {
        console.log('MongoDB  connected')
        return;
    } else {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            connected = true
        } catch (error) {
            console.log(error)
        }
    }
}


export default connecteDB