const { getSneakerData } = require('./utils/apiClient.js');

const searchSneakers = async (req, res) => {
  const searchInput = req.query.searchsearchInput

  try {
    // handle all database stuff here.
    const sneakerData = await getSneakerData(searchInput)
    // it will look like below once the database has been checked for repeats and we figure out the complexity
    // res.status(200).json(sneakerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching sneaker data.' });
  }
}

module.exports = {
  searchSneakers
}