import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Store() {
  const router = useRouter();
  const { storename } = router.query;
  console.log(storename);

  return <div>{storename}</div>;
}
