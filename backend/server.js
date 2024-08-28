const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const path = require('path');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


  const {BookSchema}=require("./models/Book")
  app.get('/pdf/:id', async (req, res) => {
    try {
      
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid file ID.');
      }
  
      const pdf = await BookSchema.findById(req.params.id);
      if (!pdf) {
        return res.status(404).send('File not found.');
      }
  
      res.set('Content-Type', pdf.contentType);
      res.send(pdf.data);
    } catch (err) {
      console.error(err); // Log error for debugging
      res.status(500).send('Error retrieving file.');
    }
  });
  


app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${"5000"}`));
