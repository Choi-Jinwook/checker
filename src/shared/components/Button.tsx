import { Interpolation, Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { color } from '@shared/constants'
import { HTMLAttributes, MouseEventHandler } from 'react'

interface SButtonProps {
  kind?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'quaternary'
    | 'mustard'
    | 'delete'
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
  shape?: 'normal' | 'semi-round'
}

export interface ButtonProps
  extends SButtonProps,
    HTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string
  borderColor?: string
  color?: string
  margin?: string
  cssStyle?: Interpolation<Theme>
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  kind = 'primary',
  size = 'medium',
  shape = 'normal',
  backgroundColor,
  borderColor,
  color,
  margin,
  cssStyle,
  children,
  ...props
}) => {
  return (
    <SButton
      kind={kind}
      size={size}
      shape={shape}
      style={{ backgroundColor, color, borderColor, margin }}
      css={cssStyle}
      {...props}
    >
      {children}
    </SButton>
  )
}

export default Button

const SButton = styled.button<SButtonProps>`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  min-width: 80px;
  max-width: 356px;
  border: 1px solid #0800ff;
  cursor: pointer;
  display: inline-block;
  word-break: keep-all;
  white-space: pre;
  text-align: center;

  ${({ kind }) => styles[kind!]}
  ${({ size }) => styles[size!]}
  ${({ shape }) => styles[shape!]}
`

const styles = {
  primary: css`
    color: ${color.white};
    border-color: ${color.main};
    background-color: ${color.main};
  `,
  secondary: css`
    color: ${color.main};
    background-color: transparent;
  `,
  tertiary: css`
    color: ${color.white};
    border-color: ${color.white};
    background-color: ${color.gray05};
  `,
  quaternary: css`
    color: ${color.gray06};
    border-color: ${color.gray06};
    background-color: ${color.white};
  `,
  mustard: css`
    color: ${color.white};
    border-color: ${color.mustard};
    background-color: ${color.mustard};
  `,
  delete: css`
    color: ${color.white};
    border-color: ${color.warning};
    background-color: ${color.warning};
  `,
  xsmall: css`
    width: 46px;
    height: 20px;
    font-size: 10px;
    font-weight: 400;
    border-radius: 10px;
  `,
  small: css`
    width: 76px;
    height: 26px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 13px;
  `,
  medium: css`
    width: 68px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 18px;
  `,
  large: css`
    width: 90px;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 24px;
  `,
  xlarge: css`
    width: 174px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 24px;
  `,
  normal: css``,
  'semi-round': css`
    border-radius: 9px;
  `
}
