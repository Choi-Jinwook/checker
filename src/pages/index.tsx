import { ChangeEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "@/components/firebase/firebase";
import { useRouter } from "next/router";
import styles from "../styles/index.module.css";

export default function Auth() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginToggle = () => {
    setLogin((prev) => !prev);
    setError("");
  };

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
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError("등록되지 않은 계정이거나 비밀번호가 틀렸습니다.");
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
      <text className={styles.convert} onClick={handleLoginToggle}>
        {login ? "회원가입으로 전환" : "로그인으로 전환"}
      </text>
      <span className={styles.errorMsg}>{error}</span>
    </div>
  );
}
