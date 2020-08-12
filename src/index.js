import express from 'express';
import chalk from 'chalk';

import constants from './config/constants';
import middlewaresConfig from './config/middleware';
import routes from './routes';

const app = express();

middlewaresConfig(app);

app.use('/api/v1', routes);

app.get('/*', (req, res) => res.json({ message: 'Epson API' }));

if (!module.parent) {
	app.listen(constants.PORT, (err) => {
		if (err) {
			throw err;
		} else {
			// eslint-disable-next-line no-console
			console.log(
				chalk.green.bold(`Server started. Listen on port: ${constants.PORT}.`)
			);
		}
	});
}
