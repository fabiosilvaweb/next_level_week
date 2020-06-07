import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
const routes = Router();

const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);

routes.get('/points', PointController.index)
routes.get('/points/:id', PointController.show);
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
  PointController.create
);

export default routes;
