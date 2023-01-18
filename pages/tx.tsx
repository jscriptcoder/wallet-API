import { Button, Form, InputNumber, notification, Select } from 'antd'
import Page from '@/components/Page'
import useWallets from '@/utils/useWallets'
import { useCallback, useState } from 'react'

export default function MoveFunds() {
  const { wallets, loadingWallets } = useWallets()
  const [from, setFrom] = useState<number>()
  const [to, setTo] = useState<number>()
  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<Currency>('ETH')
  const [loading, setLoading] = useState(false)

  const submitClick = useCallback(async () => {
    if (!from || !to) {
      return
    }

    setLoading(true)

    try {
      const bodyObj: TxPostData = {
        from,
        to,
        amount,
        currency,
      }

      const response = await fetch('/api/tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj),
      })

      const data = (await response.json()) as Wallet[] | ErrorData

      if ('error' in data) {
        throw Error(data.error)
      }

      notification.success({
        message: 'Successful transaction',
        description: `TODO`,
      })
    } catch (e) {
      notification.error({
        message: 'Something went wrong',
        description: `${e}`,
      })
    } finally {
      setLoading(false)
    }
  }, [from, to, amount, currency])

  return (
    <Page title="Transact between wallets">
      <Form
        className="w-[30%]"
        labelCol={{ span: 12 }}
        layout="horizontal"
        size="large"
      >
        <Form.Item label="From wallet">
          <Select onChange={(value) => setFrom(value)}>
            {wallets &&
              wallets
                .filter((wallet) => to !== wallet.id) // if selected, do not show "to" wallet
                .map((wallet) => (
                  <Select.Option value={wallet.id}>
                    <div className="flex flex-col">
                      <span>{wallet.name}</span>
                      <span className="text-xs text-gray-400">
                        {wallet.balance} ETH
                      </span>
                    </div>
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>
        <Form.Item label="To wallet">
          <Select onChange={(value) => setTo(value)}>
            {wallets &&
              wallets
                .filter((wallet) => from !== wallet.id) // if selected, do not show "from" wallet
                .map((wallet) => (
                  <Select.Option value={wallet.id}>
                    <div className="flex flex-col">
                      <span>{wallet.name}</span>
                      <span className="text-xs text-gray-400">
                        {wallet.balance} ETH
                      </span>
                    </div>
                  </Select.Option>
                ))}
          </Select>
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber
            value={amount}
            onChange={(value) => setAmount(value || 0)}
          />
        </Form.Item>
        <Form.Item label="Currency">
          <Select value={currency} onChange={(value) => setCurrency(value)}>
            <Select.Option value="ETH">Ether</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button disabled={!from || !to || loading} onClick={submitClick}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Page>
  )
}
