import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const vouchersPath = path.join(process.cwd(), 'app/db/vouchers.json')

export async function GET() {
  try {
    const fileContents = await fs.readFile(vouchersPath, 'utf8')
    const vouchers = JSON.parse(fileContents)
    return NextResponse.json(vouchers)
  } catch (error) {
    console.error('Error fetching vouchers:', error)
    return NextResponse.json({ error: 'Failed to fetch vouchers' }, { status: 500 })
  }
}

