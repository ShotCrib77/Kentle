const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const folderPath = 'music'; // Replace with the actual folder path

app.get('/getRandomFile', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      res.status(500).send('Error reading folder');
    } else {
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const filePath = path.join(folderPath, randomFile);
      res.send(filePath); // Send the path of the randomly selected file
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});