const firebase = require('firebase-admin');
const serviceAccount = require('../../firebase-config.json');

try {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error("Firebase initialization error:", error.message);
}

const db = firebase.firestore();

async function createUser(uid, username, walletAddress) {
  try {
    await db.collection('users').doc(uid).set({
      username,
      walletAddress,
      achievements: 0,
      gamesPlayed: 0,
      leaderboardPoints: 0,
      rarestNFT: null,
      solBalance: 0
    });
  } catch (error) {
    console.error(`Error creating user ${uid}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

async function getUserProfile(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
      throw new Error(`User ${uid} not found`);
    }
    return doc.data();
  } catch (error) {
    console.error(`Error fetching user profile for ${uid}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

async function updateUserStats(uid, statsUpdate) {
  try {
    await db.collection('users').doc(uid).update(statsUpdate);
  } catch (error) {
    console.error(`Error updating user stats for ${uid}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { createUser, getUserProfile, updateUserStats };