import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/FarmStay_dev');
        console.log('Connect Successfully!!!');
    } catch (error) {
        console.log('Connect Error!!!');
    }
}

export default { connect };
