import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import StoreInfo from "./StoreInfo";
import { UserObj } from "@/pages/home";
import EventMarkerContainer from "./EventMarkerContainer";

export interface Coords {
  lat: number;
  lng: number;
}

export interface Marker {
  data: any;
  seeMine: boolean;
  user: UserObj;
  init: boolean;
}

const KakaoMap = ({ data, seeMine, user, init }: Marker) => {
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
      {init && (
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
              {data.map((el: any) => {
                const docPath = el._document.data.value.mapValue.fields;
                return (
                  docPath.uid.stringValue === user?.uid && (
                    <EventMarkerContainer
                      key={el._key.path.segments[6]}
                      data={docPath}
                    ></EventMarkerContainer>
                  )
                );
              })}
            </>
          ) : (
            <>
              {data.map((el: any) => {
                const docPath = el._document.data.value.mapValue.fields;
                if (docPath.hide.booleanValue) return null;
                return (
                  <EventMarkerContainer
                    key={el._key.path.segments[6]}
                    data={docPath}
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

          {/* {data.map((el: any) => {
          const docPath = el._document.data.value.mapValue.fields;
          console.log(docPath);

          return (
            <React.Fragment key={el._key.path.segments[6]}>
              <MapMarker
                position={{
                  lat: docPath.lat.stringValue,
                  lng: docPath.lng.stringValue,
                }}
                onClick={() => {
                  setIsMarkerInfoOpen((prev) => !prev);
                  setAdd(false);
                }}
              >
                {isMarkerInfoOpen && (
                  <StoreInfo
                    lat={docPath.lat.stringValue}
                    lng={docPath.lng.stringValue}
                    add={add}
                    toggleInfo={toggleInfo}
                  />
                )}
              </MapMarker>
            </React.Fragment>
          );
        })} */}
        </Map>
      )}
    </>
  );
};

export default KakaoMap;
