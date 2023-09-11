import React from 'react'
import { Box, Button, Select, Text, Spacer, VStack, useBreakpointValue } from '@chakra-ui/react';
import { EthereumWallet } from '../utils/walletGenerators';


interface Props {
  walletData: EthereumWallet
}

export default function Solana({ walletData }: Props) {
  return (
    <>
      <Text fontWeight="bold" fontSize="lg">Wallet Data</Text>
      <Spacer h="1rem" />
      <Text>
        <b>Public Key:</b> <span style={{ maxWidth: '100%' }}>{walletData.publicKey}</span>
      </Text>
      <Spacer h="1rem" />
      <Text>
        <b>Private Key:</b> <span style={{ maxWidth: '100%' }}>{walletData.privateKey}</span>
      </Text>
      <Spacer h="1rem" />
      <Text>
        <b>Recovery Phrase:</b><br /> <span style={{ maxWidth: '100%' }}>{walletData.recoveryPhrase}</span>
      </Text>
    </>
  )
}
