import FarmStay from '../models/FarmStayModel.js';
import mongoCvt from '../../utils/mongoose.js';

class ManagerController {
    // [GET] /manager
    index(req, res, next) {
        res.render('managers/test');
    }

    // [GET] /manager/list-farmstay
    show(req, res, next) {
        FarmStay.find({})
            .then((farmStays) => {
                res.render('managers/farmStay/show', {
                    farmStays: mongoCvt.multiMongooseToObject(farmStays),
                });
            })
            .catch(next);
    }

    // [GET] /manager/create/farmstay
    createFarmstay(req, res, next) {
        res.render('managers/farmStay/create');
    }
    // [POST] /manager/create/farmstay
    postCreateFarmstay(req, res, next) {
        const formData = req.body;

        // formData.name = formData.name.toLocaleUpperCase()
        // formData.location = formData.location.toLocaleUpperCase()

        const farmStay = new FarmStay(formData);
        farmStay
            .save()
            .then(() => res.redirect('/manager/list-farmstay'))
            .catch((err) => {});
    }

    // [GET] /manager/farmstay/:id/edit
    editFarmstay(req, res, next) {
        let params = req.params;
        FarmStay.findById(params.id)
            .then((value) => {
                res.render('managers/farmStay/edit', {
                    farmStay: mongoCvt.oneMongooseToObject(value),
                });
            })
            .catch(next);
    }
    // [PUT] /manager/farmstay/:id/edit
    putEditFarmstay(req, res, next) {
        const formData = req.body;
        const params = req.params;

        FarmStay.updateOne({ _id: params.id }, formData)
            .then(() => {
                res.redirect('/manager/list-farmstay');
            })
            .catch(next);
    }

    // [DELETE] /manager/farmstay/:id/delete
    deleteFarmdtay(req, res, next) {
        const params = req.params;
        FarmStay.deleteOne({ _id: params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

export default new ManagerController();
