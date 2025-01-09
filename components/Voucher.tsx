'use client'

import { Button } from "@/components/ui/button"

interface VoucherProps {
  title: string
  description: string
  icon: string
  status: string
}

export default function Voucher({ title, description, icon, status }: VoucherProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-center mb-4">{description}</p>
      <p className="text-gray-600 text-center font-semibold mb-4">{status}</p>
    </div>
  )
}

