import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import StoreInfo from "./StoreInfo";
import { UserObj } from "@/pages/home";
import EventMarkerContainer from "./EventMarkerContainer";
import { useStoreData } from "@/hooks";

export interface Coords {
  lat: number;
  lng: number;
}

export interface Marker {
  seeMine: boolean;
  user: UserObj | null | undefined;
}

const KakaoMap = ({ seeMine, user }: Marker) => {
  const [myCoords, setMyCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [clickCoords, setClickCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [isMarkerInfoOpen, setIsMarkerInfoOpen] = useState(false);
  const [add, setAdd] = useState(true);
  const { data: dataArray } = useStoreData();

  const toggleInfo = () => {
    // static, dynamic
    setIsMarkerInfoOpen((prev) => !prev);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        setMyCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setClickCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
        alert("위치 정보 사용에 동의해주세요");
        setMyCoords({
          lat: 37,
          lng: 127,
        });
      }
    );
  }, []);

  return (
    <>
      <Map
        id="kakaoMap"
        center={{ lat: myCoords.lat, lng: myCoords.lng }}
        style={{ width: "100%", height: "45vh", marginBottom: "0.1rem" }}
        onClick={(_t, mouseEvent) => {
          setClickCoords({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
          setIsMarkerInfoOpen(false);
        }}
      >
        {/* seemine에 따른 저장된 마커 보이기 */}
        {seeMine ? (
          <>
            {dataArray?.map((el: any) => {
              return (
                el.uid === user?.uid && (
                  <EventMarkerContainer
                    key={el.id}
                    data={el}
                  ></EventMarkerContainer>
                )
              );
            })}
          </>
        ) : (
          <>
            {dataArray?.map((el: any) => {
              if (el.hide) return null;
              return (
                <EventMarkerContainer
                  key={el.id}
                  data={el}
                ></EventMarkerContainer>
              );
            })}
          </>
        )}

        {/* Current Map Marker */}
        {clickCoords.lat !== 0 && clickCoords.lng !== 0 && (
          <MapMarker
            position={{ lat: clickCoords.lat, lng: clickCoords.lng }}
            onClick={() => {
              setIsMarkerInfoOpen((prev) => !prev);
              setAdd(true);
            }}
          >
            {isMarkerInfoOpen && (
              <StoreInfo
                lat={clickCoords.lat}
                lng={clickCoords.lng}
                add={add}
                toggleInfo={toggleInfo}
              />
            )}
          </MapMarker>
        )}
      </Map>
    </>
  );
};

export default KakaoMap;
