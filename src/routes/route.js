import routerSite from './site.js';
import routerFarmStay from './farmstay.js';
function route(app) {
    app.use('/farmstays', routerFarmStay);
    app.use('/', routerSite);
}

export default route;
