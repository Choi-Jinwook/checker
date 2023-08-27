import Link from "next/link";
import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const Footer = ({ children }: MyComponentProps) => {
  return (
    <>
      <footer className="container">
        <Link legacyBehavior href="/home">
          <a className="footer">홈</a>
        </Link>
        <Link legacyBehavior href="/list">
          <a className="footer">목록</a>
        </Link>
        <Link legacyBehavior href="/community">
          <a className="footer">커뮤니티</a>
        </Link>
        <Link legacyBehavior href="/profile">
          <a className="footer">프로필</a>
        </Link>
      </footer>
      <div>{children}</div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          position: fixed;
          bottom: 0px;
          left: 0px;
          text-align: center;
        }
        .footer {
          width: 25%;
          text-decoration: none;
          color: black;
        }
      `}</style>
    </>
  );
};

export default Footer;
