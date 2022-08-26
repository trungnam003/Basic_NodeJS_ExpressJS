import express from 'express';
const Router = express.Router();
import framStayController from '../app/controllers/FarmStayController.js';

// nên để kế route cha để các route khác được tìm đến trước
Router.get('/:slug', framStayController.show); // :slug là params truyền cái gì vô cũng đc

Router.get('/', framStayController.index);

export default Router;
