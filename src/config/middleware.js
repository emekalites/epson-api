import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import methodOverride from 'method-override';
import expressWinston from 'express-winston';

import winstonInstance from './winston';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default (app) => {
	app.use(compression());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(helmet());
	app.use(cors());
	app.use(require('express-favicon-short-circuit'));
	app.use(methodOverride());

	if (isDev && !isTest) {
		app.use(morgan('dev'));
		expressWinston.requestWhitelist.push('body');
		expressWinston.responseWhitelist.push('body');
		app.use(
			expressWinston.logger({
				winstonInstance,
				meta: true,
				msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
				colorize: true,
				headerBlacklist: ['cookie'],
			})
		);
	}
};
