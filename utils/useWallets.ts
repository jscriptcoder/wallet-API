import { useEffect, useState } from 'react'

export default function useWallets() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      setLoading(true)

      try {
        const response = await fetch('/api/wallets')
        const data = (await response.json()) as WalletsData | ErrorData

        if ('error' in data) {
          throw Error(data.error)
        }

        setWallets(data.wallets)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  return {
    wallets,
    loadingWallets: loading,
  }
}
