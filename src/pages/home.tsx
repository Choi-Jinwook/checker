import Main from "../components/Main";
import { authService } from "@/components/firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useStoreData } from "@/hooks";

export interface UserObj {
  email: string | null;
  displayName: string | undefined | null;
  uid: string | null;
  updateProfile: any;
}

const Home = () => {
  const [user, setUser] = useState<UserObj>();
  const { data: dataArray, isLoading, isError } = useStoreData();
  const router = useRouter();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return <Main data={dataArray} user={user} />;
};

export default Home;
