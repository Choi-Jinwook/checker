import React, { Fragment, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import EventMarkerContainer from "./EventMarkerContainer";
import { useStoreData } from "@shared/hooks";
import { Coords, Marker } from "@shared/types";
import StoreInfo from "./StoreInfo";

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
  const [clickedMarker, setClickedMarker] = useState("");
  const { data: dataArray } = useStoreData();

  const handleClickedMarker = (id: string) => {
    if (isMarkerInfoOpen) {
      setIsMarkerInfoOpen(false);
    }
    setClickedMarker(id);
  };

  const handleCloseAllMarker = () => {
    setIsMarkerInfoOpen(false);
    setClickedMarker("");
  };

  const toggleInfo = () => {
    if (clickedMarker !== "") {
      setClickedMarker("");
    }
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
    <Fragment>
      <Map
        id="kakaoMap"
        center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
        style={{ width: "100%", height: "45vh", marginBottom: "0.1rem" }}
        onClick={(_t, mouseEvent) => {
          setClickCoords({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
          if (isMarkerInfoOpen || clickedMarker !== "") handleCloseAllMarker();
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
                    clickedMarker={clickedMarker}
                    handleClickedMarker={handleClickedMarker}
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
            toggleInfo();
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
    </Fragment>
  );
};

export default KakaoMap;
