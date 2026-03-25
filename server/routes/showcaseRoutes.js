const express = require('express');
const { getShowcase } = require('../controllers/showcaseController');

const router = express.Router();

router.get('/', getShowcase);

module.exports = router;

