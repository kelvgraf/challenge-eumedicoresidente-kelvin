'use client'

import clsx from 'clsx'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('animate-pulse bg-neutral-900/10 dark:bg-neutral-100/10', className)}
      {...props}
    />
  )
}

export { Skeleton }
