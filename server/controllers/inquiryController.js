const mongoose = require('mongoose');
const Inquiry = require('../models/Inquiry');

async function submitInquiry(req, res, next) {
  try {
    const { name, email, company = '', message = '', notes = '' } = req.body;

    if (!name || !email) {
      res.status(400);
      throw new Error('Name and email are required.');
    }

    if (mongoose.connection.readyState !== 1) {
      res.status(503);
      throw new Error('Database unavailable. Configure MongoDB to store submissions.');
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      company,
      message,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Concierge request received successfully.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  submitInquiry,
};
