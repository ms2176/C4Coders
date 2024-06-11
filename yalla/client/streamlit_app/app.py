import streamlit as st
import requests

API_URL = "http://localhost:5000"

def register_user(username, wallet_address):
    response = requests.post(f"{API_URL}/user/register", json={
        "uid": username,  # Using username as UID for simplicity
        "username": username,
        "walletAddress": wallet_address
    })
    return response.json()

def get_user_profile(uid):
    response = requests.get(f"{API_URL}/user/profile/{uid}")
    return response.json()

def reward_achievement(uid, achievement_type):
    response = requests.post(f"{API_URL}/reward/achievement", json={
        "uid": uid,
        "achievementType": achievement_type
    })
    return response.json()

def reward_engagement(uid, watch_hours):
    response = requests.post(f"{API_URL}/reward/engagement", json={
        "uid": uid,
        "watchHours": watch_hours
    })
    return response.json()

def main():
    st.title("GamerHub - Dynamic NFT Rewards")

    # User Registration
    st.header("Register a New Gamer")
    username = st.text_input("Username")
    wallet = st.text_input("Wallet Address (e.g., 8ZNnuj6...)") # Hardcode a devnet address for demo
    if st.button("Register"):
        result = register_user(username, wallet)
        st.write(result)
        st.success(f"Welcome, {username}! Your GamerHub wallet is ready.")

    # Profile Viewer
    st.header("Gamer Profile")
    profile_id = st.text_input("Gamer ID (use username)")
    if st.button("View Profile"):
        profile = get_user_profile(profile_id)
        st.write(f"Achievements: {profile['achievements']}")
        st.write(f"Games Played: {profile['gamesPlayed']}")
        st.write(f"SOL Balance: {profile['solBalance']}")
        st.write(f"Rarest NFT: {profile['rarestNFT']}")
        
        # Simulating achievements
        if st.button("Win a Game (First Win)"):
            reward = reward_achievement(profile_id, 'first_win')
            st.write(f"🎉 You earned {reward['amount']} SOL! Rarity: {reward['rarity']}")
            st.write(f"View on Solana: https://explorer.solana.com/tx/{reward['signature']}?cluster=devnet")
            st.balloons()

        if st.button("10 Game Streak"):
            reward = reward_achievement(profile_id, '10_game_streak')
            st.write(f"🔥 Streak Reward: {reward['amount']} SOL! Rarity: {reward['rarity']}")
            st.write(f"View on Solana: https://explorer.solana.com/tx/{reward['signature']}?cluster=devnet")
            st.balloons()

        # Evolving NFT
        if st.button("Evolve NFT (Win Tournament)"):
            reward = reward_achievement(profile_id, 'tournament_win')
            st.write(f"🏆 Champion! Earned {reward['amount']} SOL! Rarity: {reward['rarity']}")
            st.image("https://example.com/images/trophy_evolved.png", caption="Your NFT has evolved!")
            st.snow()

    # Engagement Rewards
    st.header("Reward Stream Watchers")
    watcher_id = st.text_input("Watcher ID (use username)")
    hours_watched = st.number_input("Hours Watched", min_value=0, value=1)
    if st.button("Reward Watcher"):
        reward = reward_engagement(watcher_id, hours_watched)
        if reward['reward'] > 0:
            st.write(f"🌟 Earned {reward['reward']} SOL for watching!")
            st.write(f"View on Solana: https://explorer.solana.com/tx/{reward['signature']}?cluster=devnet")
            st.snow()
        else:
            st.info("Keep watching to earn SOL!")

    # Leaderboard
    st.header("Global Leaderboard")
    st.write("Top players have the rarest NFTs. Rarity is game-specific, so diversify!")
    leaderboard = [
        {"rank": 1, "username": "Ninja", "points": 1500, "rarestNFT": "Fortnite 50 Solo Wins (Legendary)"},
        {"rank": 2, "username": "Shroud", "points": 1400, "rarestNFT": "CSGO 30 Bomb in Major (Epic)"},
        {"rank": 3, "username": "pokimane", "points": 1200, "rarestNFT": "10k Concurrent Viewers (Rare)"},
        {"rank": 4, "username": "Faker", "points": 1100, "rarestNFT": "LoL Pentakill at Worlds (Legendary)"},
        {"rank": 5, "username": "DrLupo", "points": 1000, "rarestNFT": "24h Charity Stream (Mythic)"},
    ]
    st.table(leaderboard)

    st.header("🚀 Community Challenge")
    st.write("Follow GamerHub on Twitch in the next 24h, earn 0.1 SOL! Together, we rise.")

if __name__ == "__main__":
    main()