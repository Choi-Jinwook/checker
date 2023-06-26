import { ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
}

const Footer = ({ children }: MyComponentProps) => {
  return (
    <>
      <footer className="container">
        <div className="footer">홈</div>
        <div className="footer">목록</div>
        <div className="footer">커뮤니티</div>
        <div className="footer">프로필</div>
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
        }
      `}</style>
    </>
  );
};

export default Footer;
