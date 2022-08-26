import routerSite from './site.js';
import routerFarmStay from './farmstay.js';
import routerManager from './manager.js';

function route(app) {
    app.use('/manager', routerManager);

    app.use('/farmstays', routerFarmStay);

    app.use('/', routerSite);
}

export default route;
