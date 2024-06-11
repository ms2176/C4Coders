const express = require('express');
const { rewardForAchievement, rewardForEngagement } = require('../services/rewardService.js');
const router = express.Router();

router.post('/achievement', async (req, res) => {
  try {
    const { uid, achievementType } = req.body;
    if (!uid || !achievementType) {
      throw new Error("Missing required fields: uid or achievementType");
    }
    const reward = await rewardForAchievement(uid, achievementType);
    if (!reward) {
      throw new Error("No reward returned for achievement");
    }
    res.json({ message: `Rewarded ${reward.amount} SOL for ${achievementType}`, ...reward });
  } catch (error) {
    console.error("Error in /achievement route:", error.message); // Added detailed logging
    res.status(400).json({ error: error.message });
  }
});

router.post('/engagement', async (req, res) => {
  try {
    const { uid, watchHours } = req.body;
    if (!uid || !watchHours) {
      throw new Error("Missing required fields: uid or watchHours");
    }
    const reward = await rewardForEngagement(uid, watchHours);
    if (!reward) {
      throw new Error("No reward returned for engagement");
    }
    res.json({ message: `Rewarded ${reward.reward} SOL for watching`, ...reward });
  } catch (error) {
    console.error("Error in /engagement route:", error.message); // Added detailed logging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;