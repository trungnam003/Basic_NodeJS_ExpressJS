import farmStay from '../models/FarmStayModel.js';
import mongoCvt from '../../utils/mongoose.js';

class FarmStayController {
    // [GET] /farmstays
    index(req, res, next) {
        farmStay
            .find({})
            .then((farmStays) => {
                res.render('farmStays/farmStays', {
                    farmStays: mongoCvt.multiMongooseToObject(farmStays),
                });
            })
            .catch(next);
    }
    // [GET] /farmstays/:slug
    show(req, res, next) {
        farmStay.findOne({slug: req.params.slug})
        .then(farmStay =>{
            res.json(mongoCvt.oneMongooseToObject(farmStay))
        })
        
    }
}

export default new FarmStayController();
