const express = require('express');
const multer = require('multer');
const path = require('path');
const Book = require('../models/Book');

const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    // Extract the file extension
    const ext = path.extname(file.originalname);
    // Create a custom filename
    const filename = `${Date.now()}_${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send('Error fetching books');
  }
});
router.post('/', upload.single('samplePdf'), async (req, res) => {
  console.log(req.file); // Check if this is defined
  const { title, author, description } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const samplePdf = req.file.filename;

  try {
    const newBook = new Book({ title, author, description, samplePdf });
    await newBook.save();
    res.status(201).send('Book added');
  } catch (err) {
    res.status(500).send('Error adding book');
  }
});

module.exports = router;
