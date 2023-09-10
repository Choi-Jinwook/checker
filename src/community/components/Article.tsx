import styled from '@emotion/styled'
import Image from 'next/image'
import heart from '@public/heart.png'
import clickedHeart from '@public/clickedHeart.png'
import comment from '@public/comment.png'
import dm from '@public/dm.png'
import bookmark from '@public/bookmark.png'
import profile from '@public/profile.png'
import { emptyPhoto } from '@shared/constants'
import { useState } from 'react'
import { fetchLikes } from '@shared/apis'
import { queryClient } from '@pages/_app'

interface AtricleProps {
  userData: any
  data: any
  handleCommentBox: (id: string) => void
}

const Article = ({ data, userData, handleCommentBox }: AtricleProps) => {
  const [likeUserList, setLikeUserList] = useState(data.likeUserList)
  const isUserLikes = likeUserList.includes(userData.uid)

  const handleLikeClick = async () => {
    if (isUserLikes) {
      setLikeUserList((prev: string[]) =>
        prev.filter((uid: string) => uid !== userData.uid)
      )
    } else {
      setLikeUserList((prev: string[]) => [...prev, userData.uid])
    }

    try {
      await fetchLikes(data.id, likeUserList, likeUserList.length)
      queryClient.invalidateQueries('data')
    } catch (error) {
      console.error('Firestore update failed:', error)
    }
  }
  return (
    <ContentCard>
      <ProfileImage src={profile} alt="profile" width={35} height={35} />
      <CreatorName>{data.creatorName}</CreatorName>
      <PlaceName>{data.storeName}</PlaceName>
      <MainPhoto
        style={{
          backgroundImage: `url(${data.imageUrl ? data.imageUrl : emptyPhoto})`
        }}
      />
      <LikesButton>
        <Image
          src={
            data.likeUserList?.includes(userData?.uid) ? clickedHeart : heart
          }
          alt="like"
          width={25}
          height={25}
          onClick={handleLikeClick}
        />
      </LikesButton>
      <CommentButton>
        <Image
          id={data.id}
          src={comment}
          alt="comment"
          width={30}
          height={30}
          onClick={() => handleCommentBox(data.id)}
        />
      </CommentButton>
      <DMButton>
        <Image src={dm} alt="dm" width={25} height={25} />
      </DMButton>
      <BookmarkButton>
        <Image src={bookmark} alt="bookmark" width={23} height={23} />
      </BookmarkButton>
      <NumofLikes>{data.likeUserList.length} Likes</NumofLikes>
      <StoreInfo className="item content">{data.storeInfo}</StoreInfo>
    </ContentCard>
  )
}

export default Article

const ContentCard = styled.div`
  display: grid;
  min-height: 70vh;
  grid-template-rows: repeat(10, 7vh);
  grid-template-columns: repeat(10, 10vw);
  align-items: center;
  text-align: center;
`

const ProfileImage = styled(Image)`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
`

const CreatorName = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 5;
`

const PlaceName = styled.div`
  grid-row: 1 / 2;
  grid-column: 7 / 11;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const MainPhoto = styled.div`
  width: 100%;
  height: 100%;
  grid-row: 2 / 7;
  grid-column: 1 / 11;
  background-size: cover;
  background-position: center;
`

const LikesButton = styled.div`
  grid-row: 7 / 8;
  grid-column: 1 / 2;
`

const CommentButton = styled.div`
  grid-row: 7 / 8;
  grid-column: 2 / 3;
`

const DMButton = styled.div`
  grid-row: 7 / 8;
  grid-column: 3 / 4;
`

const BookmarkButton = styled.div`
  grid-row: 7 / 8;
  grid-column: 10 / 11;
`

const NumofLikes = styled.div`
  grid-row: 8 / 9;
  grid-column: 1 / 2;
  margin-left: 0.5rem;
  white-space: nowrap;
  align-self: baseline;
`

const StoreInfo = styled.div`
  grid-row: 9 / 11;
  grid-column: 1 / 11;
  max-height: 14vh;
  overflow-y: auto;
  text-align: left;
  margin-left: 0.5rem;
  align-self: baseline;
  &::-webkit-scrollbar {
    display: none;
  }
`
