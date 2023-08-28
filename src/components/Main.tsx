import MainHeader from "@/components/Headers/MainHeader";
import Footer from "@/components/Footer";
import ListSearch from "@/components/Search/ListSearch";
import Seo from "@/components/Seo";
import KakaoMap from "@/components/kakaomap/KaKaoMap";
import { useEffect, useState } from "react";

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

export default function Main({ data, user }: any) {
  const [seeMine, setSeeMine] = useState<boolean>(true);
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setInit(true);
    }
  }, [user]);

  const toggleSeeMine = () => {
    setSeeMine((prev) => !prev);
  };

  return (
    <Footer>
      <Seo title="Home" />
      <MainHeader seeMine={seeMine} toggleSeeMine={toggleSeeMine} />
      <KakaoMap seeMine={seeMine} data={data} user={user} init={init} />
      {user ? (
        <ListSearch seeMine={seeMine} data={data} user={user} init={init} />
      ) : null}
    </Footer>
  );
}
