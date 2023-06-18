import { ChangeEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "@/components/firebase/firebase";
import { useRouter } from "next/router";

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
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      alert("회원가입 성공");
      router.push("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
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
    <>
      <form onSubmit={onAuthSubmit}>
        <input
          id="email"
          type="text"
          placeholder="email"
          onChange={onAuthChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          onChange={onAuthChange}
        />
        <input
          id="authSubmit"
          type="submit"
          value={login ? "로그인" : "회원가입"}
        />
      </form>
      <button onClick={handleLoginToggle}>
        {login ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
      <span>{error}</span>
    </>
  );
}
