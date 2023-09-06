import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@shared/styles/Auth.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { authService } from "@shared/firebase";
import { useToast } from "@shared/hooks";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const { showToast } = useToast();

  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session, status);
  }, [session, status]);

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    try {
      if (!login) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        showToast("회원가입에 성공했습니다.", "success");
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
        showToast("로그인에 성공했습니다.", "success");
      }
      push("/home", undefined, { shallow: true });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email-already-in-use")) {
          setError("이미 존재하는 이메일입니다.");
        } else if (error.message.includes("wrong-password")) {
          setError("등록되지 않은 계정이거나 비밀번호가 틀렸습니다.");
        } else {
          setError("예상치 못한 에러 발생");
        }
      }
    }
  };

  const toggleLoginSignup = () => {
    setLogin((prev) => !prev);
    setError("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          id="email"
          className={styles.email}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          className={styles.password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.authSubmit}
          type="submit"
          value={login ? "로그인" : "회원가입"}
        />
      </form>
      <span className={styles.convert} onClick={toggleLoginSignup}>
        {login ? "회원가입으로 전환" : "로그인으로 전환"}
      </span>
      <span className={styles.errorMsg}>{error}</span>
      <br />
      <div>* 로그인 후 지도가 보이지 않으면 새로고침을 해주세요!</div>
      <div>
        {!session && (
          <ul>
            <li>
              <a
                href={"/api/auth/signin"}
                onClick={(e) => {
                  e.preventDefault();
                  signIn("google");
                }}
              >
                google
              </a>
            </li>
          </ul>
        )}
        <li>
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            so
          </button>
        </li>
      </div>
    </div>
  );
}
