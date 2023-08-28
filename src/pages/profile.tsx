import Footer from "@/components/Footer";
import { authService } from "@/components/firebase/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import profile from "../../public/profile.png";

export default function Profile() {
  const [user, setUser] = useState<any>();
  const router = useRouter();
  const handleLogout = () => {
    const answer = confirm("로그아웃 하시겠습니까?");
    if (answer) {
      authService.signOut();
      router.push("/login");
    }
  };

  useEffect(() => {
    setUser(authService.currentUser?.displayName);
  }, []);

  return (
    <Footer>
      <div className="container">
        <div className="headerContainer">
          <div className="header">프로필</div>
        </div>
        <div className="nicknameContainer">
          <div className="item profileImage">
            <Image src={profile} alt="profile" width={100} height={100} />
          </div>
          {user ? (
            <div className="item nickname">{user}</div>
          ) : (
            <div className="item nickname"></div>
          )}
        </div>
        <div className="logoutContainer">
          <button className="logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 95vh;
          }
          .headerContainer {
            width: 100%;
            height: 5vh;
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
          .nicknameContainer {
            display: grid;
            grid-template-rows: repeat(2, 10vh);
            grid-template-columns: repeat(4, 10vh);
            margin-top: 1vh;
          }
          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            position: relative;
          }
          .item:nth-child(1) {
            grid-row: span 2;
            grid-column: span 2;
          }
          .item:nth-child(2) {
            grid-row: span 2;
            grid-column: 3 / 5;
          }
          .logoutContainer {
            margin-left: auto;
            margin-right: 1rem;
            margin-top: 1vh;
          }
          .logout {
            background-color: white;
            border: 1px solid #afafaf;
            border-radius: 0.5rem;
            width: 4rem;
            height: 2rem;
          }
        `}</style>
      </div>
    </Footer>
  );
}
