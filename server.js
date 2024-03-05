const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:5500"]  // Adjusted origins for clarity
}));

const folderPath = 'music'; // Replace with the actual folder path

app.get('/getRandomFile', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading folder');
    } else {
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const filePath = path.join(folderPath, randomFile);
      res.send(filePath);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});