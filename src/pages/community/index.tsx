import React, { useEffect, useState } from "react";
import heart from "../../../public/heart.png";
import clickedHeart from "../../../public/clickedHeart.png";
import comment from "../../../public/comment.png";
import dm from "../../../public/dm.png";
import bookmark from "../../../public/bookmark.png";
import profile from "../../../public/profile.png";
import Image from "next/image";
import { useStoreData, useUserData } from "@/hooks";
import { doc, onSnapshot } from "firebase/firestore";
import { dbService } from "@/components/firebase/firebase";
import { fetchLikes } from "../../../api";
import { queryClient } from "../_app";

export default function Community() {
  const { data: userData } = useUserData();
  const { data: dataArray } = useStoreData();
  const [orderBy, setOrderBy] = useState<"latest" | "popularity">("latest");
  const [likes, setLikes] = useState<
    { id: string; likeUserList: string[]; likes: number }[]
  >([{ id: "", likeUserList: [""], likes: 0 }]);

  if (orderBy === "latest") {
    dataArray?.sort((a, b) => b.combinedTimestamp - a.combinedTimestamp);
  } else if (orderBy === "popularity") {
    dataArray?.sort((a, b) => b.likeUserList.length - a.likeUserList.length);
  }

  useEffect(() => {
    const initialLikes = dataArray?.map((el: any) => ({
      id: el.id,
      likeUserList: el.likeUserList || [""],
      likes: el.likes || 0,
    }));
    if (initialLikes) setLikes(initialLikes);

    dataArray?.forEach((el: any) => {
      const unsubscribe = onSnapshot(
        doc(dbService, "mystore", el.id),
        (snapshot) => {
          const updatedLikesCount = snapshot.data()?.likes || 0;
          setLikes((prevLikes) =>
            prevLikes.map((like) =>
              like.id === el.id ? { ...like, likes: updatedLikesCount } : like
            )
          );
        }
      );

      return () => unsubscribe();
    });
  }, [dataArray]);

  const handleClick = async (id: any) => {
    const itemToUpdate = dataArray?.find((el: any) => el.id === id);
    const isUserLikes = itemToUpdate.likeUserList.includes(userData?.uid);

    if (itemToUpdate) {
      const updatedLikes = isUserLikes
        ? itemToUpdate.likes - 1
        : itemToUpdate.likes + 1;

      let updatedLikeUsers: any;

      if (Array.isArray(itemToUpdate.likeUserList)) {
        if (isUserLikes) {
          updatedLikeUsers = itemToUpdate.likeUserList.filter(
            (user: string) => user !== userData?.uid
          );
        } else {
          updatedLikeUsers = [...itemToUpdate.likeUserList, userData?.uid];
        }
      } else {
        updatedLikeUsers = [userData?.uid];
      }

      const newDataArray = dataArray?.map((el: any) => {
        if (el.id === id) {
          return {
            id: el.id,
            likeUserList: updatedLikeUsers,
            likes: updatedLikes,
          };
        }
        return { id: el.id, likeUserList: el.likeUserList, likes: el.likes };
      });

      if (newDataArray) setLikes(newDataArray);
      await fetchLikes(id, updatedLikeUsers, updatedLikes);
      queryClient.invalidateQueries("data");
    }
  };

  /*
    DM 기능 추가
    댓글 기능 추가
      댓글 버튼 클릭 시 Modal 올라옴, 댓글 및 대댓글 작성 가능, 댓글좋아요는 x
    북마크 기능 추가
  */

  return (
    <>
      <div className="container">
        <div className="headerContainer">
          <div className="header">커뮤니티</div>
          <div className="orderByContainer">
            <div className="option1" onClick={() => setOrderBy("latest")}>
              최신순
            </div>
            <div className="option2" onClick={() => setOrderBy("popularity")}>
              인기순
            </div>
          </div>
        </div>
        {dataArray ? (
          dataArray?.map((el: any) => {
            if (el.hide === true) return null;

            return (
              <React.Fragment key={el.id}>
                <div className="contentContainer">
                  <div className="item profileImage">
                    <Image src={profile} alt="profile" width={35} height={35} />
                  </div>
                  <div className="item userName">{el.creatorName}</div>
                  <div className="item storeName">{el.storeName}</div>
                  <div className="item photo">photo</div>
                  <div className="item likesButton">
                    {el.likeUserList?.includes(userData?.uid) ? (
                      <Image
                        src={clickedHeart}
                        alt="clickedHeart"
                        width={25}
                        height={25}
                        onClick={() => handleClick(el.id)}
                      />
                    ) : (
                      <Image
                        src={heart}
                        alt="heart"
                        width={25}
                        height={25}
                        onClick={() => handleClick(el.id)}
                      />
                    )}
                  </div>
                  <div className="item commentButton">
                    <Image src={comment} alt="comment" width={30} height={30} />
                  </div>
                  <div className="item DMButton">
                    <Image src={dm} alt="dm" width={25} height={25} />
                  </div>
                  <div className="item Bookmark">
                    <Image
                      src={bookmark}
                      alt="bookmark"
                      width={23}
                      height={23}
                    />
                  </div>
                  <div className="item numofLikes">
                    {likes?.find((item) => item.id === el.id)?.likes} Likes
                  </div>
                  <div className="item content">{el.storeInfo}</div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
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
          width: 85%;
          height: 100%;
          font-size: 1.5rem;
          padding-left: 1rem;
          align-items: center;
        }
        .orderByContainer {
          display: flex;
          flex-direction: row;
          width: 40vw;
          align-items: center;
          justify-content: center;
        }
        .option1 {
          background-color: white;
          width: 100%;
        }
        .option2 {
          background-color: white;
          width: 100%;
        }
        .contentContainer {
          display: grid;
          position: relative;
          top: 5vh;
          min-height: 70vh;
          grid-template-rows: repeat(10, 7vh);
          grid-template-columns: repeat(10, 10vw);
          align-items: center;
          text-align: center;
        }
        .item:nth-child(1) {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
          margin-left: 0.5rem;
          margin-top: 0.2rem;
        }
        .item:nth-child(2) {
          grid-row: 1 / 2;
          grid-column: 2 / 5;
        }
        .item:nth-child(3) {
          grid-row: 1 / 2;
          grid-column: 7 / 11;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item:nth-child(4) {
          grid-row: 2 / 7;
          grid-column: 1 / 11;
        }
        .item:nth-child(5) {
          grid-row: 7 / 8;
          grid-column: 1 / 2;
        }
        .item:nth-child(6) {
          grid-row: 7 / 8;
          grid-column: 2 / 3;
        }
        .item:nth-child(7) {
          grid-row: 7 / 8;
          grid-column: 3 / 4;
        }
        .item:nth-child(8) {
          grid-row: 7 / 8;
          grid-column: 10 / 11;
        }
        .item:nth-child(9) {
          grid-row: 8 / 9;
          grid-column: 1 / 2;
          margin-left: 0.5rem;
          white-space: nowrap;
        }
        .item:nth-child(10) {
          grid-row: 9 / 11;
          grid-column: 1 / 11;
          max-height: 14vh;
          overflow-y: auto;
          text-align: left;
          margin-left: 0.5rem;
        }
        .item:nth-child(10)::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
