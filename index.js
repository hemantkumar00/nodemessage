/** @format */
const express = require('express');
const bodyParser = require('body-parser');
const wbm = require('wbm');
var jsonParser = bodyParser.json();
require('dotenv').config();
const app = express();
const hostname = '0.0.0.0';

app.get('/', (req, res) => {
	res.json({
		step0: 'ContentType: application/json',
		step1: 'Plz head over to /api route',
		step2: 'showBrowser: true , qrCodeData: true, session: false',
		step3:
			"numbers in 'number':[array with country code], message: message which you want to delever to all number",
	});
});

app.post('/api', jsonParser, (req, res) => {
	wbm
		.start({
			showBrowser: req.body.showBrowser,
			qrCodeData: req.body.qrCodeData,
			session: req.body.session,
		})
		.then(async (qrCodeData) => {
			console.log(qrCodeData);
			await wbm.waitQRCode();

			await wbm.send(req.body.number, req.body.message);

			await wbm.end();
		})
		.catch((err) => {
			console.log(err);
		});
});

const port = 8000;
app.listen(process.env.PORT || port, hostname, () =>
	console.log(`You are connected`)
);
