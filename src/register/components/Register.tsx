import React, { useCallback } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useToast } from '@shared/hooks'
import { authService, dbService, storageService } from '@shared/firebase'
import styled from '@emotion/styled'
import {
  Button,
  ControlledInput,
  Form,
  Label,
  TextArea
} from '@shared/components'
import { FormContentProps, InfoData } from '@shared/types'
import { color } from '@shared/constants'
import ImageDrop from './ImageDrop'

declare global {
  interface Window {
    kakao: any
  }
}

const Register = () => {
  const [address, setAddress] = useState<string>('')
  const [imageFile, setImageFile] = useState<any>()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isHide, setIsHide] = useState<boolean>(false)
  const { showToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2Address(
          router.query.lng,
          router.query.lat,
          (result: any) => {
            setAddress(result[0].address.address_name)
          }
        )
      })
    }

    onLoadKakaoMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectedFile = useCallback(
    (files: any) => {
      if (files && files[0].size < 10000000) {
        setImageFile(files[0])
      } else {
        showToast('파일 사이즈가 너무 큽니다.', 'error')
      }
    },
    [setImageFile, showToast]
  )

  const handleCancel = () => {
    router.push('/home')
  }

  const handleRegister = async ({
    title,
    body,
    address,
    isHide,
    imageUrl
  }: any) => {
    try {
      const storeObj: InfoData = {
        uid: authService.currentUser?.uid,
        creatorName: authService.currentUser?.displayName,
        storeName: title?.toLowerCase(),
        storeInfo: body,
        lat: router.query.lat,
        lng: router.query.lng,
        addr: address,
        hide: isHide,
        likes: 0,
        likeUserList: [],
        bookmarkUserList: [],
        imageUrl: imageUrl || null,
        comments: []
      }
      await addDoc(collection(dbService, 'mystore'), storeObj)
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error')
      }
    }

    showToast('장소 정보가 등록되었습니다.', 'success')
    router.push('/home')
  }

  const handleUploadFile = () => {
    const name = imageFile.name
    const storageRef = ref(storageService, `image/${name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case 'paused':
            console.log('upload is paused')
            break
          case 'running':
            console.log('upload is running')
            break
        }
      },
      (error) => {
        showToast(error as any, 'error')
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL)
        })
      }
    )
  }

  const handleSubmit = async ({
    content1: title,
    content2: body
  }: FormContentProps): Promise<void> => {
    if (!imageFile) {
      const ok = window.confirm(
        '이미지를 등록하지 않으셨습니다. 장소 정보를 등록하시겠습니까?'
      )
      if (ok) handleRegister({ title, body, address, isHide })
      return
    }

    const _ok = window.confirm('장소 정보를 등록하시겠습니까?')
    if (_ok) {
      handleUploadFile()
      if (!imageUrl) {
        showToast('이미지 업로드 중입니다. 잠시 후 다시 시도해 주세요.', 'info')
        return
      }
      handleRegister({ title, body, address, isHide, imageUrl })
    }
  }

  return (
    <Form id="cancel" onSubmit={handleSubmit}>
      {({
        value,
        handleFirstContent: handleTitle,
        handleSecondContent: handleBody,
        onSubmit
      }) => (
        <>
          <TitleInput
            kind="tertiary"
            shape="basic"
            placeholder="기록하고 싶은 장소명을 입력해주세요."
            value={value?.content1}
            onChange={handleTitle}
          />
          <STextArea
            value={value?.content2}
            placeholder="설명을 입력해주세요."
            onChange={handleBody}
          />
          <Hide>
            <CheckBox
              id="checkbox"
              type="checkbox"
              onClick={() => setIsHide((prev) => !prev)}
            />
            <Label text="나만 보기" htmlFor="checkbox" />
          </Hide>
          <DropzoneContainer>
            <ImageDrop
              imageFile={imageFile}
              handleSelectedFile={handleSelectedFile}
            />
          </DropzoneContainer>
          <ButtonContainer>
            <Button kind="quaternary" shape="semi-round" onClick={handleCancel}>
              취소
            </Button>
            <Button kind="primary" shape="semi-round" onClick={onSubmit}>
              등록
            </Button>
          </ButtonContainer>
        </>
      )}
    </Form>
  )
}

export default Register

const TitleInput = styled(ControlledInput)`
  max-width: 100%;
  height: 2rem;
  text-align: start;
  border-bottom: 1px solid ${color.black};
`

const STextArea = styled(TextArea)`
  border-bottom: 1px solid ${color.black};
`

const Hide = styled.div`
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.5rem;
`

const CheckBox = styled(ControlledInput)`
  width: 1rem;
  height: 1rem;
`

const DropzoneContainer = styled.div`
  align-self: center;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-right: 0.5rem;
`
