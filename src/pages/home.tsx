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

const Home = ({ initialData }: any) => {
  const [data, setData] = useState<any>(initialData);
  const [user, setUser] = useState<UserObj>();
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    console.log(router);

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
  const querySnapshot = await getDocs(q);
  const dataArray: any[] = [];
  querySnapshot.forEach((doc: any) => {
    const data = doc.data();
    dataArray.push({
      ...data,
      id: doc._key.path.segments[6],
      combinedTimestamp:
        doc._document.createTime.timestamp.seconds * 1000 +
        doc._document.createTime.timestamp.nanoseconds / 1000000,
    });
  });
  dataArray.sort((a, b) => b.combinedTimestamp - a.combinedTimestamp);

  return {
    props: {
      initialData: dataArray,
    },
  };
};

export default Home;
