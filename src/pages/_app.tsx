import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const shouldRenderFooter = !["/", "/login"].includes(router.pathname);
  const title = router.pathname.split("/")[1];

  return (
    <QueryClientProvider client={queryClient}>
      {shouldRenderFooter ? (
        <Footer>
          <Seo title={title} />
          <Component {...pageProps} />
          <ToastContainer />
        </Footer>
      ) : (
        <>
          <Seo title={title} />
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </QueryClientProvider>
  );
}
