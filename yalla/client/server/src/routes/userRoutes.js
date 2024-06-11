const express = require('express');
const { createUser, getUserProfile } = require('../services/userService.js');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { uid, username, walletAddress } = req.body;
    await createUser(uid, username, walletAddress);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error in /register route:", error.message); // Added detailed logging
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile/:uid', async (req, res) => {
  try {
    const profile = await getUserProfile(req.params.uid);
    res.json(profile);
  } catch (error) {
    console.error("Error in /profile/:uid route:", error.message); // Added detailed logging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;