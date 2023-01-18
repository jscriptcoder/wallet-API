import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Page from '@/components/Page'
import { ColumnsType } from 'antd/es/table'

const columns: ColumnsType<Wallet> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    align: 'center',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    align: 'center',
  },
  {
    title: "Today's change",
    dataIndex: 'todayBalanceChange',
    key: 'todayBalanceChange',
    align: 'center',
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    render: (createdAt: string) => format(new Date(createdAt), 'PPpp'),
  },
]

export default function Wallets() {
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      setLoading(true)

      try {
        const response = await fetch('/api/wallets')
        const data = (await response.json()) as WalletsResponse
        setWallets(data.wallets)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  return (
    <Page>
      <Table columns={columns} dataSource={wallets} loading={loading} />
    </Page>
  )
}
