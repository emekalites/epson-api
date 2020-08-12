import HTTPStatus from 'http-status';
import { printer as ThermalPrinter, types } from 'node-thermal-printer';

export const print = async (req, res, next) => {
	try {
		const ipaddress = req.query.ip;

		const printer = new ThermalPrinter({
			type: types.EPSON,
			interface: `tcp://${ipaddress}`,
			removeSpecialCharacters: false,
			options: {
				timeout: 5000,
			},
		});

		const isConnected = await printer.isPrinterConnected();

		if (isConnected) {
			printer.alignCenter();
			printer.println('DEDA HOSPITAL');
			printer.println('Testing New EMR');
			printer.cut();

			const execute = await printer.execute();

			return res.status(200).json({ output: execute });
		}

		return res.status(500).json({ connected: isConnected });
	} catch (e) {
		e.status = HTTPStatus.BAD_REQUEST;
		return next(e);
	}
};
