const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NOTES_FILE = path.join(__dirname, 'data', 'notes.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize notes file if it doesn't exist
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify({ content: '' }));
}

// GET endpoint - retrieve notes
app.get('/api/notes', (req, res) => {
  try {
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading notes:', error);
    res.status(500).json({ error: 'Failed to read notes' });
  }
});

// POST endpoint - save notes
app.post('/api/notes', (req, res) => {
  try {
    const { content } = req.body;
    const data = { content, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(NOTES_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Notes saved successfully' });
  } catch (error) {
    console.error('Error saving notes:', error);
    res.status(500).json({ error: 'Failed to save notes' });
  }
});

app.listen(PORT, () => {
  console.log(`Notes app running on http://localhost:${PORT}`);
});
