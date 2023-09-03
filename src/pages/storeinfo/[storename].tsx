import { useStoreData } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Store() {
  const { data: dataArray, isLoading, isError } = useStoreData();
  const router = useRouter();
  const { storename } = router.query;
  const storeInfo = dataArray?.find((obj) => obj["storeName"] === storename);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>error occured</div>;

  return (
    <>
      {storeInfo && (
        <div className="container">
          <div className="header">
            <div className="storeName">{storename}</div>
          </div>
          <div className="photoContainer">
            {storeInfo?.imageUrl ? (
              <Image
                src={storeInfo.imageUrl}
                alt={storeInfo.imageUrl}
                width={window.innerWidth}
                height={window.innerHeight * 0.35}
              />
            ) : (
              <div>photo</div>
            )}
          </div>
          <div className="addressContainer">
            <div className="address">주소(지번): {storeInfo.addr}</div>
          </div>
          <div className="addressContainer">
            <div className="address">등록: {storeInfo.creatorName}</div>
          </div>
          <div className="storeInfoContainer">
            <div className="storeInfo">{storeInfo.storeInfo}</div>
          </div>
          <style jsx>{`
            .container {
              width: 100vw;
              height: 100vh;
            }
            .header {
              width: 100%;
              height: 5vh;
              display: flex;
              position: fixed;
              backgruond-color: white;
              z-index: 999;
              border-bottom: 1px solid black;
            }
            .storeName {
              display: flex;
              width: 100%;
              height: 5vh;
              font-size: 1.5rem;
              padding-left: 1rem;
              align-items: center;
            }
            .photoContainer {
              display: flex;
              width: 100vw;
              height: 35vh;
              padding-top: 5vh;
              justify-content: center;
            }
            .addressContainer {
              display: flex;
              width: calc(100% - 2rem);
              height: 2rem;
              align-items: center;
              padding-left: 1rem;
              padding-right: 1rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .storeInfoContainer {
              display: flex;
              flex-direction: column;
              width: calc(100% - 2rem);
              min-height: 2rem;
              max-height: 45vh;
              align-items: center;
              padding-left: 1rem;
              padding-right: 1rem;
              overflow-y: scroll;
              overflow-x: hidden;
            }
            .storeInfoContainer::-webkit-scrollbar {
              display: none;
            }
            .storeInfo {
              flex: 1;
              max-height: 100%;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
