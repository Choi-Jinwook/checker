import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useRouter } from "next/router";

export default function Store() {
  const router = useRouter();
  const { storename } = router.query;
  console.log(storename);

  return (
    <Footer>
      <Seo title={storename as string} />
      <div>{storename}</div>
    </Footer>
  );
}
