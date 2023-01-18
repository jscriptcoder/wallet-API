type Currency = 'ETH'

interface WalletPostData {
  name: string
  currency?: Currency // defaults to ETH
  initialBalance?: number // defaults to 0.00
}

interface Wallet {
  id: number
  name: string
  currency: Currency
  balance: number
  todayBalanceChange: number
  createdAt: Date | string
  updatedAt: Date | string
}

interface TxPostData {
  from: number
  to: number
  amount: number
  currency?: Currency // defaults to ETH
}
