const { Connection, PublicKey, Keypair, Transaction, SystemProgram } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
require('dotenv').config();

const TREASURY_WALLET = Keypair.fromSecretKey(new Uint8Array(JSON.parse(process.env.TREASURY_WALLET_PRIVATE_KEY)));
const connection = new Connection(process.env.SOLANA_NETWORK);

async function sendSOL(recipient, amount) {
  try {
    const recipientPubkey = new PublicKey(recipient);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: TREASURY_WALLET.publicKey,
        toPubkey: recipientPubkey,
        lamports: amount * 1e9, // Convert SOL to lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [TREASURY_WALLET]);
    await connection.confirmTransaction(signature);
    return signature;
  } catch (error) {
    console.error(`Error sending SOL to ${recipient}:`, error.message);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { sendSOL };