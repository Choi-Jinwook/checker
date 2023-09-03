import { useMutation, useQuery } from "react-query";
import { fetchLikes, fetchStoreData, fetchUserData } from "../../api";
import { UserObj } from "@/pages/home";
import { TypeOptions, toast } from "react-toastify";

export const useStoreData = () => {
  return useQuery(
    "data",
    async () => {
      const res = await fetchStoreData();
      return res;
    },
    { refetchOnWindowFocus: false } // true로 바꾸기
  );
};

export const useLike = () => {
  return useMutation(
    async ({
      id,
      uid,
      likes,
    }: {
      id: string;
      uid: string[];
      likes: number;
    }) => {
      await fetchLikes(id, uid, likes);
    }
  );
};

export const useUserData = () => {
  return useQuery<UserObj | null>("user", fetchUserData, {
    refetchOnWindowFocus: false,
  });
};

export const useToast = () => {
  const showToast = (message: string, type: TypeOptions | undefined) => {
    return toast(message, {
      hideProgressBar: true,
      autoClose: 1000,
      type: type,
      position: "bottom-center",
    });
  };

  return { showToast };
};
