import { Interpolation, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { color } from '@shared/constants'
import { HTMLAttributes, forwardRef, useEffect, useState } from 'react'

interface SInputProps {
  shape?: 'normal' | 'round' | 'semi-round' | 'basic'
  kind?: 'primary' | 'secondary' | 'tertiary'
}

interface InputProps extends SInputProps, HTMLAttributes<HTMLInputElement> {
  cssStyle?: Interpolation<Theme>
  value?: string
  type?: string
}

interface ControlledInputProps
  extends SInputProps,
    Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  cssStyle?: Interpolation<Theme>
  value?: string
  type?: string
  onChange?(value: string): void
}

export const UncontrolledInput = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      type,
      shape = 'normal',
      kind = 'primary',
      cssStyle,
      value: initialValue,
      ...props
    },
    ref
  ) {
    const [value, setValue] = useState<string>(initialValue || '')

    return (
      <SInput
        ref={ref}
        type={type}
        shape={shape}
        kind={kind}
        css={cssStyle}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        {...props}
      />
    )
  }
)

export const ControlledInput = ({
  shape = 'normal',
  kind = 'primary',
  type,
  cssStyle,
  value: initialValue,
  onChange,
  ...props
}: ControlledInputProps) => {
  const [value, setValue] = useState<string>(initialValue || '')

  useEffect(() => {
    onChange?.(value)
  }, [value, onChange])

  return (
    <SInput
      type={type ? type : 'text'}
      shape={shape}
      kind={kind}
      css={cssStyle}
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
      {...props}
    />
  )
}

const SInput = styled.input<SInputProps>`
  display: inline-block;
  width: calc(100% - 4px);
  max-width: 356px;
  border: 1px solid;

  background-color: ${color.white};

  text-align: center;

  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  ${({ shape }) => styles[shape!]}
  ${({ kind }) => styles[kind!]}
`

const styles = {
  normal: css`
    height: 52px;
    border-radius: 4px;
  `,
  round: css`
    height: 42px;
    border-radius: 22px;
  `,
  'semi-round': css`
    height: 42px;
    border-radius: 10px;
  `,
  basic: css`
    height: 2rem;
    border-radius: 0;
  `,
  primary: css`
    color: ${color.lightBlack};
    border-color: ${color.main};

    &::placeholder {
      color: ${color.mainPlaceholder};
    }
  `,
  secondary: css`
    color: ${color.lightBlack};
    border-color: ${color.gray06};

    &::placeholder {
      color: ${color.gray06};
    }
  `,
  tertiary: css`
    border: none;

    &:focus {
      outline: none;
    }
  `
}
