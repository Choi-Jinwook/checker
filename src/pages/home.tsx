import MainHeader from "@/components/Headers/MainHeader";
import ListSearch from "@/components/Search/ListSearch";
import Seo from "@/components/Seo";
import KakaoMap from "@/components/kakaomap/KaKaoMap";
import { useState } from "react";

export default function Home() {
  const [seeMine, setSeeMine] = useState<boolean>(false);

  const toggleSeeMine = () => {
    setSeeMine((prev) => !prev);
  };

  return (
    <>
      <Seo title="Home" />
      <MainHeader seeMine={seeMine} toggleSeeMine={toggleSeeMine} />
      <KakaoMap />
      <ListSearch />
    </>
  );
}
