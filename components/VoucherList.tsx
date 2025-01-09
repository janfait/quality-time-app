'use client'

import { useEffect, useState, useCallback } from 'react'
import Voucher from './Voucher'

interface VoucherType {
  id: string
  title: string
  description: string
  icon: string
  code: string
  status: string
}

export default function VoucherList() {
  const [vouchers, setVouchers] = useState<VoucherType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVouchers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/vouchers')
      if (!response.ok) {
        throw new Error('Failed to fetch vouchers')
      }
      const data = await response.json()
      setVouchers(data)
    } catch (error) {
      console.error('Error fetching vouchers:', error)
      setError('Failed to load vouchers. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVouchers()
  }, [fetchVouchers])

  if (isLoading) {
    return <div className="text-center mt-8">Loading vouchers...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {vouchers.map((voucher) => (
        <Voucher
          key={voucher.id}
          title={voucher.title}
          description={voucher.description}
          icon={voucher.icon}
          status={voucher.status}
        />
      ))}
    </div>
  )
}

