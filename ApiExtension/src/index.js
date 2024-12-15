import express from 'express';
import { llm } from './config/ollama.js';
import bodyParser from 'body-parser';
import { PORT } from './config/config.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', async (req, res) => {
	try {
		// console.log(req.body);
		let input = req.body.prompt;
		const completion = await llm.invoke(input);
		return res.status(200).json({
			message: completion,
			success: 'true',
		});
	} catch (error) {
		console.log(error);
	}
});

app.get('/', (req, res) => {
	res.send('Welcome to Extension');
});

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
