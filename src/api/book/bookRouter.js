const express = require("express");
const { getAllBooks, createBook } = require('./bookController')

const router = express()

router.get('/book', getAllBooks);
router.post('/book', createBook);

module.exports = router;