const express = require("express");
const { getAllMembers, createMember, borrowBooks, returnBooks } = require('./memberController')

const router = express()

router.get('/member', getAllMembers);
router.post('/member', createMember);
router.put('/borrow-books/:memberCode', borrowBooks);
router.put('/return-books/:memberCode', returnBooks);

module.exports = router;