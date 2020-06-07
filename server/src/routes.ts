import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
const routes = Router();

const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);

routes.get('/points', PointController.index)
routes.post('/points', upload.single('image'), PointController.create);
routes.get('/points/:id', PointController.show);

export default routes;
