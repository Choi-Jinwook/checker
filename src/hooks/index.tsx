import { useQuery } from "react-query";
import { fetchStoreData } from "../../api";

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
