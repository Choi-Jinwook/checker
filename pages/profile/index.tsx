import Image from 'next/image'
import { useRouter } from 'next/router'
import profile from '@public/profile.png'
import list from '@public/list.png'
import bookmark from '@public/bookmark.png'
import Link from 'next/link'
import { useUserData } from '@shared/hooks'
import { authService } from '@shared/firebase'

export default function Profile() {
  const { data: userData } = useUserData()
  const router = useRouter()
  const handleLogout = () => {
    const answer = confirm('로그아웃 하시겠습니까?')
    if (answer) {
      authService.signOut()
      router.push('/login')
    }
  }

  return (
    <>
      <div className="container">
        <div className="headerContainer">
          <div className="header">프로필</div>
        </div>
        <div className="nicknameContainer">
          <div className="item profileImage">
            <Image src={profile} alt="profile" width={100} height={100} />
          </div>
          <div className="item nickname">{userData?.displayName}</div>
        </div>
        <div className="logoutContainer">
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <div className="userListContainer">
          <div className="myLikeList">
            <Link
              style={{
                display: 'flex',
                gap: '1rem',
                color: 'black',
                textDecoration: 'none',
                alignItems: 'center'
              }}
              href="/profile/mylikelist"
            >
              <Image
                className="listImage"
                src={list}
                alt="list"
                width={30}
                height={30}
              />
              내 좋아요 목록
            </Link>
          </div>
          <div className="myBookmarkList">
            <Link
              style={{
                display: 'flex',
                gap: '1rem',
                color: 'black',
                textDecoration: 'none',
                alignItems: 'center'
              }}
              href="/profile/mybookmark"
            >
              <Image
                className="bookmarkImage"
                src={bookmark}
                alt="bookmark"
                width={30}
                height={30}
              />
              내 북마크 목록
            </Link>
          </div>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 95vh;
          }
          .headerContainer {
            width: 100%;
            height: 5vh;
          }
          .header {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 1.5rem;
            border-bottom: 1px solid black;
            padding-left: 1rem;
          }
          .nicknameContainer {
            display: grid;
            grid-template-rows: repeat(2, 10vh);
            grid-template-columns: repeat(4, 10vh);
            margin-top: 1vh;
          }
          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            position: relative;
          }
          .item:nth-child(1) {
            grid-row: span 2;
            grid-column: span 2;
          }
          .item:nth-child(2) {
            grid-row: span 2;
            grid-column: 3 / 5;
          }
          .logoutContainer {
            margin-left: auto;
            margin-right: 1rem;
            margin-top: 1vh;
          }
          .logout {
            background-color: white;
            border: 1px solid #afafaf;
            border-radius: 0.5rem;
            width: 4rem;
            height: 2rem;
          }
          .userListContainer {
            margin-top: 1rem;
            border: none;
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
          }
          .myLikeList {
            display: flex;
            align-items: center;
            width: 100vw;
            height: 7vh;
            font-size: 1rem;
            gap: 1rem;
            padding-left: 1rem;
            border-bottom: 1px solid gray;
          }
          .myBookmarkList {
            display: flex;
            width: 100vw;
            height: 7vh;
            align-items: center;
            font-size: 1rem;
            gap: 1rem;
            padding-left: 1rem;
          }
        `}</style>
      </div>
    </>
  )
}
