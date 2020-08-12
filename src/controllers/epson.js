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

		return res.status(200).json({ connected: isConnected });
	} catch (e) {
		e.status = HTTPStatus.BAD_REQUEST;
		return next(e);
	}
};
