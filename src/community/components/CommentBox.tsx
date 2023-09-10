import styled from '@emotion/styled'
import { queryClient } from '@pages/_app'
import { Button, ControlledInput, Form } from '@shared/components'
import { dbService } from '@shared/firebase'
import { useToast } from '@shared/hooks'
import { Comment, FormContentProps } from '@shared/types'
import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'

const CommentBox = ({ data, comments, onClose, userData }: Comment) => {
  const initialComment = data.comments
  const userName = userData.displayName
  const { showToast } = useToast()

  const handleSubmit = async (value: FormContentProps): Promise<void> => {
    const updatedComment = [
      ...initialComment,
      { writer: userName, comment: value.content1 }
    ]

    try {
      await updateDoc(doc(dbService, 'mystore', `${data.id}`), {
        comments: updatedComment
      })
      queryClient.invalidateQueries('data')
      const id = document.querySelector('#comment')
      console.log((id as any).value)

      if (id !== null) (id as any).value = ''
    } catch (error) {
      showToast(`${error}`, 'error')
    }
  }

  return (
    <Container>
      {comments.map((el) => {
        return (
          <React.Fragment key={el.comment + userName}>
            <Writer>작성자: {el.writer}</Writer>
            <CommentContent>{el.comment}</CommentContent>
          </React.Fragment>
        )
      })}
      <br />
      <Form onSubmit={handleSubmit}>
        {({
          value,
          handleFirstContent: handleComment,
          handleSecondContent: handlePreventError,
          onSubmit
        }) => (
          <CommentFormContainer>
            <CommentInput
              id="comment"
              type="text"
              kind="secondary"
              shape="semi-round"
              value={value?.content1}
              placeholder="댓글 입력"
              onChange={handleComment}
            />
            <Button
              shape="semi-round"
              onClick={() => {
                onSubmit
                handlePreventError('123')
              }}
            >
              입력
            </Button>
            <Button kind="tertiary" shape="semi-round" onClick={onClose}>
              닫기
            </Button>
          </CommentFormContainer>
        )}
      </Form>
    </Container>
  )
}

export default CommentBox

const Container = styled.div`
  padding-left: 1rem;
  padding-top: 1rem;
  padding-right: 1rem;
`

const Writer = styled.div`
  font-size: 0.8rem;
`

const CommentContent = styled.div``

const CommentFormContainer = styled.section`
  display: flex;
  width: 100%;
  gap: 5px;
  align-items: start;
`

const CommentInput = styled(ControlledInput)`
  width: 100%;
  height: 36px;
  align-self: baseline;
  text-align: start;
  padding-left: 10px;
`
