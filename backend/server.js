// This file establishes the backend server.
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5010;
const SECRET_KEY = '4b8705e2834099a9747ad0da10f83bb9a3b48b48d3a5b3324e58ee02e47cfdecbe46f046d370f055a1120d842b8fbc2944752602c29932a6f848c1feadc5f05c';
// In professional instances, I would hide this Key with a .env file.

app.use(cors());
app.use(express.json());

// Route to get media from iTunes Search API
app.get('/api/search', async (req, res) => {
  const { term, mediaType } = req.query;
  const url = `https://itunes.apple.com/search?term=${term}&media=${mediaType}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).send('Error fetching data from iTunes API');
  }
});

// Route to generate JWT token
app.get('/api/token', (req, res) => {
  const token = jwt.sign({ app: 'itunes_search' }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
