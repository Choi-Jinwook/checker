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
  uid: string | null | undefined;
}

const KakaoMap = ({ seeMine, uid }: Marker) => {
  const [mapCenter, setMapCenter] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [clickCoords, setClickCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [isMarkerInfoOpen, setIsMarkerInfoOpen] = useState(false);
  const { data: dataArray } = useStoreData();

  const toggleInfo = () => {
    setIsMarkerInfoOpen((prev) => !prev);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
        alert("위치 정보 사용에 동의해주세요");
        setMapCenter({
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
        center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
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
                el.uid === uid && (
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
              if (el.hide) {
                if (el.uid !== uid) return null;
              }
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
        <MapMarker
          position={{ lat: clickCoords.lat, lng: clickCoords.lng }}
          onClick={() => {
            setIsMarkerInfoOpen((prev) => !prev);
          }}
        >
          {isMarkerInfoOpen && (
            <StoreInfo
              lat={clickCoords.lat}
              lng={clickCoords.lng}
              toggleInfo={toggleInfo}
            />
          )}
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
