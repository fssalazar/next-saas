'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<typeof Link> {
  href: string
}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()
  const { href, ...rest } = props

  const isCurrent = href === pathname
  return <Link href={href} data-current={isCurrent} {...rest} />
}
