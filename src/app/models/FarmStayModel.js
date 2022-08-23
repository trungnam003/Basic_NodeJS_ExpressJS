import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Farmstay = new Schema({
    name: String,
    location: String,
    createAt: Date,
    updateAt: Date,
    slug: String,
    img: String,
});

export default mongoose.model('Farmstay', Farmstay);
