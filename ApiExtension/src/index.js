import express from 'express';
import { llm } from './config/ollama.js';
import bodyParser from 'body-parser';
import { PORT } from './config/config.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateRequest } from './middleware/validation.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', validateRequest, async (req, res, next) => {
	try {
		const input = req.body.prompt;
		const completion = await llm.invoke(input);

		return res.status(200).json({
			message: completion,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'healthy' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
