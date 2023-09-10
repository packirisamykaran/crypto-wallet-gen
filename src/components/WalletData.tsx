import React from 'react'
import SolanaLayout from './Solana';

export default function Wallet({ walletData }) {

  if (!walletData) {
    // Handle the case when walletData is null or undefined
    return <></>;
  }

  if ('publicKey' in walletData && 'secretKeyBase58' in walletData && 'secretKeyText' in walletData && 'recoveryPhrase' in walletData) {
    // This appears to be a Solana wallet
    return <SolanaLayout walletData={walletData} />;
  }
  return (
    <div>Wallet</div>
  )
}
