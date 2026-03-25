const express = require('express');
const { submitInquiry } = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', submitInquiry);

module.exports = router;

