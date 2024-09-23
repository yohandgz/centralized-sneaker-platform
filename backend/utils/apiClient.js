const axios = require('axios')

const API_KEY = process.env.API_KEY
const API_BASE_URL = 'https://sneaker-database-stockx.p.rapidapi.com'

async function getSneakerData(searchInput){
  const options = {
      method: 'GET',
      url: `${API_BASE_URL}/stockx/sneakers`,
      params: {
        query: searchInput,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
  };
    
  try {
      const response = await axios.request(options)
      const filteredData = response.data.data.results.map(sneaker => [sneaker.urlKey, sneaker.title, sneaker.name, sneaker.brand, sneaker.model, sneaker.media, [sneaker.description, sneaker.productTraits[0], sneaker.productTraits[1], sneaker.market]])
      return filteredData
  } catch (error) {
      console.error(error);
  }
} 

module.exports = {
    getSneakerData,
};