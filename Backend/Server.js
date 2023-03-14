const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define link schema and model
const linkSchema = new mongoose.Schema({
  url: { type: String, required: true }
});
const Link = mongoose.model('Link', linkSchema);

// Use bodyParser middleware to parse JSON
app.use(bodyParser.json());

// Define API route to process links
app.post('/api/process-links', async (req, res) => {
  const links = req.body.links.split('\n');
  const savedLinks = [];
  for (let link of links) {
    const newLink = new Link({ url: link.trim() });
    try {
      const savedLink = await newLink.save();
      savedLinks.push(savedLink.url);
    } catch (err) {
      console.log(err);
    }
  }
  res.send(savedLinks);

});

app.listen(port, () => console.log(`App listening on port ${port}`));
