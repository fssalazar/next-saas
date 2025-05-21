import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/auth'
export default async function AppLayout({
  children,
  sheet,
}: {
  children: React.ReactNode
  sheet: React.ReactNode
}) {
  const isUserAuthenticated = await isAuthenticated()
  if (!isUserAuthenticated) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {sheet}
    </>
  )
}
