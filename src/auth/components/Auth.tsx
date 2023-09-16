import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { authService } from '@shared/firebase'
import { useToast } from '@shared/hooks'
import styled from '@emotion/styled'
import { color } from '@shared/constants'
import { Button, ControlledInput, ControlledForm } from '@shared/components'
import { FormContentProps } from '@shared/types'

const Auth = () => {
  const [login, setLogin] = useState(true)
  const [error, setError] = useState('')
  const { push } = useRouter()
  const { showToast } = useToast()

  const validateEmail = (email: string) => {
    const pattern = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/
    return pattern.test(email)
  }

  const toggleLogin2Signup = () => {
    setLogin((prev) => !prev)
    setError('')
  }

  const handleSubmit = async ({
    content1: email,
    content2: password
  }: FormContentProps): Promise<void> => {
    let data
    try {
      if (!login) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password!
        )
        showToast('회원가입에 성공했습니다.', 'success')
      } else {
        data = await signInWithEmailAndPassword(authService, email, password!)
        showToast('로그인에 성공했습니다.', 'success')
      }
      push('/home')
    } catch (error: any) {
      const message = error.message
      if (error) {
        if (!validateEmail(email)) {
          setError('올바른 이메일 형식이 아닙니다.')
        } else if (message.includes('email-already-in-use')) {
          setError('이미 존재하는 이메일입니다.')
        } else if (
          message.includes('wrong-password') ||
          message.includes('user-not-found')
        ) {
          setError('등록되지 않은 계정이거나 비밀번호가 틀렸습니다.')
        } else {
          setError('예상치 못한 에러 발생')
        }
        return
      }
    }
  }

  return (
    <Container>
      <ControlledForm second onSubmit={handleSubmit}>
        {({
          handleFirstContent: handleEmail,
          handleSecondContent: handlePassword,
          onSubmit
        }) => (
          <>
            <Input
              kind="secondary"
              placeholder="Email"
              onChange={handleEmail}
            />
            <Input
              type="password"
              kind="secondary"
              placeholder="Password"
              onChange={handlePassword}
            />
            <Button kind="primary" shape="semi-round" onClick={onSubmit}>
              {login ? '로그인' : '회원가입'}
            </Button>
          </>
        )}
      </ControlledForm>
      <DivContainer>
        <Converter onClick={toggleLogin2Signup}>
          {login ? '회원가입하기' : '로그인하기'}
        </Converter>
        <Error>{error}</Error>
        <SDiv>*로그인 후 지도가 보이지 않으면 새로고침을 해주세요!</SDiv>
      </DivContainer>
    </Container>
  )
}

export default Auth

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const Input = styled(ControlledInput)`
  display: block;
  margin: 0 auto;
  padding-left: 10px;
  width: 50vw;
  height: 2rem;
  text-align: left;
`

const DivContainer = styled.section`
  position: relative;
  top: 10px;
  text-align: center;
`

const Converter = styled.div`
  color: ${color.gray05};
`

const Error = styled.div`
  color: ${color.red05};
`

const SDiv = styled.div`
  color: ${color.black};
`
