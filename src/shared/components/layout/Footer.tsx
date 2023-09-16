import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import home from '@public/home.png'
import community from '@public/community.png'
import profile from '@public/profile.png'
import styled from '@emotion/styled'

interface MyComponentProps {
  children: ReactNode
}

const Footer = ({ children }: MyComponentProps) => {
  return (
    <>
      <SFooter>
        <SLink legacyBehavior href="/home">
          <Image src={home} alt="home" width={28} height={28} />
        </SLink>
        <SLink legacyBehavior href="/community">
          <Image
            src={community}
            alt="community"
            width={33}
            height={33}
            priority
          />
        </SLink>
        <Link legacyBehavior href="/profile">
          <Image src={profile} alt="profile" width={28} height={28} />
        </Link>
      </SFooter>
      <ChildrenContainer>{children}</ChildrenContainer>
    </>
  )
}

export default Footer

const SFooter = styled.footer`
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: white;
  border-top: 1px solid black;
`

const SLink = styled(Link)`
  width: 33%;
`

const ChildrenContainer = styled.div``
