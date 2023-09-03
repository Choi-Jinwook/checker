import MainHeader from "@/components/Headers/MainHeader";
import ListSearch from "@/components/Search/ListSearch";
import KakaoMap from "@/components/kakaomap/KaKaoMap";
import { useUserData } from "@/hooks";
import { useState } from "react";

export interface MarkerInfo {
  lat: number;
  lng: number;
  addr: string;
  storeName: string;
  storeInfo: string;
  creatorName?: string;
  hide: boolean;
  id: string;
  uid: string;
}

export default function Main() {
  const [seeMine, setSeeMine] = useState<boolean>(true);
  const { data: userData, isLoading, isError } = useUserData();

  const toggleSeeMine = () => {
    setSeeMine((prev) => !prev);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured</div>;

  return (
    <>
      <MainHeader seeMine={seeMine} toggleSeeMine={toggleSeeMine} />
      <KakaoMap seeMine={seeMine} uid={userData?.uid} />
      {userData ? <ListSearch seeMine={seeMine} uid={userData.uid} /> : null}
    </>
  );
}
