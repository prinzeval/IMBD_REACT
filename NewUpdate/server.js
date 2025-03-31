const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files (including HTML)   ok restartimg the server
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for streaming
app.get('/proxy-stream', async (req, res) => {
    const { imdb } = req.query;
    if (!imdb) return res.status(400).send('IMDB ID required');

    try {
        const response = await axios.get(`https://vidsrc.xyz/embed/movie?imdb=${imdb}`, {
            responseType: 'stream',
            headers: {
                'Referer': 'https://vidsrc.xyz/',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        response.data.pipe(res);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Failed to fetch stream');
    }
});

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));