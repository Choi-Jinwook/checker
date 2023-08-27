import { ChangeEvent, useState } from "react";
import { Marker } from "../kakaomap/KaKaoMap";
import { useRouter } from "next/router";

const ListSearch = ({ data, seeMine, user }: Marker) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRouting = (storename: string) => {
    router.push(`/storeinfo/${storename}`);
  };

  return (
    <div id="searchBoxContainer">
      <input
        id="searchBox"
        type="text"
        placeholder="검색어를 입력해주세요(가게명, 설명, 주소(지번))"
        onChange={handleSearchWordChange}
      />
      {search === ""
        ? data.map((el: any) => {
            const docPath = el._document.data.value.mapValue.fields;
            if (docPath.hide.booleanValue === true) return null;
            return (
              <div
                key={el._key.path.segments[6]}
                className={`list ${docPath.storeName.stringValue}`}
                onClick={(e) => {
                  handleRouting((e.target as any).textContent);
                }}
              >
                {docPath.storeName.stringValue}
              </div>
            );
          })
        : data.map((el: any) => {
            const docPath = el._document.data.value.mapValue.fields;
            const addr = docPath.addr.stringValue.includes(search);
            const info = docPath.storeInfo.stringValue.includes(search);
            const name = docPath.storeName.stringValue.includes(search);

            if (docPath.hide.booleanValue === true) return null;
            if (addr || info || name) {
              return (
                <div
                  key={el._key.path.segments[6]}
                  className="list"
                  onClick={(e) => {
                    handleRouting((e.target as any).textContent);
                  }}
                >
                  {docPath.storeName.stringValue}
                </div>
              );
            }
          })}
      <style jsx>{`
        #searchBoxContainer {
          width: 100%;
          height: 1.5rem;
          margin-bottom: 0.3rem;
        }
        #searchBox {
          width: inherit;
          font-size: 1rem;
          border: 1px solid gray;
          box-sizing: border-box;
          margin-bottom: 0.3rem;
        }
        .list {
          width: inherit;
          font-size: 1.5rem;
          margin-bottom: 0.3rem;
          margin-left: 0.2rem;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default ListSearch;
