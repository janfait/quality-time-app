import fs from 'fs/promises'
import path from 'path'

const vouchersPath = path.join(process.cwd(), 'app/db/vouchers.json')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { code } = req.body

  if (!code) {
    return res.status(400).json({ success: false, message: 'Voucher code is required' })
  }

  try {
    const fileContents = await fs.readFile(vouchersPath, 'utf8')
    let vouchers = JSON.parse(fileContents)

    const voucherIndex = vouchers.findIndex((v) => v.code === code)

    if (voucherIndex === -1) {
      return res.status(404).json({ success: false, message: 'Invalid voucher code' })
    }

    // Remove the voucher from the list
    vouchers.splice(voucherIndex, 1)

    // Write the updated vouchers back to the file
    await fs.writeFile(vouchersPath, JSON.stringify(vouchers, null, 2))

    return res.status(200).json({ success: true, message: 'Voucher redeemed successfully' })
  } catch (error) {
    console.error('Error redeeming voucher:', error)
    return res.status(500).json({ success: false, message: 'An error occurred while redeeming the voucher' })
  }
}

