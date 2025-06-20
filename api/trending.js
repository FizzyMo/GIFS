const axios = require('axios');

module.exports = async (req, res) => {
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/trending', {
      params: {
        api_key: GIPHY_API_KEY,
        limit: 5,
        rating: 'g'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching trending GIFs:', error);
    res.status(500).send('Failed to fetch trending GIFs');
  }
};
