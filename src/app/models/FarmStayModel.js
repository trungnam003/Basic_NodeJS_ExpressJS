import mongoose from 'mongoose';
import mongooseSlugGenerator from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete'


const Schema = mongoose.Schema;

const Farmstay = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true }, // lấy slug từ tên nếu trùng thêm mã short
        img: { type: String },
    },
    { timestamps: true }, // tự động thêm created và updated
);

mongoose.plugin(mongooseSlugGenerator);
Farmstay.plugin(mongooseDelete, {
    overrideMethods: true,
    deletedAt: true,
})
export default mongoose.model('Farmstay', Farmstay); // tạo model từ schema,
// nếu collection chưa có sẽ tự động tạo trong mongo (tự động chuyển về chữ thường và thêm s)
