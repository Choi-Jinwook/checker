import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <Component {...pageProps} />
      <footer className="container">
        <div className="footer">홈</div>
        <div className="footer">목록</div>
        <div className="footer">커뮤니티</div>
        <div className="footer">프로필</div>
      </footer>
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
    </div>
  );
}
