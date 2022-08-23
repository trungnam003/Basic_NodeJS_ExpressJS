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
}

export default new SiteController();
