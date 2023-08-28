import Footer from "@/components/Footer";
import { dbService } from "@/components/firebase/firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import heart from "../../public/heart.png";
import comment from "../../public/comment.png";
import dm from "../../public/dm.png";
import bookmark from "../../public/bookmark.png";
import profile from "../../public/profile.png";
import Image from "next/image";

export default function Community({ data }: any) {
  console.log(data);

  const [isClicked, setIsClicked] = useState(false);
  const [likes, setLikes] = useState<{ id: any; like: any }[]>([
    { id: "", like: 0 },
  ]);

  useEffect(() => {
    const updatedLikes = data.map((el: any) => ({
      id: el._key.path.segments[6],
      like: el._document.data.value.mapValue.fields.likes?.integerValue,
    }));
    setLikes(updatedLikes);
  }, [data]);

  const handleClick = async (id: any) => {
    let currentLikes = 0;
    likes.forEach((el: any) => {
      if (el.id === id) {
        currentLikes = el.like;
      }
    });
    console.log(currentLikes);
    // user like list 만들어야할듯

    if (!isClicked) {
      setIsClicked(true);
      currentLikes++;
      await updateDoc(doc(dbService, "mystore", `${id}`), {
        likes: currentLikes,
      });
    } else {
      setIsClicked(false);
      currentLikes--;
      await updateDoc(doc(dbService, "mystore", `${id}`), {
        likes: currentLikes,
      });
    }
  };

  return (
    <Footer>
      <div className="container">
        <div className="headerContainer">
          <div className="header">커뮤니티</div>
        </div>
        {data.map((el: any, index: number) => {
          const docPath = el._document.data.value.mapValue.fields;
          if (docPath.hide.booleanValue === true) return null;

          return (
            <React.Fragment key={el._key.path.segments[6]}>
              <div className="contentContainer">
                <div className="item profileImage">
                  <Image src={profile} alt="profile" width={35} height={35} />
                </div>
                <div className="item userName">
                  {docPath.creatorName.stringValue}
                </div>
                <div className="item storeName">
                  {docPath.storeName.stringValue}
                </div>
                <div className="item photo">photo</div>
                <div className="item likesButton">
                  <Image
                    src={heart}
                    alt="heart"
                    width={25}
                    height={25}
                    onClick={() => handleClick(el._key.path.segments[6])}
                  />
                </div>
                <div className="item commentButton">
                  <Image src={comment} alt="comment" width={30} height={30} />
                </div>
                <div className="item DMButton">
                  <Image src={dm} alt="dm" width={25} height={25} />
                </div>
                <div className="item Bookmark">
                  <Image src={bookmark} alt="bookmark" width={23} height={23} />
                </div>
                <div className="item numofLikes">
                  {likes[index]?.like} Likes
                </div>
                <div className="item content">
                  {docPath.storeInfo.stringValue}
                </div>
              </div>
            </React.Fragment>
          );
        })}
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
          position: fixed;
          background-color: white;
          width: 100%;
          height: 5vh;
          z-index: 999;
        }
        .header {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 1.5rem;
          border-bottom: 1px solid black;
          padding-left: 1rem;
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

  data.forEach((item: any) => {
    const seconds = item._document.createTime.timestamp.seconds;
    const nanoseconds = item._document.createTime.timestamp.nanoseconds;
    const combinedTimestamp = seconds * 1000 + nanoseconds / 1000000;
    item._document.createTime.combinedTimestamp = combinedTimestamp;
  });

  data.sort(
    (a: any, b: any) =>
      b._document.createTime.combinedTimestamp -
      a._document.createTime.combinedTimestamp
  );

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
