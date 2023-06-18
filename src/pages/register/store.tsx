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
      <Seo title="Register Place" />
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="장소 이름"
            onChange={onStoreNameChange}
            required
          />
        </div>
        <div>
          <textarea
            value={storeInfo}
            onChange={onStoreInfoChange}
            placeholder="설명을 적어주세요."
            required
          />
        </div>
        <div>
          <Dropzone onDrop={handleImageDrop}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button>파일 선택</button>
                </div>
              );
            }}
          </Dropzone>
        </div>
        <div>
          <label htmlFor="hide">나만 보기</label>
          <input
            id="hide"
            type="checkbox"
            checked={isHide}
            onChange={handleHide}
          />
        </div>
        <div>
          <input type="submit" value="등록" />
          <input type="button" value="취소" onClick={handleCancel} />
        </div>
      </form>
    </>
  );
};

export default RegStore;
