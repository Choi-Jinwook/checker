import Footer from "@/components/Footer";
import { dbService } from "@/components/firebase/firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import heart from "../../public/heart.png";
import clickedHeart from "../../public/clickedHeart.png";
import comment from "../../public/comment.png";
import dm from "../../public/dm.png";
import bookmark from "../../public/bookmark.png";
import profile from "../../public/profile.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Community() {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<any[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(dbService, "mystore"));
      const querySnapshot = await getDocs(q);
      const dataArray: any[] = [];
      querySnapshot.forEach((doc: any) => {
        const data = doc.data();
        dataArray.push({
          ...data,
          id: doc._key.path.segments[6],
          combinedTimestamp:
            doc._document.createTime.timestamp.seconds * 1000 +
            doc._document.createTime.timestamp.nanoseconds / 1000000,
        });
      });
      dataArray.sort((a, b) => b.combinedTimestamp - a.combinedTimestamp);
      setData(dataArray);
    };
    fetchData();
  }, [data]);

  const handleClick = async (id: any) => {
    let currentLikes = 0;
    data?.forEach((el: any) => {
      if (el.id === id) {
        currentLikes = el.likes;
        return;
      }
    });
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
    <Footer data={data}>
      <div className="container">
        <div className="headerContainer">
          <div className="header">커뮤니티</div>
        </div>
        {data ? (
          data?.map((el: any) => {
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
                    {isClicked ? (
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
                  <div className="item numofLikes">{el.likes} Likes</div>
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
