import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Header } from '@shared/components/layout'
import { color, emptyPhoto } from '@shared/constants'
import { useStoreData, useUserData } from '@shared/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MyLikedList = () => {
  const { data: userData } = useUserData()
  const { data: dataArray } = useStoreData()

  return (
    <>
      <Header text="내가 좋아한" />
      <Container>
        {dataArray?.map((el: any) => {
          if (el.likeUserList?.includes(userData?.uid)) {
            return (
              <React.Fragment key={el.id}>
                <SLink href={`/storeinfo/${el.storeName}`}>
                  <LikeContainer>
                    <SImage
                      src={el.imageUrl ? el.imageUrl : emptyPhoto}
                      alt="photo"
                      width={150}
                      height={150}
                    />
                    <ContentContainer>
                      <SDiv
                        css={css`
                          font-size: 14px;
                          font-weight: 300;
                        `}
                      >
                        등록: {el.creatorName}
                      </SDiv>
                      <SDiv
                        css={css`
                          font-size: 16px;
                        `}
                      >
                        {el.storeName}
                      </SDiv>
                      <SDiv
                        css={css`
                          font-size: 14px;
                        `}
                      >
                        좋아요 수: {el.likes}
                      </SDiv>
                    </ContentContainer>
                  </LikeContainer>
                </SLink>
              </React.Fragment>
            )
          }
          return null
        })}
      </Container>
    </>
  )
}

export default MyLikedList

const Container = styled.section`
  width: 100vw;
  height: 90vh;
  padding-top: 5vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const SLink = styled(Link)`
  color: ${color.black};
  text-decoration: none;
`

const LikeContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 170px;
  font-size: 1.2rem;
  border-bottom: 1px solid ${color.gray05};
`

const SImage = styled(Image)`
  padding-left: 10px;
  align-self: center;
`

const ContentContainer = styled.section`
  width: calc(100vw - 190px);
  padding: 10px;
`

const SDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
