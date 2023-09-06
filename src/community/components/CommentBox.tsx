import { Comment } from '@shared/types'
import React, { MouseEvent, useState } from 'react'

const CommentBox = ({ comments, onClose, userData }: Comment) => {
  const [comment, setComment] = useState('')
  const uid = userData.uid

  const onSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(comment, uid)
  }

  return (
    <div style={{ paddingLeft: '1rem' }}>
      {comments.map((el) => {
        return (
          <React.Fragment key={el.comment}>
            <div style={{ fontSize: '0.8rem' }}>작성자: {el.writer}</div>
            <div>{el.comment}</div>
            <br />
          </React.Fragment>
        )
      })}
      <br />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="댓글 입력"
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" value="입력" />
        <button onClick={onClose}>닫기</button>
      </form>
    </div>
  )
}

export default CommentBox
