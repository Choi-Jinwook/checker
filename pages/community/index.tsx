import React, { useCallback, useMemo, useState } from 'react'
import { Article, CommentBox } from '@community/components'
import { Header } from '@shared/components/layout'
import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { fetchStoreData, fetchUserData } from '@shared/apis'

export default function Community() {
  const {
    data: userData,
    isLoading,
    isError
  } = useQuery('user', () => fetchUserData())
  const { data: placeData } = useQuery('data', () => fetchStoreData())
  const [orderBy, setOrderBy] = useState<'latest' | 'popularity'>('latest')
  const [isOpen, setIsOpen] = useState(false)
  const [clickedPostId, setClickedPostId] = useState<string>('')

  const handleOrder = useCallback(
    (order: 'latest' | 'popularity') => {
      setOrderBy(order)
    },
    [setOrderBy]
  )

  const handleCommentBox = useCallback(
    (id: string) => {
      if (isOpen && id === clickedPostId) {
        setIsOpen(false)
        return
      }
      setClickedPostId(id)
      setIsOpen(true)
    },
    [setClickedPostId, setIsOpen, isOpen, clickedPostId]
  )

  const sortedDataArray = useMemo(() => {
    if (placeData) {
      if (orderBy === 'latest') {
        return [...placeData].sort(
          (a, b) => b.combinedTimestamp - a.combinedTimestamp
        )
      } else if (orderBy === 'popularity') {
        return [...placeData].sort(
          (a, b) => b.likeUserList.length - a.likeUserList.length
        )
      }
    }
    return placeData
  }, [placeData, orderBy])

  /*
    좋아요 버튼 에러 핸들링
    DM 기능 추가
    댓글 기능 추가
      댓글 버튼 클릭 시 Modal 올라옴, 댓글 및 대댓글 작성 가능, 댓글좋아요는 x
    북마크 기능 추가
  */
  if (isLoading) return <>Loading...</>
  if (isError) return <>Error occured</>

  return (
    <>
      <Header text="커뮤니티" handleOrder={handleOrder} />
      <Container>
        {sortedDataArray?.map((data: any) => {
          if (data.hide === true) return null

          return (
            <React.Fragment key={data.id}>
              <Article
                data={data}
                userData={userData}
                handleCommentBox={handleCommentBox}
              />
              {isOpen && clickedPostId === data.id && (
                <CommentBox
                  data={data}
                  comments={data.comments}
                  userData={userData}
                />
              )}
            </React.Fragment>
          )
        })}
      </Container>
    </>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 7%;
  width: 100vw;
  height: 85%;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
