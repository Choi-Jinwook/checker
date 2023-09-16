import styled from '@emotion/styled'
import Image from 'next/image'
import { css } from '@emotion/react'
import React from 'react'

interface SeeMine {
  seeMine: boolean
  toggleSeeMine: () => void
}

export const HomeHeader = ({ seeMine, toggleSeeMine }: SeeMine) => {
  return (
    <HeaderContainer>
      <ControlButton
        css={css`
          border-right: 1px solid black;
        `}
        onClick={() => {
          if (seeMine) return
          toggleSeeMine()
        }}
      >
        내 것만 보기
      </ControlButton>
      <ControlButton
        css={css`
          border-left: 1px solid black;
        `}
        onClick={() => {
          if (!seeMine) return
          toggleSeeMine()
        }}
      >
        전체보기
      </ControlButton>
      <RefreshButton
        onClick={() => {
          location.reload()
        }}
      >
        <Image src="/reload.jpeg" alt="reload" width={30} height={30} />
      </RefreshButton>
    </HeaderContainer>
  )
}

interface HeaderProps {
  text: string
  handleOrder?: (order: 'latest' | 'popularity') => void
}

export const Header = ({ text, handleOrder }: HeaderProps) => {
  return (
    <HeaderContainer>
      {handleOrder ? (
        <>
          <HeaderContent>{text}</HeaderContent>
          <OrderByContainer>
            <OrderBy onClick={() => handleOrder('latest')}>최신순</OrderBy>
            <OrderBy onClick={() => handleOrder('popularity')}>인기순</OrderBy>
          </OrderByContainer>
        </>
      ) : (
        <HeaderContent>{text}</HeaderContent>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.section`
  position: fixed;
  display: flex;
  flex-direction: row;
  min-width: 100%;
  height: 7%;
  background-color: white;
  z-index: 999;
  border-bottom: 1px solid black;
`

const ControlButton = styled.button`
  flex-grow: 1;
  background-color: white;
  border: 1px solid white;
`

const RefreshButton = styled(ControlButton)`
  flex-grow: 0;
`

const HeaderContent = styled.div`
  display: flex;
  width: 50%;
  font-size: 1.5rem;
  font-weight: 500;
  padding-left: 1rem;
  align-items: center;
`

const OrderByContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 40vw;
  align-items: center;
  justify-content: center;
`

const OrderBy = styled.div``
