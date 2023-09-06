import './App.css';
import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { Box, Button, Select, Text, Spacer, VStack, useBreakpointValue } from '@chakra-ui/react';
import { saveAs } from 'file-saver';




// Define a type or interface for wallet data
interface WalletData {
  publicKey: string;
  secretKeyBase58: string;
  secretKeyText: string;
  recoveryPhrase: string;
}


// Add the following line to polyfill Buffer
(global as any).Buffer = Buffer;


function App() {
  const [selectedBlockchain, setSelectedBlockchain] = useState('Solana');
  const [walletData, setWalletData] = useState<WalletData | null>(null);;

  const generateWallet = async () => {

    // Generate a BIP39 mnemonic (recovery phrase)
    const mnemonic = generateMnemonic();

    // Derive a Solana key pair from the mnemonic
    const seed = await mnemonicToSeed(mnemonic);
    const keyPair = Keypair.fromSeed(seed.slice(0, 32)); // Use the first 32 bytes as the seed
    const secretKeyBuffer = Buffer.from(keyPair.secretKey);

    // Generate wallet data here
    let publicKey = keyPair.publicKey.toBase58();
    let secretKeyBase58 = keyPair.secretKey.toString();
    let secretKeyText = secretKeyBuffer.toString('hex'); // Convert to plain text
    let recoveryPhrase = mnemonic;

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
          <Box width="80%" maxWidth="400px" borderWidth="1px" p={4} borderRadius="md">
            <Text fontWeight="bold" fontSize="lg">Wallet Data</Text>
            <Spacer h="1rem" />
            <Text>
              <b>Public Key:</b> <span style={{ maxWidth: '100%' }}>{walletData.publicKey}</span>
            </Text>
            <Spacer h="1rem" />
            <Text>
              <b>Secret Key Base58:</b> <span style={{ maxWidth: '100%' }}>{walletData.secretKeyBase58}</span>
            </Text>
            <Spacer h="1rem" />
            <Text>
              <b>Secret Key Text:</b> <span style={{ maxWidth: '100%' }}>{walletData.secretKeyText}</span>
            </Text>
            <Spacer h="1rem" />
            <Text>
              <b>Recovery Phrase:</b> <span style={{ maxWidth: '100%' }}>{walletData.recoveryPhrase}</span>
            </Text>
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
