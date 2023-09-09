import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { FormContentProps } from '@shared/types'
import React, { useCallback, useState } from 'react'

interface ChildrenProps {
  value?: FormContentProps
  handleFirstContent: (content1: string) => void
  handleSecondContent: (content2: string) => void
  onSubmit(e: React.FormEvent | React.MouseEvent): void
}

interface FormProps {
  id?: string
  children(props: ChildrenProps): React.ReactNode
  onSubmit(value: FormContentProps): Promise<void>
  cssStyle?: Interpolation<Theme>
}

const Form = ({ id, children, onSubmit, cssStyle }: FormProps) => {
  const [value, setValue] = useState<FormContentProps>({
    content1: '',
    content2: ''
  })

  const handleFirstContent = useCallback((content1: string) => {
    setValue((prev) => ({ ...prev, content1: content1 }))
  }, [])

  const handleSecondContent = useCallback((content2: string) => {
    setValue((prev) => ({ ...prev, content2: content2 }))
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault()

      if ((e.target as HTMLButtonElement).id === 'cancel') return

      if (value.content1 === '' || value.content2 === '') {
        alert('빈 내용이 있어요.')
        return
      }

      onSubmit(value)
    },
    [onSubmit, value]
  )

  return (
    <SForm id={id} onSubmit={handleSubmit} css={cssStyle}>
      {children({
        value,
        handleFirstContent,
        handleSecondContent,
        onSubmit: handleSubmit
      })}
    </SForm>
  )
}

export default Form

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;
`
