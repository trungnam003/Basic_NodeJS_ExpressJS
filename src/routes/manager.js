import express from 'express';
import managerController from '../app/controllers/ManagerController.js';
const Router = express.Router();

Router.get('/list-farmstay', managerController.show);

Router.get('/create/farmstay', managerController.createFarmstay);
Router.post('/create/farmstay', managerController.postCreateFarmstay);

Router.delete('/farmstay/:id/delete', managerController.deleteFarmdtay);

Router.get('/farmstay/:id/edit', managerController.editFarmstay);
Router.put('/farmstay/:id/edit', managerController.putEditFarmstay);

Router.get('/', managerController.index);

export default Router;
