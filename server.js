const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;
const filePath = __dirname + '\\contacts.json'

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// sends data to frontend
app.get('/get-contact', async (req, res) => {
  res.send(JSON.stringify(JSON.parse(await fs.readFile(filePath))));
});

// Recieves data from frontend
app.post('/post-contact', async (req, res) => {
  
  console.log(req.body);
  const contacts = Object.assign(JSON.parse(await fs.readFile(filePath)), req.body);
  console.log(JSON.parse(await fs.readFile(filePath)));
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
});