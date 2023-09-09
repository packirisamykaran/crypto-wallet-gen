import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39";

export interface Wallet {
  publicKey: string;
  secretKeyBase58: string[];
  secretKeyText: string;
  recoveryPhrase: string;
}

export async function solanaWalletGen(): Promise<Wallet> {
  // Generate a BIP39 mnemonic (recovery phrase)
  const mnemonic = generateMnemonic();

  // Derive a Solana key pair from the mnemonic
  const seed = await mnemonicToSeed(mnemonic);
  const keyPair = Keypair.fromSeed(seed.slice(0, 32)); // Use the first 32 bytes as the seed
  const secretKeyBuffer = Buffer.from(keyPair.secretKey);

  // Generate wallet data here
  let publicKey = keyPair.publicKey.toBase58();
  let secretKeyBase58 = [keyPair.secretKey.toString()];
  let secretKeyText = secretKeyBuffer.toString("hex"); // Convert to plain text
  let recoveryPhrase = mnemonic;

  let wallet: Wallet = {
    publicKey,
    secretKeyBase58,
    secretKeyText,
    recoveryPhrase,
  };

  return wallet;
}
