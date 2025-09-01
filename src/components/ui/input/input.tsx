'use client'

import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

const inputVariants = cva(
  [
    'flex w-full border select-none rounded-md text-sm ring-offset-white dark:ring-offset-neutral-900',
    'focus-visible:border-primary-500 focus-visible:outline-none focus-visible:text-neutral-500 focus-visible:placeholder:text-neutral-400 focus:border-primary-500',
    'text-neutral-300 placeholder:text-neutral-300 dark:placeholder:text-neutral-400',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'bg-white dark:bg-neutral-900'
  ],
  {
    variants: {
      variant: {
        default: 'border-gray-300 dark:border-neutral-700',
        error: 'border-red-500 dark:border-red-500 focus-visible:border-red-500',
        success: 'border-green-500 dark:border-green-500 focus-visible:border-green-500',
        warning: 'border-yellow-500 dark:border-yellow-500 focus-visible:border-yellow-500'
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 text-base'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
)

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(inputVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
export { inputVariants }
export type { InputProps }