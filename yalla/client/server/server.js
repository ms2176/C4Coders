require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase-config.json');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase
try {
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error("Firebase initialization error:", error.message);
}
const db = getFirestore();

// Pre-generated image URLs
const achievementImages = {
  'first_win': 'https://example.com/images/first_win.png',
  '10_game_streak': 'https://example.com/images/streak.png',
  // Add more for demo
};

// Mock Solana setup (for demo)
const { Connection, PublicKey, Transaction } = require('@solana/web3.js');
try {
  const connection = new Connection("https://api.devnet.solana.com");
  const demoWallet = new PublicKey("Demo1111111111111111111111111111111111111");
} catch (error) {
  console.error("Solana setup error:", error.message);
}

// Routes
app.post('/api/generate-nft', (req, res) => {
  try {
    const achievement = req.body.achievement;
    if (achievementImages[achievement]) {
      res.json({ imageUrl: achievementImages[achievement] });
    } else {
      res.status(404).json({ error: 'Achievement not found' });
    }
  } catch (error) {
    console.error("Error in /api/generate-nft:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/mint-nft', async (req, res) => {
  try {
    const { achievement, playerStats, tournamentName } = req.body;
    
    const metadata = {
      name: `${achievement.name} - ${tournamentName}`,
      description: `Earned on ${achievement.date} in ${achievement.game}. Stats: ${JSON.stringify(playerStats)}`,
      image: achievementImages[achievement.name],
      attributes: [
        { trait_type: "Game", value: achievement.game },
        { trait_type: "Rarity", value: achievement.rarity },
        { trait_type: "Level", value: 1 }
      ]
    };

    // In production: IPFS. For demo, use a mock URL
    const metadataUri = `https://example.com/metadata/${achievement.id}.json`;
    
    // Demo: Log the transaction instead of actually minting
    console.log(`Minting NFT with metadata: ${JSON.stringify(metadata)}`);
    res.json({ txSignature: "DemoSignature123", metadataUri });
  } catch (error) {
    console.error("Error in /api/mint-nft:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/evolve-nft', async (req, res) => {
  try {
    const { nftId, newLevel } = req.body;

    // Demo: Just return the would-be new image URL
    res.json({
      newImageUrl: `https://example.com/images/trophy_level_${newLevel}.png`,
      txSignature: "DemoEvolveSignature123"
    });
  } catch (error) {
    console.error("Error in /api/evolve-nft:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User and leaderboard routes
app.post('/api/users', async (req, res) => {
  try {
    const { uid, username } = req.body;
    await db.collection('users').doc(uid).set({
      username,
      leaderboardPoints: 0,
      rarestNFT: null
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error in /api/users:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const snapshot = await db.collection('users')
      .orderBy('leaderboardPoints', 'desc')
      .limit(10)
      .get();
    
    const leaders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(leaders);
  } catch (error) {
    console.error("Error in /api/leaderboard:", error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)).on('error', (error) => {
  console.error(`Failed to start server on port ${PORT}:`, error.message);
});