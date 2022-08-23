export default {
    multiMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => {
            return mongoose.toObject();
        });
    },
    oneMongooseToObject: function (mongoose) {
        return mongoose.toObject();
    },
};
