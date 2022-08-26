import farmStay from '../models/FarmStayModel.js';
import mongoCvt from '../../utils/mongoose.js';
class SiteController {
    // [GET] /root
    index(req, res) {
        res.render('home');
    }
    // [GET] /login
    login(req, res) {
        res.render('login');
    }
    // [POST] /login
    postLogin(req, res) {
        const login = JSON.stringify(req.body);
        res.send(login);
    }
    // [GET] /search
    search(req, res, next) {
        farmStay
            .find({})
            .then((farmStays) => {
                let query = req.query.q;
                var array = farmStays.filter((value) => {
                    let cvtValueName = value.name.toLocaleLowerCase();
                    let cvtValueLocation = value.location.toLocaleLowerCase();

                    return (
                        cvtValueName.includes(query.toLocaleLowerCase()) ||
                        cvtValueLocation.includes(query.toLocaleLowerCase())
                    );
                });
                res.render('search', {
                    query: query,
                    farmStays: mongoCvt.multiMongooseToObject(array),
                });
            })
            .catch(next);
    }
}

export default new SiteController();
