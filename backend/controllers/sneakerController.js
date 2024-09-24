const { getSneakerData } = require('../utils/apiClient.js')
const db = require('../config/db')

const searchSneakers = async (req, res) => {
  const searchInput = req.query.search
  console.log('User searched for ', searchInput)

  try {
    // checking if user's search already exists in database
    // if it isn't, it will be 0, and search will be made
    // if it is, searchId will be the index of the search in the table
    const searchId = await checkSearch(searchInput)
    let sneakerData

    if (searchId > 0) {
      sneakerData = await findSearchResponse(searchId)
      console.log('Search exists in database')
    } else if (searchId < 0) {
      sneakerData = await search(searchInput, searchId)
      console.log('Search has been updated')
    } else {
      sneakerData = await search(searchInput, 0)
      console.log('Search has been made and logged in database')
    }
 
    res.status(200).json(sneakerData)
    console.log('Sneaker data has been sent')
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred while fetching sneaker data.' })
  }
}

async function findSearchResponse(searchId) {
  // finding the sneaker data of a search given the search id

  // retrieving ordered list of indexes
  const selectQuery = 'SELECT response FROM searches WHERE id = ?'
  const indexOrder = await new Promise((resolve, reject) => {
    db.query(selectQuery, [searchId], (error, result) => {
      if (error) {
        console.error('Response retrieval failed:', error)
        return reject(error)
      }
      resolve(result[0].response)
    })
  })

  // updating search score
  const updateQuery = 'UPDATE searches SET score = score + 1 WHERE id = ?'
  await new Promise((resolve, reject) => {
    db.query(updateQuery, [searchId], (error) => {
      if (error) {
        console.error('Updating score failed:', error)
        return reject(error)
      }
      resolve()
    })
  })

  // gathering sneaker data with indexes
  const selectQuery2 = 'SELECT * FROM sneakers WHERE id IN (?)'
  return new Promise((resolve, reject) => {
    db.query(selectQuery2, [indexOrder], (error, result) => {
      if (error) {
        console.error('Sneaker retrieval failed:', error)
        return reject(error)
      }
      resolve(result)
    });
  });
}

async function checkSearch(searchInput) {
  // checking if user's search has recently been made in database to reduce api calls

  // extracting keywords from search Input
  const lower = searchInput.toLowerCase()
  const cleaned = lower.replace(/[^a-z0-9\s]/g, '')
  const numberWords = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
  }
  const converted = cleaned.replace(/\d+/g, (match) => {
    return match.split('').map(num => numberWords[num]).join('')
  })
  const inputtedKeywords = new Set(converted.split(/\s+/))

  // gathering database keywords that match input length
  const selectQuery = 'SELECT id, keywords, date FROM searches WHERE JSON_LENGTH(keywords) = ?'
  const keywordsList = await new Promise((resolve, reject) => {
    db.query(selectQuery, [inputtedKeywords.size], (error, result) => {
      if (error) {
        console.error('Keywords check failed:', error)
        return reject(error)
      }
      resolve(result)
    })
  })

  // will return false
  let id = 0

  // comparing search to database
  for (const dbEntry of keywordsList) {
    const dbKeywords = new Set(dbEntry.keywords)
    let allKeywordsMatch = true
    for (const word of inputtedKeywords) {
      // error here. fix it god damn it
      if (!dbKeywords.has(word)) {
        allKeywordsMatch = false
        break
      }
    }

    if (allKeywordsMatch) {
      // if code reaches this point, keywords match 1 : 1
      // now check if search was longer than 6 months ago to ensure sneaker releases are present
      const now = new Date()
      const differenceInMilliseconds = now - dbEntry.date
      const differenceInMonths = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)

      if (differenceInMonths < 6) {
        id = dbEntry.id
      } else {
        // will have to update the search
        id = -1 * dbEntry.id
      }
      
      break
    }
  }

  return id
}

async function search(searchInput, updateBool) {
  // assuming that this search hasn't been matched to a preexisting search
  // or that it needs to be reset since the search was over 6 months ago

  // sneakerData will be return value, we just need to setup searches table row
  const sneakerData = await getSneakerData(searchInput)

  // preparing list of keywords for future comparison
  const lower = searchInput.toLowerCase()
  const cleaned = lower.replace(/[^a-z0-9\s]/g, '')
  const numberWords = {
    '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
    '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
  }
  const converted = cleaned.replace(/\d+/g, (match) => {
    return match.split('').map(num => numberWords[num]).join('')
  })
  const keywords = converted.split(/\s+/)

  // retrieving order of ids in sneaker table of sneakerData
  const response = await insertSneakers(sneakerData)

  if (updateBool) {
    // updating database with newer search
    const updateQuery = 'UPDATE searches SET response = ?, date = ? WHERE id = ?'
    const now = new Date()
    const id = -1 * updateBool
    await new Promise((resolve, reject) => {
      db.query(updateQuery, [JSON.stringify(response), now, id], (error) => {
        if (error) {
          console.error('Updating search failed;', error)
          return reject(error)
        }
        resolve()
      })
    })
  } else {
    // inserting into database
    const insertQuery = 'INSERT INTO searches (search, keywords, response, score) VALUES (?, ?, ?, ?)'
    await new Promise((resolve, reject) => {
      db.query(insertQuery, [cleaned, JSON.stringify(keywords), JSON.stringify(response), 1], (error) => {
        if (error) {
          console.error('Search insertion failed:', error)
          return reject(error)
        }
        resolve()
      })
    })
  }

  return sneakerData
}

async function insertSneakers(sneakerData) {
  // will return the order of ids of sneakers in database
  let indexOrder = []

  for (const sneaker of sneakerData) {
    // check if sneaker already exists in the database
    const selectQuery = 'SELECT id FROM sneakers WHERE urlkey = ?'
    const result = await new Promise((resolve, reject) => {
      db.query(selectQuery, [sneaker[0]], (error, result) => {
        if (error) {
          console.error('Sneaker check failed:', error)
          return reject(error)
        }
        resolve(result)
      })
    })

    if (result.length > 0) {
      // if the sneaker exists, add the index to the list
      indexOrder.push(result[0].id)
    } else {
      // if it doesn't, insert it, then add index to the list
      const insertQuery = 'INSERT INTO sneakers (urlkey, title, name, brand, model, media, extra) VALUES (?, ?, ?, ?, ?, ?, ?)'
      const insertResult = await new Promise((resolve, reject) => {
        db.query(insertQuery, [sneaker[0], sneaker[1], sneaker[2], sneaker[3], sneaker[4], JSON.stringify(sneaker[5]), JSON.stringify(sneaker[6])], (error, result) => {
          if (error) {
            console.error('Sneaker insertion failed:', error)
            return reject(error)
          }
          resolve(result)
        })
      })
      indexOrder.push(insertResult.insertId)
    }
  }

  return indexOrder
}


module.exports = {
  searchSneakers
}