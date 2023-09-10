import React from 'react'
import { useStoreData } from '@shared/hooks'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Header } from '@shared/components/layout'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { emptyPhoto } from '@shared/constants'

const StoreName = () => {
  const { data: dataArray, isLoading, isError } = useStoreData()
  const router = useRouter()
  const { storename } = router.query
  const storeInfo = dataArray?.find((obj) => obj['storeName'] === storename)

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>error occured</div>

  return (
    <>
      <Header text="장소 정보" />
      <Container>
        <Image
          src={storeInfo?.imageUrl ? storeInfo.imageUrl : emptyPhoto}
          alt={storeInfo.imageUrl || 'empty'}
          width={window.innerWidth}
          height={window.innerHeight * 0.35}
          css={css`
            border-bottom: 1px solid black;
          `}
        />
        <ContentContainer>
          <SDiv>등록: {storeInfo.creatorName}</SDiv>
          <SDiv>주소(지번): {storeInfo.addr}</SDiv>
          <SDiv
            css={css`
              font-weight: 600;
            `}
          >
            장소명: {storename}
          </SDiv>
          <SDiv>{storeInfo.storeInfo}</SDiv>
        </ContentContainer>
      </Container>
    </>
  )
}

export default StoreName

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 90vh;
  gap: 1rem;
  padding-top: 5vh;
`

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  gap: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const SDiv = styled.div``
