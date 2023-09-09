import { Theme } from '@emotion/react'
import styled, { Interpolation } from '@emotion/styled'
import { HTMLAttributes } from 'react'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  text: string
  htmlFor: string
  cssStyle?: Interpolation<Theme>
}

const Label = ({ text, htmlFor, cssStyle, ...props }: LabelProps) => {
  return <SLable htmlFor={htmlFor}>{text}</SLable>
}

export default Label

const SLable = styled.label`
  max-width: 10rem;
  height: 1rem;
  margin-left: 0.5rem;
`
