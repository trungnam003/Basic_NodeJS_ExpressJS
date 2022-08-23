import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Test = new Schema({
    name: String,
    location: String,
    createAt: Date,
    updateAt: Date,
});

export default mongoose.model('Test', Test);
