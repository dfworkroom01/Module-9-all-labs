const axios = require('axios');
const API_URL_CHARACTERS = 'https://api.sampleapis.com/avatar/characters';
const API_URL_INFO = 'https://api.sampleapis.com/avatar/info';

// Fetch characters (by page via query)
const getCharactersByPage = async (req, res) => {
    const { page } = req.query; // This gets the 'page' query parameter
  
    try {
      // Check if 'page' is a valid number
      if (page && isNaN(page)) {
        return res.status(400).json({
          success: false,
          message: `'page' query parameter must be a number.`,
        });
      }
  
      // Construct the API URL (without pagination if no 'page' provided)
      let apiUrl = API_URL_CHARACTERS;
      if (page) {
        apiUrl = `${API_URL_CHARACTERS}?page=${page}`;
      }
  
      // Call the external API
      const response = await axios.get(apiUrl);
  
      // Send back the response data from the external API
      res.json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      console.error('Error fetching character data from API:', error.message || error.response.data);
  
      res.status(500).json({
        success: false,
        message: 'Error fetching character data from API',
        error: error.response ? error.response.data : error.message,
      });
    }
  };
  

// Fetch character by ID
const getCharacterById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${API_URL_CHARACTERS}/${id}`);

    if (!response.data) {
      return res.status(404).json({
        success: false,
        message: `Character with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);

    res.status(500).json({
      success: false,
      message: 'Error fetching character data from API',
      error: error.response ? error.response.data : error.message
    });
  }
};

// Fetch general info about Avatar series
const getAvatarInfo = async (req, res) => {
  try {
    const response = await axios.get(API_URL_INFO);

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);

    res.status(500).json({
      success: false,
      message: 'Error fetching info from API',
      error: error.response ? error.response.data : error.message
    });
  }
};

module.exports = {
  getCharactersByPage,
  getCharacterById,
  getAvatarInfo
};
