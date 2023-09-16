import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Button } from '@shared/components'
import { color } from '@shared/constants'

export default function Main() {
  return (
    <Container>
      <Title>마이픽 MyPick</Title>
      <Explanation>좋아하는 장소를 저장해보세요!</Explanation>
      <Link href="/login">
        <StartButton kind="secondary">시작하기▶</StartButton>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const Title = styled.div`
  font-size: 2rem;
`

const Explanation = styled.div`
  font-size: 1rem;
`

const StartButton = styled(Button)`
  color: ${color.black};
  border-color: ${color.white};
  font-weight: 400;
  min-width: 80px;
`
