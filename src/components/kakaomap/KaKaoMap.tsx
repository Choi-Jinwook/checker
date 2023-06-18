/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";
import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import ClickableMarker from "./ClickableMarker";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=7fe13a944b1292368361112f4eef767f&libraries=services,clusterer&autoload=false`;

export interface Coords {
  lat: number;
  lng: number;
}

const KakaoMap = () => {
  const [myCoords, setMyCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [clickCoords, setClickCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  const [isMarkerInfoOpen, setIsMarkerInfoOpen] = useState(false);

  const toggleInfo = (state: boolean) => {
    setIsMarkerInfoOpen(!state);
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
        setMyCoords({
          lat: 37,
          lng: 127,
        });
      }
    );
  }, []);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: myCoords.lat, lng: myCoords.lng }}
        style={{ width: "100%", height: "45vh", marginBottom: "0.1rem" }}
        onClick={(_t, mouseEvent) => {
          setClickCoords({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          });
        }}
      >
        <ClickableMarker
          lat={clickCoords.lat}
          lng={clickCoords.lng}
          info={isMarkerInfoOpen}
          toggleInfo={() => toggleInfo(isMarkerInfoOpen)}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
