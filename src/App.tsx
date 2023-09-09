
import { Keypair } from '@solana/web3.js';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { Wallet, solanaWalletGen } from './utils/walletGenerators';
import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { Box, Button, Select, Text, Spacer, VStack, useBreakpointValue } from '@chakra-ui/react';
import { saveAs } from 'file-saver';



// Add the following line to polyfill Buffer
(global as any).Buffer = Buffer;


function App() {
  const [selectedBlockchain, setSelectedBlockchain] = useState('Solana');
  const [walletData, setWalletData] = useState<Wallet | null>(null);;

  const generateWallet = async () => {

    let wallet: Wallet = await solanaWalletGen()
    if (wallet != null) {
      setWalletData(wallet);
    } else {
      console.log("Wallet Generation Error")
    }

    // Store wallet data in state

  };

  const downloadAsJSON = () => {
    if (walletData) {
      const walletJSON = JSON.stringify(walletData, null, 2);
      const blob = new Blob([walletJSON], { type: 'application/json' });
      saveAs(blob, `${selectedBlockchain}.json`);
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


