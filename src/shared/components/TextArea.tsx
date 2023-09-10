import styled from '@emotion/styled'
import { color } from '@shared/constants'
import { HTMLAttributes, useEffect, useState } from 'react'

interface TextAreaProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string
  onChange(value: string): void
}

const TextArea = ({
  value: initialValue,
  onChange,
  ...props
}: TextAreaProps) => {
  const [value, setValue] = useState<string>(initialValue || '')

  useEffect(() => {
    onChange?.(value)
  }, [value, onChange])

  return (
    <STArea
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      {...props}
    />
  )
}

export default TextArea

const STArea = styled.textarea`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 50vh;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
  &:focus {
    outline: none;
  }
`
