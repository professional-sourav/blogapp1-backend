import mongoose from 'mongoose';

export const connectToDb = async () => {

    const connect = mongoose.connect(
        process.env.DB_URL as string,
        {
            dbName: process.env.DB_NAME as string,
        }
    ).catch((err) => {
        console.log(err);        
    })

    return connect;
}
