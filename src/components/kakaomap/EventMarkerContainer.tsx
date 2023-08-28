import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ data }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  return (
    <MapMarker
      position={{
        lat: data.lat.stringValue,
        lng: data.lng.stringValue,
      }}
      onClick={() => setIsVisible((prev) => !prev)}
    >
      {isVisible && (
        <div
          style={{
            minWidth: "150px",
            maxWidth: "200px",
            minHeight: "2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            WebkitLineClamp: 1,
          }}
        >
          <Image
            alt="close"
            width="13"
            height="13"
            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
            style={{
              position: "absolute",
              right: "5px",
              top: "5px",
              cursor: "pointer",
            }}
            onClick={() => setIsVisible(false)}
          />
          <div
            className="storeName storeInfo"
            onClick={() => {
              router.push(`/storeinfo/${data.storeName.stringValue}`);
            }}
          >
            {data.storeName.stringValue}
          </div>
          <div className="storeInfo">등록: {data.creatorName.stringValue}</div>
          <style jsx>{`
            .storeName {
              background-color: rgb(214, 214, 214);
              color: black
              text-decoration: none
            }
            .storeInfo {
              font-size: 1rem;
            }
          `}</style>
        </div>
      )}
    </MapMarker>
  );
};

export default EventMarkerContainer;
