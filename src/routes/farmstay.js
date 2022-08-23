import express from 'express';
const Router = express.Router();
import framStayController from '../app/controllers/FarmStayController.js';

Router.get('/:slug', framStayController.show);

Router.get('/', framStayController.index);

export default Router;
