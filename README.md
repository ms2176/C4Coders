# Yalla E-Sports Platform (by C4Coders for The Compass Hackathon)

Yalla E-Sports is an innovative platform designed to revolutionize the gaming and streaming ecosystem. By leveraging the Solana blockchain, Yalla E-Sports offers gamers and streamers the opportunity to earn SOL and unique NFTs as rewards for their achievements and engagement. The platform is built with a Node.js and Express backend and a frontend powered by Streamlit.

## Project Overview

```
yalla/
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── .env
│   └── package.json
├── streamlit_app/
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
└── README.md
```

## Backend Development

### Initial Setup

1. **Environment Configuration**: Generate a `.env` file within the `server` folder, incorporating the following details:

    ```env
    SOLANA_NETWORK=https://api.devnet.solana.com
    TREASURY_WALLET_PRIVATE_KEY=[insert_private_key_array]
    ```

2. **Dependencies**: Execute `npm install` inside the `server` folder to install required libraries.

3. **Server Activation**: Launch the server with `npm run dev`, accessible at `http://localhost:5000`.

### Core Components

- **package.json**: Specifies project dependencies and scripts.
- **utils/solana.js**: Facilitates Solana blockchain interactions.
- **services/userService.js**: Manages user data via Firebase.
- **services/rewardService.js**: Handles achievement and engagement rewards.
- **routes/userRoutes.js**: Manages user registration and profile endpoints.
- **routes/rewardRoutes.js**: Oversees achievement and engagement reward endpoints.

## Frontend Development

### Initial Setup

1. **Dependencies**: In the `streamlit_app` directory, run `pip install -r requirements.txt`.

2. **Application Launch**: Start the Streamlit app with `streamlit run app.py`, which will open at `http://localhost:8501`.

### Core Components

- **requirements.txt**: Lists Python package requirements.
- **app.py**: Contains the Streamlit application logic for user registration, profile management, and reward simulation.

## Running the Project

### Backend

Navigate to the `server` directory and execute:

```bash
npm install
npm run dev
```

### Frontend

In the `streamlit_app` directory, perform:

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Application Usage

1. **User Registration**: Register a new user in the Streamlit app by providing a username and wallet address.
2. **Profile Viewing**: Access a user's profile to view achievements, SOL balance, and rarest NFT.
3. **Achievement Simulation**: Simulate game wins and reward accrual.
4. **Engagement Rewards**: Reward users based on their engagement hours.
5. **Leaderboard**: Display a global leaderboard of top players.

## Configuration Examples

### .env File

```env
SOLANA_NETWORK=https://api.devnet.solana.com
TREASURY_WALLET_PRIVATE_KEY=[insert_private_key_array]
```

### package.json

```json
{
    "name": "yalla-esports-server",
    "version": "1.0.0",
    "main": "src/index.js",
    "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js"
    },
    "dependencies": {
        "@solana/spl-token": "^0.3.5",
        "@solana/web3.js": "^1.66.0",
        "cors": "^2.8.5",
        "dotenv": "^10.0.0",
        "express": "^4.17.1",
        "firebase-admin": "^10.0.0"
    },
    "devDependencies": {
        "nodemon": "^2.0.15"
    }
}
```

## Important Reminders

1. Substitute `[insert_private_key_array]` in the `.env` file with your actual Solana wallet private key array.
2. Utilize Solana's devnet for demonstration purposes to avoid real SOL transactions.

Following these guidelines will help you set up a fully operational application that demonstrates the integration of the Solana blockchain with dynamic rewards for the gaming community.
