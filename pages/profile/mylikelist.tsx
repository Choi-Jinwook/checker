import { useStoreData, useUserData } from "@shared/hooks";
import Link from "next/link";
import React from "react";

export default function MyLikeList() {
  const { data: userData } = useUserData();
  const { data: dataArray } = useStoreData();

  return (
    <div className="container">
      <div className="headerContainer">
        <div className="header">내가 좋아한</div>
      </div>
      {dataArray?.map((el: any) => {
        if (el.likeUserList?.includes(userData?.uid)) {
          return (
            <React.Fragment key={el.id}>
              <div className="storeContainer">
                <Link href={`/storeinfo/${el.storeName}`} legacyBehavior>
                  <a className="storeLink">
                    <div className="storeName">{el.storeName}</div>
                  </a>
                </Link>
                <div className="creatorName">등록: {el.creatorName}</div>
              </div>
            </React.Fragment>
          );
        }
        return null;
      })}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 95vh;
          overflow: hidden;
          overflow-y: scroll;
        }
        .container::-webkit-scrollbar {
          display: none;
        }
        .headerContainer {
          width: 100%;
          height: 5vh;
          display: flex;
          position: fixed;
          background-color: white;
          z-index: 999;
          border-bottom: 1px solid black;
        }
        .header {
          display: flex;
          width: 100%;
          height: 100%;
          font-size: 1.5rem;
          padding-left: 1rem;
          align-items: center;
        }
        .storeContainer {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 7vh;
          position: relative;
          top: 5vh;
          font-size: 1.2rem;
          justify-content: center;
          padding-left: 1rem;
          border-bottom: 1px solid black;
        }
        .storeLink {
          color: black;
          text-decoration: none;
        }
        .storeName {
          width: calc(100vw - 1rem);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .creatorName {
          width: calc(100vw - 1rem);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
