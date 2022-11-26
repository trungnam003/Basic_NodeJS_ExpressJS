import FarmStay from '../models/FarmStayModel.js';
import mongoCvt from '../../utils/mongoose.js';

class ManagerController {
    // [GET] /manager
    index(req, res, next) {
        res.render('managers/test');
    }

    // [GET] /manager/farmstays
    show(req, res, next) {

        // const [countDocumentsDeleted, farmStays] = await Promise.all([
        //     FarmStay.countDocumentsDeleted(),
        //     FarmStay.find({}).sortable(req),
        // ])
        // res.render('managers/farmStay/show', {
        //             countDocumentsDeleted,
        //             farmStays: mongoCvt.multiMongooseToObject(farmStays),
        //         });

        Promise.all([
            FarmStay.countDocumentsDeleted(),
            FarmStay.find({}).sortable(req),
        ])
            .then(([countDocumentsDeleted, farmStays]) => {
                res.render('managers/farmStay/show', {
                    countDocumentsDeleted,
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
    deleteFarmstay(req, res, next) {
        const params = req.params;
        FarmStay.delete({ _id: params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [GET] /manager/trash/farmstay
    trashFarmstay(req, res, next) {
        FarmStay.findDeleted({})
            .then((farmStays) => {
                res.render('managers/farmStay/trash', {
                    farmStays: mongoCvt.multiMongooseToObject(farmStays),
                });
            })
            .catch(next);
    }
    // [PATCH] /manager/farmstay/:id/restore
    restoreFarmstay(req, res, next) {
        FarmStay.restore({ _id: req.params.id })
            .then(() => res.redirect('back')) // trở về trang trước
            .catch(next);
    }
    // [DELETE] /manager/farmstay/:id/delete-force
    deleteForceFarmstay(req, res, next) {
        const params = req.params;
        FarmStay.deleteOne({ _id: params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [POST] /manager/handle-action/farmstay
    handleAction(req, res, next) {
        const body = req.body;
        switch (body.action) {
            case 'delete':
                FarmStay.delete({ _id: { $in: body.courseIds } })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
        }
    }
}

export default new ManagerController();
