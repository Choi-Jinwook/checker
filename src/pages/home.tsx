import MainHeader from "@/components/Headers/MainHeader";
import Footer from "@/components/Layout";
import ListSearch from "@/components/Search/ListSearch";
import Seo from "@/components/Seo";
import { dbService } from "@/components/firebase/firebase";
import KakaoMap from "@/components/kakaomap/KaKaoMap";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
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

export default function Home({ data }: any) {
  const [seeMine, setSeeMine] = useState<boolean>(false);

  const toggleSeeMine = () => {
    setSeeMine((prev) => !prev);
  };

  return (
    <Footer>
      <Seo title="Home" />
      <MainHeader seeMine={seeMine} toggleSeeMine={toggleSeeMine} />
      <KakaoMap res={data} />
      <ListSearch />
    </Footer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const q = query(collection(dbService, "mystore"));
  const data: Array<any> = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc);
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
