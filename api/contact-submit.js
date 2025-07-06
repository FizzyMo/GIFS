const axios = require('axios');

module.exports = async (req, res) => {
  const { email, message } = req.body;
  const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, {
      email,
      message
    }, {
      headers: {
        Accept: "application/json"
      }
    });

    if (response.data.ok || response.status === 200) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: response.data });
    }
  } catch (error) {
    
    res.status(500).json({ success: false });
  }
};
