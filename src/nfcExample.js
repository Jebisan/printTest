import React from 'react'
 
import { useNfcRead } from 'react-nfc'
 

export function nfcExample() {
  const nfc = useNfcRead()
  return (
    <div>
      <div>Status: {nfc.status}</div>
      <div>Data: {JSON.stringify(nfc.data)}</div>
    </div>
  )
}

