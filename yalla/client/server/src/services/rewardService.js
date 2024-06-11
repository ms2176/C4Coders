const { sendSOL } = require('../utils/solana');
const { getUserProfile, updateUserStats } = require('./userService');

const achievementRewards = {
  'first_win': { amount: 0.1, rarity: 'common' },
  '10_game_streak': { amount: 0.5, rarity: 'rare' },
  'tournament_win': { amount: 1, rarity: 'legendary' }
};

async function rewardForAchievement(uid, achievementType) {
  try {
    const reward = achievementRewards[achievementType];
    if (!reward) throw new Error('Invalid achievement type');

    const user = await getUserProfile(uid);
    if (!user) throw new Error('User not found');

    const signature = await sendSOL(user.walletAddress, reward.amount);
    if (!signature) throw new Error('Failed to send SOL');

    const updatedAchievements = user.achievements + 1;
    const updatedBalance = user.solBalance + reward.amount;
    const updatedRarestNFT = !user.rarestNFT || achievementRewards[user.rarestNFT].rarity < reward.rarity ? achievementType : user.rarestNFT;

    await updateUserStats(uid, {
      achievements: updatedAchievements,
      solBalance: updatedBalance,
      rarestNFT: updatedRarestNFT,
      leaderboardPoints: updatedAchievements * 100 + updatedBalance * 1000
    });

    return { amount: reward.amount, rarity: reward.rarity, signature };
  } catch (error) {
    console.error(`Error in rewardForAchievement for ${achievementType}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

async function rewardForEngagement(uid, watchHours) {
  try {
    const user = await getUserProfile(uid);
    if (!user) throw new Error('User not found');

    const newWatchHours = user.watchHours + watchHours;
    const rewardTiers = [10, 50, 100, 500];
    
    let reward = 0;
    for (let tier of rewardTiers) {
      if (newWatchHours >= tier && user.watchHours < tier) {
        reward += tier * 0.001;
      }
    }

    if (reward > 0) {
      const signature = await sendSOL(user.walletAddress, reward);
      if (!signature) throw new Error('Failed to send SOL');

      await updateUserStats(uid, {
        watchHours: newWatchHours,
        solBalance: user.solBalance + reward,
        leaderboardPoints: user.leaderboardPoints + reward * 1000
      });
      return { reward, signature };
    }

    await updateUserStats(uid, { watchHours: newWatchHours });
    return { reward: 0 };
  } catch (error) {
    console.error(`Error in rewardForEngagement for UID ${uid}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { rewardForAchievement, rewardForEngagement };