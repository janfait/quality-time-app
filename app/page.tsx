'use client'


import { useState, useCallback } from 'react'

import VoucherList from '../components/VoucherList'

import VoucherInput from '../components/VoucherInput'


export default function Home() {

  const [refetchTrigger, setRefetchTrigger] = useState(0)


  const triggerRefetch = useCallback(() => {

    setRefetchTrigger(prev => prev + 1)

  }, [])


  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-pink-500 p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-white text-center mb-8">Honzi Quality Time</h1>

        <VoucherInput onRedeemSuccess={triggerRefetch} />

        <VoucherList key={refetchTrigger} />

      </div>

    </div>

  )

}

