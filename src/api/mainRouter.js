const express = require('express');
const router = express.Router();

const bookRouter = require("./book/bookRouter")
const memberRouter = require("./member/memberRouter")

const subUrl = '/api/v1'
router.use(subUrl, bookRouter)
    .use(subUrl, memberRouter)

module.exports = router;