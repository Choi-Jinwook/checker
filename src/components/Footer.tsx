import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import home from "../../public/home.png";
import list from "../../public/list.png";
import community from "../../public/community.png";
import profile from "../../public/profile.png";

interface MyComponentProps {
  children: ReactNode;
}

const Footer = ({ children }: MyComponentProps) => {
  return (
    <>
      <footer className="container">
        <Link legacyBehavior href="/home">
          <a className="footer">
            <Image src={home} alt="home" width={28} height={28} />
          </a>
        </Link>
        <Link legacyBehavior href="/list">
          <a className="footer">
            <Image src={list} alt="list" width={28} height={28} />
          </a>
        </Link>
        <Link legacyBehavior href="/community">
          <a className="footer">
            <Image
              src={community}
              alt="community"
              width={33}
              height={33}
              priority
            />
          </a>
        </Link>
        <Link legacyBehavior href="/profile">
          <a className="footer">
            <Image src={profile} alt="profile" width={28} height={28} />
          </a>
        </Link>
      </footer>
      <div>{children}</div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 5vh;
          display: flex;
          position: fixed;
          bottom: 0px;
          left: 0px;
          background-color: white;
          border-top: 1px solid black;
          text-align: center;
          align-items: center;
        }
        .footer {
          position: relative;
          top: 0.3vh;
          width: 25%;
        }
      `}</style>
    </>
  );
};

export default Footer;
