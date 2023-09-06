import React, { useMemo, useState } from 'react'
import heart from '@public/heart.png'
import clickedHeart from '@public/clickedHeart.png'
import comment from '@public/comment.png'
import dm from '@public/dm.png'
import bookmark from '@public/bookmark.png'
import profile from '@public/profile.png'
import Image from 'next/image'
import { useStoreData, useUserData } from '@shared/hooks'
import { CommentBox } from '@community/components'
import { queryClient } from '@pages/_app'
import { fetchLikes } from '@shared/apis'

export default function Community() {
  const { data: userData } = useUserData()
  const { data: dataArray } = useStoreData()
  const [orderBy, setOrderBy] = useState<'latest' | 'popularity'>('latest')
  const [isOpen, setIsOpen] = useState(false)
  const [clickPostId, setClickPostId] = useState<string>('')
  const likesData = useMemo(() => {
    if (!dataArray) return []
    return dataArray.map((el: any) => ({
      id: el.id,
      likeUserList: el.likeUserList,
      likes: el.likes
    }))
  }, [dataArray])
  const [likes, setLikes] = useState(likesData)

  const onClose = () => {
    setIsOpen(false)
  }

  const handleLikeClick = async (id: any) => {
    const itemToUpdate = dataArray?.find((el: any) => el.id === id)
    const isUserLikes = itemToUpdate.likeUserList.includes(userData?.uid)
    console.log(itemToUpdate, Date())

    // 좋아요 / 좋아요 취소
    if (itemToUpdate) {
      const updatedLikes = isUserLikes
        ? itemToUpdate.likes - 1
        : itemToUpdate.likes + 1

      let updatedLikeUsers: any

      if (Array.isArray(itemToUpdate.likeUserList)) {
        if (isUserLikes) {
          updatedLikeUsers = itemToUpdate.likeUserList.filter(
            (user: string) => user !== userData?.uid
          )
        } else {
          updatedLikeUsers = [...itemToUpdate.likeUserList, userData?.uid]
        }
      } else {
        updatedLikeUsers = [userData?.uid]
      }

      const newDataArray = dataArray?.map((el: any) => {
        if (el.id === id) {
          return {
            id: el.id,
            likeUserList: updatedLikeUsers,
            likes: updatedLikes
          }
        }
        return { id: el.id, likeUserList: el.likeUserList, likes: el.likes }
      })

      if (newDataArray) setLikes(newDataArray)

      try {
        await fetchLikes(id, updatedLikeUsers, updatedLikes)
        queryClient.invalidateQueries('data')
      } catch (error) {
        console.error('Firestore update failed:', error)
      }
    }
  }

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

  return (
    <>
      <div className="container">
        <div className="headerContainer">
          <div className="header">커뮤니티</div>
          <div className="orderByContainer">
            <div className="option1" onClick={() => setOrderBy('latest')}>
              최신순
            </div>
            <div className="option2" onClick={() => setOrderBy('popularity')}>
              인기순
            </div>
          </div>
        </div>
        {sortedDataArray ? (
          sortedDataArray.map((el: any) => {
            if (el.hide === true) return null

            return (
              <React.Fragment key={el.id}>
                <div className="contentContainer">
                  <div className="item profileImage">
                    <Image src={profile} alt="profile" width={35} height={35} />
                  </div>
                  <div className="item userName">{el.creatorName}</div>
                  <div className="item storeName">{el.storeName}</div>
                  {el.imageUrl ? (
                    <div
                      className="item photo"
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${el.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ) : (
                    <div className="item photo">photo</div>
                  )}
                  <div className="item likesButton">
                    {el.likeUserList?.includes(userData?.uid) ? (
                      <Image
                        src={clickedHeart}
                        alt="clickedHeart"
                        width={25}
                        height={25}
                        onClick={() => handleLikeClick(el.id)}
                      />
                    ) : (
                      <Image
                        src={heart}
                        alt="heart"
                        width={25}
                        height={25}
                        onClick={() => handleLikeClick(el.id)}
                      />
                    )}
                  </div>
                  <div className="item commentButton">
                    <Image
                      id={el.id}
                      src={comment}
                      alt="comment"
                      width={30}
                      height={30}
                      onClick={(e) => {
                        console.log((e.target as any).id)

                        setClickPostId(el.id)
                        setIsOpen(true)
                      }}
                    />
                  </div>
                  <div className="item DMButton">
                    <Image src={dm} alt="dm" width={25} height={25} />
                  </div>
                  <div className="item Bookmark">
                    <Image
                      src={bookmark}
                      alt="bookmark"
                      width={23}
                      height={23}
                    />
                  </div>
                  <div className="item numofLikes">
                    {likes?.find((item) => item.id === el.id)?.likes} Likes
                  </div>
                  <div className="item content">{el.storeInfo}</div>
                </div>
                {isOpen && clickPostId === el.id && (
                  <CommentBox
                    comments={el.comments}
                    onClose={onClose}
                    userData={userData}
                  />
                )}
              </React.Fragment>
            )
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 95vh;
          overflow: hidden;
          overflow-y: scroll;
        }
        .container::-webkit-scrollbar {
          display: none;
        }
        .headerContainer {
          width: 100%;
          height: 5vh;
          display: flex;
          position: fixed;
          background-color: white;
          z-index: 999;
          border-bottom: 1px solid black;
        }
        .header {
          display: flex;
          width: 85%;
          height: 100%;
          font-size: 1.5rem;
          padding-left: 1rem;
          align-items: center;
        }
        .orderByContainer {
          display: flex;
          flex-direction: row;
          width: 40vw;
          align-items: center;
          justify-content: center;
        }
        .option1 {
          background-color: white;
          width: 100%;
        }
        .option2 {
          background-color: white;
          width: 100%;
        }
        .contentContainer {
          display: grid;
          position: relative;
          top: 5vh;
          min-height: 70vh;
          grid-template-rows: repeat(10, 7vh);
          grid-template-columns: repeat(10, 10vw);
          align-items: center;
          text-align: center;
        }
        .item:nth-child(1) {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
        }
        .item:nth-child(2) {
          grid-row: 1 / 2;
          grid-column: 2 / 5;
        }
        .item:nth-child(3) {
          grid-row: 1 / 2;
          grid-column: 7 / 11;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item:nth-child(4) {
          grid-row: 2 / 7;
          grid-column: 1 / 11;
        }
        .item:nth-child(5) {
          grid-row: 7 / 8;
          grid-column: 1 / 2;
        }
        .item:nth-child(6) {
          grid-row: 7 / 8;
          grid-column: 2 / 3;
        }
        .item:nth-child(7) {
          grid-row: 7 / 8;
          grid-column: 3 / 4;
        }
        .item:nth-child(8) {
          grid-row: 7 / 8;
          grid-column: 10 / 11;
        }
        .item:nth-child(9) {
          grid-row: 8 / 9;
          grid-column: 1 / 2;
          margin-left: 0.5rem;
          white-space: nowrap;
        }
        .item:nth-child(10) {
          grid-row: 9 / 11;
          grid-column: 1 / 11;
          max-height: 14vh;
          overflow-y: auto;
          text-align: left;
          margin-left: 0.5rem;
        }
        .item:nth-child(10)::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
