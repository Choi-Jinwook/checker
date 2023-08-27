import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "./firebase/firebase";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const onAuthSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    try {
      if (!login) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        alert("회원가입에 성공했습니다.");
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
        alert("로그인에 성공했습니다.");
      }
      router.push("/home", undefined, { shallow: true });
    } catch (error) {
      if (error instanceof Error) {
        setError("등록되지 않은 계정이거나 비밀번호가 틀렸습니다.");
        // 중복회원일때 문구 추가
      }
    }
  };

  const onAuthChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLoginToggle = () => {
    setLogin((prev) => !prev);
    setError("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onAuthSubmit}>
        <input
          id="email"
          className={styles.email}
          type="text"
          placeholder="Email"
          onChange={onAuthChange}
        />
        <input
          id="password"
          className={styles.password}
          type="password"
          placeholder="Password"
          onChange={onAuthChange}
        />
        <input
          className={styles.authSubmit}
          type="submit"
          value={login ? "로그인" : "회원가입"}
        />
      </form>
      <span className={styles.convert} onClick={handleLoginToggle}>
        {login ? "회원가입으로 전환" : "로그인으로 전환"}
      </span>
      <span className={styles.errorMsg}>{error}</span>
      <br />
      <div>* 로그인 후 지도가 보이지 않으면 새로고침을 해주세요!</div>
    </div>
  );
};

export default Auth;
