import { useStoreData, useUserData } from "@/hooks";

export default function MyLikeList() {
  const { data: userData } = useUserData();
  const { data: dataArray } = useStoreData();
  return (
    <>
      {dataArray?.map((el: any) => {
        if (el.likeUserList.includes(userData?.uid))
          return <div key={el.id}>{el.storeName}</div>;
      })}
    </>
  );
}
