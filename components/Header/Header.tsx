import { WalletOutlined } from '@ant-design/icons'
import { Layout } from 'antd'

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <Layout.Header className="flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <WalletOutlined className="text-3xl" />
        <span className="text-2xl">{title}</span>
      </div>
    </Layout.Header>
  )
}
