import { addDoc, collection } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { authService, dbService } from "../../components/firebase/firebase";
import { useRouter } from "next/router";
import Seo from "@/components/Seo";

declare global {
  interface Window {
    kakao: any;
  }
}

const RegStore = () => {
  const [storeName, setStoreName] = useState<string>("");
  const [storeInfo, setStoreInfo] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [address, setAddress] = useState<string>("");
  const [isHide, setIsHide] = useState<boolean>(false);

  const router = useRouter();

  const onStoreNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value);
  };

  const onStoreInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStoreInfo(e.target.value);
  };

  const handleHide = (e: ChangeEvent<HTMLInputElement>) => {
    setIsHide(e.target.checked);
  };

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(
          router.query.lng,
          router.query.lat,
          (result: any) => {
            setAddress(result[0].address.address_name);
            console.log(result);
          }
        );
      });
    };

    onLoadKakaoMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = window.confirm("가게 정보를 등록하시겠습니까?");

    if (ok) {
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
        };
        await addDoc(collection(dbService, "mystore"), storeObj);
      } catch (error) {
        if (error instanceof Error) {
          alert(error);
        }
      }
      router.push("/home");
    }
  };

  const handleCancel = () => {
    setStoreInfo("");
    setStoreName("");
    router.push("/home");
  };

  const handleImageDrop = (acceptedFiles: File[]) => {
    setImages([...images, ...acceptedFiles]);
  };

  return (
    <>
      <Seo title="Register" />
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
          <Dropzone onDrop={handleImageDrop}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button className="selectFile">파일 선택</button>
                </div>
              );
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
          width: 100vw;
          height: 50vh;
          border: none;
          border-bottom: 1px solid black;
          font-size: 1rem;
          padding-top: 0.5rem;
          padding-left: 0.5rem;
          resize: none;
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
          border-radius: 20%;
          width: 3rem;
          height: 2rem;
        }
        .cancle {
          background-color: white;
          border: 1px solid #afafaf;
          border-radius: 20%;
          width: 3rem;
          height: 2rem;
        }
        .buttonContainer {
          margin-left: auto;
          margin-right: 1rem;
        }
      `}</style>
    </>
  );
};

export default RegStore;
