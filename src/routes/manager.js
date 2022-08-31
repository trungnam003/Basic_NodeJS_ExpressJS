import express from 'express';
import managerController from '../app/controllers/ManagerController.js';
import sortMiddleware from '../middlewares/sortMiddleware.js';
const Router = express.Router();
Router.use(sortMiddleware);

Router.get('/list-farmstay', managerController.show);

Router.post('/handle-action/farmstay', managerController.handleAction);


Router.get('/trash/farmstay', managerController.trashFarmstay);

Router.get('/create/farmstay', managerController.createFarmstay);
Router.post('/create/farmstay', managerController.postCreateFarmstay);

Router.delete('/farmstay/:id/delete', managerController.deleteFarmstay);

Router.delete('/farmstay/:id/delete-force', managerController.deleteForceFarmstay);

Router.patch('/farmstay/:id/restore', managerController.restoreFarmstay);

Router.get('/farmstay/:id/edit', managerController.editFarmstay);
Router.put('/farmstay/:id/edit', managerController.putEditFarmstay);

Router.get('/', managerController.index);

export default Router;
