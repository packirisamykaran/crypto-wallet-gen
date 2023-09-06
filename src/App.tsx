

import './App.css';
import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { Box, Button, Select, VStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { saveAs } from 'file-saver';





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
  const [selectedBlockchain, setSelectedBlockchain] = useState('Ethereum');
  const [walletData, setWalletData] = useState(null);

  const generateWallet = () => {
    // Generate wallet data here
    const publicKey = 'your_public_key';
    const secretKeyBase58 = 'your_secret_key_base58';
    const secretKeyText = 'your_secret_key_text';
    const recoveryPhrase = 'your_recovery_phrase';

    // Store wallet data in state
    setWalletData({ publicKey, secretKeyBase58, secretKeyText, recoveryPhrase });
  };

  const downloadAsJSON = () => {
    if (walletData) {
      const walletJSON = JSON.stringify(walletData, null, 2);
      const blob = new Blob([walletJSON], { type: 'application/json' });
      saveAs(blob, 'wallet.json');
    }
  };

  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' }); // Adjust button size based on screen width


  return (
    <div className="App">
      <VStack spacing={4} align="center">
        <Text fontSize="xl">Crypto Wallet Generator</Text>
        <Select
          value={selectedBlockchain}
          onChange={(e) => setSelectedBlockchain(e.target.value)}
          width="80%"
          maxWidth="300px"
          variant="filled"
        >
          <option value="Ethereum">Ethereum</option>
          <option value="Bitcoin">Bitcoin</option>
          {/* Add more blockchain options here */}
        </Select>
        <Button
          size={buttonSize}
          colorScheme="blue"
          onClick={generateWallet}
          width="80%"
          maxWidth="300px"
        >
          Generate Wallet
        </Button>
        {walletData && (
          <Box width="80%" maxWidth="300px" borderWidth="1px" p={4} borderRadius="md">
            <Text fontWeight="bold">Wallet Data</Text>
            <Text>Public Key: {walletData.publicKey}</Text>
            <Text>Secret Key Base58: {walletData.secretKeyBase58}</Text>
            <Text>Secret Key Text: {walletData.secretKeyText}</Text>
            <Text>Recovery Phrase: {walletData.recoveryPhrase}</Text>
            <Button
              size={buttonSize}
              colorScheme="blue"
              onClick={downloadAsJSON}
              mt={4}
              width="100%"
            >
              Download as JSON
            </Button>
          </Box>
        )}
      </VStack>
    </div >
  );
}

export default App;
