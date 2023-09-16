import React from 'react'
import profile from '@public/profile.png'
import list from '@public/list.png'
import bookmark from '@public/bookmark.png'
import Link from 'next/link'
import { Header } from '@shared/components/layout'
import { Button } from '@shared/components'
import { css } from '@emotion/react'
import { color } from '@shared/constants'
import styled from '@emotion/styled'
import Image from 'next/image'
import { authService } from '@shared/firebase'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchUserData } from '@shared/apis'

const MyPage = () => {
  const { data: userData } = useQuery('user', () => fetchUserData())
  const { push } = useRouter()

  const handleLogout = () => {
    const answer = confirm('로그아웃 하시겠습니까?')
    if (answer) {
      authService.signOut()
      push('/login')
    }
  }

  return (
    <>
      <Header text="마이페이지" />
      <Container>
        <ProfileContainer>
          <ProfileContent>
            <Image src={profile} alt="profile" width={100} height={100} />
          </ProfileContent>
          <ProfileContent>닉네임: {userData?.displayName}</ProfileContent>
        </ProfileContainer>
        <Button
          kind="quaternary"
          shape="semi-round"
          cssStyle={css`
            min-width: 80px;
            color: ${color.gray05};
            border-color: ${color.gray05};
            align-self: end;
            margin-right: 1rem;
          `}
          onClick={handleLogout}
        >
          로그아웃
        </Button>
        <MenuContainer className="userListContainer">
          <Menu
            css={css`
              border-bottom: 1px solid gray;
            `}
          >
            <MenuLink href="/profile/mylikelist">
              <Image src={list} alt="list" width={30} height={30} />내 좋아요
              목록
            </MenuLink>
          </Menu>
          <Menu>
            <MenuLink href="/profile/mybookmark">
              <Image src={bookmark} alt="bookmark" width={30} height={30} />내
              북마크 목록
            </MenuLink>
          </Menu>
        </MenuContainer>
      </Container>
    </>
  )
}

export default MyPage

const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 5vh;
  width: 100vw;
  height: 90vh;
`

const ProfileContainer = styled.section`
  display: flex;
  width: 100vw;
  height: 20vh;
  align-items: center;
`

const ProfileContent = styled.div`
  margin-left: calc((20vh - 100px) / 2);
`

const MenuContainer = styled.section`
  margin-top: 1rem;
  border: none;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`

const Menu = styled.div`
  display: flex;
  width: 100vw;
  height: 7vh;
  align-items: center;
  font-size: 1rem;
  gap: 1rem;
  padding-left: 1rem;
`

const MenuLink = styled(Link)`
  display: flex;
  gap: 1rem;
  color: black;
  text-decoration: none;
  align-items: center;
`
