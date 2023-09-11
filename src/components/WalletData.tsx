import React from 'react'
import SolanaLayout from './Solana';
import EthereumLayout from "./Ethereum"
import { WalletTypes } from '../utils/walletGenerators';

interface Props {
  walletData: WalletTypes
}

export default function Wallet({ walletData }: Props) {

  if (!walletData) {
    // Handle the case when walletData is null or undefined
    return <></>;
  }

  if ('publicKey' in walletData && 'secretKeyBase58' in walletData && 'secretKeyText' in walletData && 'recoveryPhrase' in walletData) {
    // This appears to be a Solana wallet
    return <SolanaLayout walletData={walletData} />;
  } else if ('publicKey' in walletData && "privateKey" in walletData && 'recoveryPhrase' in walletData) {
    return <EthereumLayout walletData={walletData} />;
  }

  return (
    <></>
  )
}
