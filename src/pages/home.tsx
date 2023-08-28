import { GetServerSideProps } from "next";
import Main from "../components/Main";
import { collection, getDocs, query } from "firebase/firestore";
import { authService, dbService } from "@/components/firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface UserObj {
  email: string | null;
  displayName: string | undefined | null;
  uid: string | null;
  updateProfile: any;
}

const Home = ({ data }: any) => {
  const [user, setUser] = useState<UserObj>();
  const router = useRouter();

  useEffect(() => {
    const handleUserObj = (user: UserObj) => {
      setUser({
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: () =>
          user.updateProfile(user, { displayName: user.displayName }),
      });
    };

    authService.onAuthStateChanged((user: any) => {
      if (user) {
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
          handleUserObj(user);
        } else {
          handleUserObj(user);
        }
      } else {
        toast("로그인을 해주세요", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "error",
          position: "bottom-center",
        });
        router.push("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Main data={data} user={user} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const q = query(collection(dbService, "mystore"));
  const data: Array<any> = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc);
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

export default Home;
