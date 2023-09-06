import { addDoc, collection } from 'firebase/firestore'
import { ChangeEvent, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useRouter } from 'next/router'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useToast } from '@shared/hooks'
import { authService, dbService, storageService } from '@shared/firebase'

declare global {
  interface Window {
    kakao: any
  }
}

const RegStore = () => {
  const [storeName, setStoreName] = useState<string>('')
  const [storeInfo, setStoreInfo] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [imageFile, setImageFile] = useState<any>()
  const [imageUrl, setImageUrl] = useState('')
  const [isHide, setIsHide] = useState<boolean>(false)
  const { showToast } = useToast()
  const router = useRouter()

  const onStoreNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value)
  }

  const onStoreInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStoreInfo(e.target.value)
  }

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0])
      console.log(files[0])
    } else {
      showToast('파일 사이즈가 너무 큽니다.', 'error')
    }
  }

  const handleUploadFile = () => {
    if (imageFile) {
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
            console.log(downloadURL)
          })
        }
      )
    } else {
      showToast('파일을 찾을 수 없습니다.', 'warning')
    }
  }

  const handleHide = (e: ChangeEvent<HTMLInputElement>) => {
    setIsHide(e.target.checked)
  }

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2Address(
          router.query.lng,
          router.query.lat,
          (result: any) => {
            setAddress(result[0].address.address_name)
            console.log(result)
          }
        )
      })
    }

    onLoadKakaoMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const ok = window.confirm('가게 정보를 등록하시겠습니까?')

    if (ok) {
      handleUploadFile()
      if (!imageUrl) {
        showToast('이미지 업로드 중입니다. 잠시 후 다시 시도해 주세요.', 'info')
        return
      }
      try {
        const storeObj = {
          uid: authService.currentUser?.uid,
          creatorName: authService.currentUser?.displayName,
          storeName: storeName.toLowerCase(),
          storeInfo: storeInfo,
          lat: router.query.lat,
          lng: router.query.lng,
          addr: address,
          hide: isHide,
          likes: 0,
          likeUserList: [],
          imageUrl: imageUrl,
          comments: []
        }
        await addDoc(collection(dbService, 'mystore'), storeObj)
      } catch (error) {
        if (error instanceof Error) {
          showToast(error as any, 'error')
          console.log(error)
        }
      }
      showToast('장소 정보가 등록되었습니다.', 'success')
      router.push('/home')
    }
  }

  const handleCancel = () => {
    setStoreInfo('')
    setStoreName('')
    router.push('/home')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="category">스크롤형 카테고리(추후 업데이트 예정)</div>
        <div className="storeNameContainer">
          <input
            className="storeName"
            type="text"
            placeholder="장소 이름"
            onChange={onStoreNameChange}
            required
          />
        </div>
        <div className="storeInfoContainer">
          <textarea
            className="storeInfo"
            value={storeInfo}
            onChange={onStoreInfoChange}
            placeholder="설명을 적어주세요"
            required
          />
        </div>
        <div>
          <Dropzone onDrop={handleSelectedFile}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div className="fileContainer" {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    id="file"
                    style={{ display: 'none' }}
                  />
                  <input
                    className="upload-name"
                    value={imageFile?.name || '첨부파일'}
                    placeholder="첨부파일"
                    onChange={(files) => handleSelectedFile(files.target.files)}
                    readOnly
                  />
                  <label className="findFile" htmlFor="file">
                    파일찾기
                  </label>
                </div>
              )
            }}
          </Dropzone>
        </div>
        <div className="labelContainer">
          <input
            id="hide"
            type="checkbox"
            checked={isHide}
            onChange={handleHide}
          />
          <label htmlFor="hide">나만 보기</label>
        </div>
        <div className="buttonContainer">
          <input className="submit Button" type="submit" value="등록" />
          <input
            className="cancle Button"
            type="button"
            value="취소"
            onClick={handleCancel}
          />
        </div>
      </form>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }
        .fileContainer {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .upload-name {
          display: inline-block;
          width: 60%;
          height: 2.1rem;
          padding: 0 10px;
          vertical-align: middle;
          border: 1px solid #dddddd;
          color: #999999;
        }
        .findFile {
          display: inline-block;
          width: 40%
          height: 1.2rem;
          margin-left: 0.5rem;
          padding: 0.5rem 0.8rem;
          color: #fff;
          vertical-align: middle;
          background-color: #999999;
        }
        .category {
          display: flex;
          align-items: center;
          height: 2rem;
          padding-left: 0.5rem;
        }
        .storeName {
          width: 100vw;
          height: 2rem;
          border: none;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          font-size: 1rem;
          padding-left: 0.5rem;
        }
        .storeInfo {
          width: calc(100vw - 0.6rem);
          height: 50vh;
          border: none;
          border-bottom: 1px solid black;
          font-size: 1rem;
          padding-top: 0.5rem;
          padding-left: 0.5rem;
          resize: none;
        }
        .storeInfo::-webkit-scrollbar {
          display: none;
        }
        .selectFile {
          background-color: white;
          border: none;
          text-decoration: underline;
          margin-left: auto;
          margin-right: 1rem;
        }
        #hide {
          width: 1rem;
          height: 1rem;
        }
        .labelContainer {
          margin-left: auto;
          margin-right: 1rem;
          min-height: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .submit {
          margin-right: 0.5rem;
          background-color: rgb(0, 120, 212);
          color: white;
          border: 1px solid #afafaf;
          border-radius: 0.5rem;
          width: 3rem;
          height: 2rem;
        }
        .cancle {
          background-color: white;
          border: 1px solid #afafaf;
          border-radius: 0.5rem;
          width: 3rem;
          height: 2rem;
        }
        .buttonContainer {
          margin-left: auto;
          margin-right: 1rem;
        }
      `}</style>
    </>
  )
}

export default RegStore
