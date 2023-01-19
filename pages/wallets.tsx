import { List, Modal, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { format } from 'date-fns'
import Page from '@/components/Page'
import useWallets from '@/utils/useWallets'
import { EyeOutlined, WalletTwoTone } from '@ant-design/icons'
import { isToday } from '@/utils/date'

interface WalletDetailsProps {
  wallet: Wallet
}

const WalletDetails = ({ wallet }: WalletDetailsProps) => {
  const todayBalanceChange = isToday(wallet.updatedAt)
    ? `${wallet.todayBalanceChange} ${wallet.currency}`
    : `0 ${wallet.currency}`

  return (
    <List size="large">
      <List.Item>
        <label className="font-bold">Balance</label>
        <span>
          {wallet.balance} {wallet.currency}
        </span>
      </List.Item>
      <List.Item>
        <label className="font-bold">Today's change</label>
        <span>{todayBalanceChange}</span>
      </List.Item>
      <List.Item>
        <label className="font-bold">Created</label>
        <span>{format(new Date(wallet.createdAt), 'PPpp')}</span>
      </List.Item>
      <List.Item>
        <label className="font-bold">Last update</label>
        <span>{format(new Date(wallet.updatedAt), 'PPpp')}</span>
      </List.Item>
    </List>
  )
}

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
  // {
  //   title: "Today's change",
  //   dataIndex: 'todayBalanceChange',
  //   key: 'todayBalanceChange',
  //   align: 'center',
  // },
  // {
  //   title: 'Created',
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   align: 'center',
  //   render: (createdAt: string) => format(new Date(createdAt), 'PPpp'),
  // },
  {
    title: 'Details',
    key: 'details',
    align: 'center',
    render: (_, wallet: Wallet) => (
      <EyeOutlined
        title="Wallet's details"
        className="cursor hover:text-[#87cefb] text-lg"
        onClick={() => {
          Modal.info({
            icon: <WalletTwoTone />,
            title: wallet.name,
            maskClosable: true,
            closable: true,
            centered: true,
            footer: null,
            width: 600,
            content: <WalletDetails wallet={wallet} />,
          })
        }}
      />
    ),
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
