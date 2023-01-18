type Currency = 'ETH'

interface WalletPostData {
  name: string
  currency: Currency
  initialBalance: number
}

interface Wallet {
  id: number
  name: string
  currency: Currency
  balance: number
  todayBalanceChange: number
  createdAt: Date | string
}
