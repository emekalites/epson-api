import { Router } from 'express';

import * as epson from '../controllers/epson';

const routes = new Router();

routes.get('/print', epson.print);

export default routes;
