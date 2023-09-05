import React from 'react';

import './App.css';
import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Buffer } from 'buffer';

// Add the following line to polyfill Buffer
(global as any).Buffer = Buffer;
async function generateSolanaWallet(): Promise<{
  publicKey: string;
  secretKeyBase58: string;
  secretKeyText: string;
  recoveryPhrase: string;
}> {
  // Generate a BIP39 mnemonic (recovery phrase)
  const mnemonic = generateMnemonic();

  // Derive a Solana key pair from the mnemonic
  const seed = await mnemonicToSeed(mnemonic);
  const keyPair = Keypair.fromSeed(seed.slice(0, 32)); // Use the first 32 bytes as the seed
  const secretKeyBuffer = Buffer.from(keyPair.secretKey);

  return {
    publicKey: keyPair.publicKey.toBase58(),
    secretKeyBase58: keyPair.secretKey.toString(),
    secretKeyText: secretKeyBuffer.toString('hex'), // Convert to plain text
    recoveryPhrase: mnemonic,
  };
}

// Example usage
async function main() {
  const {
    publicKey,
    secretKeyBase58,
    secretKeyText,
    recoveryPhrase,
  } = await generateSolanaWallet();

  console.log('Public Key:', publicKey);
  console.log('Secret Key (Base58):', secretKeyBase58);
  console.log('Secret Key (Text):', secretKeyText); // Display the secret key in plain text
  console.log('Recovery Phrase:', recoveryPhrase);
}

main().catch((error) => console.error(error));


function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
