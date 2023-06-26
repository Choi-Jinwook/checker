import { MapMarker } from "react-kakao-maps-sdk";
import { Coords } from "./KaKaoMap";
import Image from "next/image";
import Link from "next/link";

interface Move extends Coords {
  open: boolean;
  toggleInfo: () => void;
}

const ClickableMarker = ({ lat, lng, open, toggleInfo }: Move) => {
  return (
    <MapMarker
      position={{ lat: lat, lng: lng }}
      clickable={true}
      onClick={toggleInfo}
    >
      {open && (
        <div style={{ minWidth: "150px" }}>
          <Image
            alt="close"
            width="14"
            height="13"
            src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
            style={{
              position: "absolute",
              right: "5px",
              top: "5px",
              cursor: "pointer",
            }}
            onClick={toggleInfo}
          />
          <Link
            legacyBehavior
            href={{
              pathname: "/register/store",
              query: { lat: lat, lng: lng },
            }}
            as="/register/store"
          >
            <a style={{ padding: "5px", color: "#000" }}>장소 추가하기</a>
          </Link>
        </div>
      )}
    </MapMarker>
  );
};

export default ClickableMarker;
