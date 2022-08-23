import TestDB from '../models/TestModel.js';

class SiteController {
    // [GET] root
    index(req, res) {
        res.render('home');
    }
    // [GET] login
    login(req, res) {
        res.render('login');
    }
    // [POST] login
    postLogin(req, res) {
        const login = JSON.stringify(req.body);
        res.send(login);
    }
    // [GET] search
    search(req, res) {
        let query = req.query.q;
        res.render('search', { query: query });
    }

    testDB(req, res) {
        TestDB.find({}, function (err, test) {
            if (!err) {
                res.json(test);
            } else {
                res.status(400).json({ error: 'ERROR!' });
            }
        });
    }
}

export default new SiteController();
