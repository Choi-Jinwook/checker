import { Coords } from "./KaKaoMap";
import Image from "next/image";
import Link from "next/link";

interface Move extends Coords {
  add: boolean;
  toggleInfo: () => void;
}

const StoreInfo = ({ lat, lng, add, toggleInfo }: Move) => {
  return (
    <>
      {add && (
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
    </>
  );
};

export default StoreInfo;
