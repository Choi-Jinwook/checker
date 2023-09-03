import { ChangeEvent, useState } from "react";
import { Marker } from "../kakaomap/KaKaoMap";
import { useRouter } from "next/router";
import { useStoreData } from "@/hooks";

const ListSearch = ({ seeMine, user }: Marker) => {
  const [search, setSearch] = useState("");
  const { data: dataArray } = useStoreData();
  const router = useRouter();

  const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRouting = (storename: string) => {
    router.push(`/storeinfo/${storename}`);
  };

  return (
    <>
      <div id="searchBoxContainer">
        <input
          id="searchBox"
          type="text"
          placeholder="검색어를 입력해주세요(가게명, 설명, 주소(지번))"
          onChange={handleSearchWordChange}
        />
      </div>
      <div className="listContainer">
        {dataArray?.map((el: any) => {
          const isHidden = el.hide;
          const storeName = el.storeName;
          const uidMatch = user?.uid === el.uid;
          const addr = el.addr.includes(search);
          const info = el.storeInfo.includes(search);
          const name = storeName.includes(search);

          if (isHidden && !uidMatch) return null;
          if (seeMine && !uidMatch) return null;
          if (search !== "" && !addr && !info && !name) return null;

          return (
            <div
              key={el.id}
              className={`list ${storeName}`}
              onClick={() => handleRouting(storeName)}
            >
              {storeName}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        #searchBoxContainer {
          width: 100%;
        }
        #searchBox {
          width: inherit;
          height: 5vh;
          font-size: 1rem;
          border: none;
          border-bottom: 1px solid black;
          box-sizing: border-box;
          padding: 4px;
        }
        .listContainer {
          width: 100vw;
          height: 39vh;
          overflow-y: scroll;
          padding: 4px;
          padding-top: 6px;
        }
        .listContainer::-webkit-scrollbar {
          display: none;
        }
        .list {
          width: inherit;
          font-size: 1.5rem;
          color: black;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default ListSearch;
