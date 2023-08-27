import Footer from "@/components/Layout";
import { authService } from "@/components/firebase/firebase";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const handleLogout = () => {
    authService.signOut();
    router.push("/login");
  };

  return (
    <Footer>
      <button onClick={handleLogout}>Log out</button>
    </Footer>
  );
}
