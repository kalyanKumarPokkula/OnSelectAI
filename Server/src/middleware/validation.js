export const validateRequest = (req, res, next) => {
	const { prompt } = req.body;

	if (!prompt || typeof prompt !== 'string') {
		return res.status(400).json({
			error: 'Invalid request: prompt must be a non-empty string',
		});
	}

	if (prompt.length > 5000) {
		return res.status(400).json({
			error: 'Prompt too long: maximum 5000 characters allowed',
		});
	}

	next();
};
