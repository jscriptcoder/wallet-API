import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import Page from '@/components/Page'
import useWallets from '@/utils/useWallets'

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

export default function ListWallets() {
  const { wallets, loadingWallets } = useWallets()

  return (
    <Page title="List of wallets">
      <Table
        size="large"
        columns={columns}
        dataSource={wallets}
        loading={loadingWallets}
      />
    </Page>
  )
}
