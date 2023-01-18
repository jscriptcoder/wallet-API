import { TableOutlined, WalletOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { Key, ReactNode, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode): MenuItem {
  return {
    key,
    label,
    icon,
  } as MenuItem
}

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  return (
    <Layout.Sider
      collapsed={collapsed}
      collapsible
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={[
          getItem('Create Wallet', 'wallet', <WalletOutlined />),
          getItem('List Wallets', 'wallets', <TableOutlined />),
        ]}
        onClick={(item) => router.push(`/${item.key}`)}
      ></Menu>
    </Layout.Sider>
  )
}
