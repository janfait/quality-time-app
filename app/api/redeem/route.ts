import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const vouchersPath = path.join(process.cwd(), 'app/db/vouchers.json')

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    
    if (!code) {
      return NextResponse.json({ success: false, message: 'Voucher code is required' }, { status: 400 })
    }

    const fileContents = await fs.readFile(vouchersPath, 'utf8')
    let vouchers = JSON.parse(fileContents)

    const voucherIndex = vouchers.findIndex((v: any) => v.code === code)

    console.log(voucherIndex)

    if (voucherIndex == -1) {
      console.log("Responding with 404")
      return NextResponse.json({ success: false, message: 'Invalid voucher code' }, { status: 404 })
    }

    // Remove the voucher from the list
    vouchers.splice(voucherIndex, 1)

    // Write the updated vouchers back to the file
    await fs.writeFile(vouchersPath, JSON.stringify(vouchers, null, 2))

    let output = { success: true, message: 'Voucher redeemed successfully', voucher: vouchers[voucherIndex]}
    console.log(JSON.stringify(output))
    return NextResponse.json(output)
  } catch (error) {
    console.error('Error redeeming voucher:', error)
    return NextResponse.json({ success: false, message: 'An error occurred while redeeming the voucher' }, { status: 500 })
  }
}

