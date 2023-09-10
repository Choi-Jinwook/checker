import React, { useCallback, useMemo, useState } from 'react'
import { useStoreData, useUserData } from '@shared/hooks'
import { Article, CommentBox } from '@community/components'
import { Header } from '@shared/components/layout'
import styled from '@emotion/styled'

export default function Community() {
  const { data: userData } = useUserData()
  const { data: dataArray, isLoading, isError } = useStoreData()
  const [orderBy, setOrderBy] = useState<'latest' | 'popularity'>('latest')
  const [isOpen, setIsOpen] = useState(false)
  const [clickPostId, setClickPostId] = useState<string>('')

  const handleOrder = useCallback(
    (order: 'latest' | 'popularity') => {
      setOrderBy(order)
    },
    [setOrderBy]
  )

  const handleCommentBox = useCallback(
    (id: string) => {
      setClickPostId(id)
      setIsOpen(true)
    },
    [setClickPostId, setIsOpen]
  )

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const sortedDataArray = useMemo(() => {
    if (dataArray) {
      if (orderBy === 'latest') {
        return [...dataArray].sort(
          (a, b) => b.combinedTimestamp - a.combinedTimestamp
        )
      } else if (orderBy === 'popularity') {
        return [...dataArray].sort(
          (a, b) => b.likeUserList.length - a.likeUserList.length
        )
      }
    }
    return dataArray
  }, [dataArray, orderBy])

  /*
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
              {isOpen && clickPostId === data.id && (
                <CommentBox
                  data={data}
                  comments={data.comments}
                  onClose={onClose}
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
  width: 100vw;
  height: 90vh;
  padding-top: 5vh;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
