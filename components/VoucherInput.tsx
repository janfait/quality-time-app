'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VoucherInputProps {
  onRedeemSuccess: () => void
}

export default function VoucherInput({ onRedeemSuccess }: VoucherInputProps) {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRedeem = async () => {
    if (!code) {
      setMessage('Please enter a voucher code')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      
      if (response.status == 404){
         setMessage('Sorry, that is an invalid code!')
         setCode('')
         onRedeemSuccess()
      }
      
      if (!response.ok && response.status != 404) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        setMessage('Voucher redeemed successfully! You are to enjoy ' + result.voucher.title )
        setCode('')
        onRedeemSuccess()
      } else {
        setMessage(result.message || 'An error occurred while redeeming the voucher')
      }
    } catch (error) {
      console.error('Error redeeming voucher:', error)
      setMessage('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Redeem Voucher</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter voucher code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleRedeem} disabled={isLoading}>
          {isLoading ? 'Redeeming...' : 'Redeem'}
        </Button>
      </div>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
