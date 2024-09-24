const axios = require('axios')

// setting up request for sneaker data
const SNEAKER_API_KEY = process.env.SNEAKER_API_KEY
const SNEAKER_BASE_URL = 'https://sneaker-database-stockx.p.rapidapi.com'

async function getSneakerData(searchInput) {
  const options = {
      method: 'GET',
      url: `${SNEAKER_BASE_URL}/stockx/sneakers`,
      params: {
        query: searchInput,
      },
      headers: {
        'x-rapidapi-key': SNEAKER_API_KEY,
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
  };
    
  try {
      const response = await axios.request(options)
      const filteredData = response.data.data.results.map(sneaker => [sneaker.urlKey, sneaker.title, 
                                                                      sneaker.name, sneaker.brand, 
                                                                      sneaker.model, sneaker.media, 
                                                                      [sneaker.description, sneaker.productTraits[0], 
                                                                      sneaker.productTraits[1], sneaker.market]])
      return filteredData
  } catch (error) {
      console.error(error);
  }
} 

// setting up request for youtube data
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

async function getYoutubeData(sneakerTitle) {

}

module.exports = {
    getSneakerData,
    getYoutubeData
};