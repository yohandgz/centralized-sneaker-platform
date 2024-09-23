require('dotenv').config()
const cors = require('cors')
const express = require('express')
const dataRoutes = require('./routes/dataRoutes')

// setting up server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

// routing api calls
app.use('/api/sneakers', dataRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});