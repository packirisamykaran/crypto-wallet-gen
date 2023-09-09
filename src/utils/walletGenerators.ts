import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { ethers } from "ethers";
import { Wallet as ethWallet, utils } from "ethers";

export interface SolanaWallet {
  publicKey: string;
  secretKeyBase58: string[];
  secretKeyText: string;
  recoveryPhrase: string;
}

export interface EthereumWallet {
  publicKey: string;
  privateKey: string;
  recoveryPhrase: string;
}

export async function solanaWalletGen(): Promise<SolanaWallet> {
  // Generate a BIP39 mnemonic (recovery phrase)
  const mnemonic = generateMnemonic();

  // Derive a Solana key pair from the mnemonic
  const seed = await mnemonicToSeed(mnemonic);
  const keyPair = Keypair.fromSeed(seed.slice(0, 32)); // Use the first 32 bytes as the seed
  const secretKeyBuffer = Buffer.from(keyPair.secretKey);

  // Generate SolanaWallet data here
  let publicKey = keyPair.publicKey.toBase58();
  let secretKeyBase58 = [keyPair.secretKey.toString()];
  let secretKeyText = secretKeyBuffer.toString("hex"); // Convert to plain text
  let recoveryPhrase = mnemonic;

  let SolanaWallet: SolanaWallet = {
    publicKey,
    secretKeyBase58,
    secretKeyText,
    recoveryPhrase,
  };

  return SolanaWallet;
}

export async function ethereumWalletGen(): Promise<EthereumWallet> {
  // Generate a new Ethereum wallet
  const wallet = ethWallet.createRandom();

  // Extract the public key, private key, and mnemonic
  const publicKey = wallet.address;
  const privateKey = wallet.privateKey;
  const recoveryPhrase = wallet.mnemonic?.phrase;

  if (recoveryPhrase != null) {
    const ethereumWallet: EthereumWallet = {
      publicKey,
      privateKey,
      recoveryPhrase,
    };

    return ethereumWallet;
  } else {
    console.log("error generating ethereum wallet");
    const ethereumWallet: EthereumWallet = {
      publicKey: "",
      privateKey: "",
      recoveryPhrase: "",
    };
    return ethereumWallet;
  }
}
