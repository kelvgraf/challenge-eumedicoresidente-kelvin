import { twMerge } from 'tailwind-merge'

interface LabelProps {
  className?: string
  id?: string
  label: string
}

function Label({ className, id, label }: LabelProps) {

  return (
    <label
      className={twMerge('text-neutral-800 dark:text-neutral-100 text-sm font-medium', className)}
      htmlFor={id}
    >
      {label}
    </label>
  )
}

export { Label }
