import { useUserData } from "@shared/hooks";
import { useState } from "react";
import KakaoMap from "./KaKaoMap";
import ListSearch from "./ListSearch";
import { MainHeader } from "@shared/components/layout";

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
