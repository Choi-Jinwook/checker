import { dbService } from "@/components/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchStoreData = async () => {
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

  console.log(dataArray);

  return dataArray;
};

export const fetchUserData = async () => {};
