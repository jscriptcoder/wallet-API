import { Button, Form, Input, InputNumber, notification, Select } from 'antd'
import { useCallback, useState } from 'react'
import Page from '@/components/Page'

export default function CreateWallet() {
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState<Currency>('ETH')
  const [initialBalance, setInitialBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const createClick = useCallback(async () => {
    if (!name) {
      return
    }

    setLoading(true)

    try {
      const bodyObj: WalletPostData = {
        name,
        currency,
        initialBalance,
      }

      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj),
      })

      const data = (await response.json()) as Wallet | ErrorData

      if ('error' in data) {
        throw Error(data.error)
      }

      notification.success({
        message: 'Wallet created',
        description: `A new wallet with name "${data.name}" and id ${data.id} has been created.`,
      })

      // Reset fields. TODO: useReducer better?
      setName('')
      setCurrency('ETH')
      setInitialBalance(0)
    } catch (e) {
      notification.error({
        message: 'Something went wrong',
        description: `${e}`,
      })
    } finally {
      setLoading(false)
    }
  }, [name, currency, initialBalance])

  return (
    <Page title="Create a wallet">
      <Form
        className="w-[30%]"
        labelCol={{ span: 12 }}
        layout="horizontal"
        size="large"
      >
        <Form.Item label="Wallet's name">
          <Input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Item>
        <Form.Item label="Currency">
          <Select value={currency} onChange={(value) => setCurrency(value)}>
            <Select.Option value="ETH">Ether</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Initial balance">
          <InputNumber
            value={initialBalance}
            onChange={(value) => setInitialBalance(value || 0)}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button disabled={!name || loading} onClick={createClick}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Page>
  )
}
