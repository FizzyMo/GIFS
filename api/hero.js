const axios = require('axios');

module.exports = async (req, res) => {
    const gifId = 'Hh9sPYeSWhAUx6NDBM';
    const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/${gifId}`, {
            params: {
                api_key: GIPHY_API_KEY
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching hero GIF:', error);
        res.status(500).send('Failed to fetch hero GIF');
    }
};
