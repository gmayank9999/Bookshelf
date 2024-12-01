const express = require('express');
const router = express.Router();
const QuoteRequest = require('../models/QuoteRequest');

// CREATE: Handle form submission (POST request)
router.post('/request-quote', async (req, res) => {
  try {
    const { name, email, product, quantity, message } = req.body;

    // Create a new quote request entry
    const newQuoteRequest = new QuoteRequest({
      name,
      email,
      product,
      quantity,
      message,
    });

    // Save to database
    await newQuoteRequest.save();

    // Respond with a success message
    res.status(200).json({ message: 'Quote request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit quote request.' });
    console.error(err);
  }
});

// READ: Get all quote requests (GET request)
router.get('/quote-requests', async (req, res) => {
  try {
    const quoteRequests = await QuoteRequest.find(); // Fetch all quote requests
    res.status(200).json(quoteRequests); // Send them as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quote requests.' });
    console.error(err);
  }
});

// READ: Get a specific quote request by ID (GET request)
router.get('/quote-requests/:id', async (req, res) => {
  try {
    const quoteRequest = await QuoteRequest.findById(req.params.id); // Fetch by ID
    if (!quoteRequest) {
      return res.status(404).json({ error: 'Quote request not found.' });
    }
    res.status(200).json(quoteRequest); // Send the specific quote request
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve quote request.' });
    console.error(err);
  }
});

// UPDATE: Update a quote request by ID (PUT request)
router.put('/quote-requests/:id', async (req, res) => {
  const { name, email, product, quantity, message } = req.body;

  try {
    const updatedQuoteRequest = await QuoteRequest.findByIdAndUpdate(
      req.params.id,
      { name, email, product, quantity, message },
      { new: true } // Return the updated document
    );

    if (!updatedQuoteRequest) {
      return res.status(404).json({ error: 'Quote request not found.' });
    }

    res.status(200).json(updatedQuoteRequest); // Send the updated quote request
  } catch (err) {
    res.status(500).json({ error: 'Failed to update quote request.' });
    console.error(err);
  }
});

// DELETE: Delete a quote request by ID (DELETE request)
router.delete('/quote-requests/:id', async (req, res) => {
  try {
    const deletedQuoteRequest = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!deletedQuoteRequest) {
      return res.status(404).json({ error: 'Quote request not found.' });
    }

    res.status(200).json({ message: 'Quote request deleted successfully!' }); // Confirmation message
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete quote request.' });
    console.error(err);
  }
});

module.exports = router;
