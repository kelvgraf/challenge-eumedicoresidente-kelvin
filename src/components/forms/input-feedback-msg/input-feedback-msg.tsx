import { cva } from 'class-variance-authority'

import { Typography } from '@/components/typography'

const inputFeedbackMsgVariants = cva(['text-[0.8rem] sm:text-xs mt-[2px]'], {
  variants: {
    variant: {
      error: 'text-red-500 dark:text-red-500',
      success: 'text-green-500 dark:text-green-500',
      warning: 'text-yellow-500 dark:text-yellow-500'
    }
  }
})

interface InputFeedbackMsgProps {
  error?: string
  success?: string
  warning?: string
}

function InputFeedbackMsg({ error, success, warning }: InputFeedbackMsgProps) {
  function renderMsg(errorRender: string, type: 'error' | 'success' | 'warning') {
    return (
      <div className='flex items-center gap-1 h-6 font-light tracking-wide '>
        {errorRender && (
          <Typography text={errorRender} className={inputFeedbackMsgVariants({ variant: type })} />
        )}
      </div>
    )
  }

  if (error) {
    return <>{renderMsg(error, 'error')}</>
  }

  if (success) {
    return <>{renderMsg(success, 'success')}</>
  }

  if (warning) {
    return <>{renderMsg(warning, 'warning')}</>
  }

  return <></>
}

export { InputFeedbackMsg }
export type { InputFeedbackMsgProps }
