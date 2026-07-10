const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// returns the current status of the server
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Mini Slot QA server is running'
    });
});

// serves static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Mini Slot QA is running on http://localhost:${PORT}`);
});