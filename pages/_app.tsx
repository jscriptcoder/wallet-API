import type { AppProps } from 'next/app'
import { ConfigProvider, theme, Layout } from 'antd'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SideMenu from '@/components/SideMenu'

const { darkAlgorithm } = theme
const darkTheme = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: '#87cefb',
    colorLinkHover: '#87cefb',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={darkTheme}>
      <Layout className="h-full">
        <SideMenu />
        <Layout>
          <Header title="Wallet Manager" />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
