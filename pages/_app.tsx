import { Footer } from '@shared/components/layout'
import '@shared/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const shouldRenderFooter = !['/', '/login'].includes(router.pathname)

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {shouldRenderFooter ? (
          <Footer>
            <Component {...pageProps} />
            <ToastContainer />
          </Footer>
        ) : (
          <>
            <Component {...pageProps} />
            <ToastContainer />
          </>
        )}
      </QueryClientProvider>
    </SessionProvider>
  )
}
