import { Typography } from 'antd'
import { PropsWithChildren } from 'react'

interface PageProps extends PropsWithChildren {
  title: string
}

export default function Page({ title, children }: PageProps) {
  return (
    <div className="h-full flex flex-col space-y-6 justify-center items-center">
      {title && <Typography.Title>{title}</Typography.Title>}
      {children}
    </div>
  )
}
