import React from 'react'
import { Box, Button, Select, Text, Spacer, VStack, useBreakpointValue } from '@chakra-ui/react';
import { SolanaWallet } from '../utils/walletGenerators';


export default function Solana(walletData: SolanaWallet) {
  return (
    <>
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
    </>
  )
}
