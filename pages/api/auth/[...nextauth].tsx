import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

interface JWTProps {
  token: JWT
  account: any
  user: any
}

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true
    },
    async redirect({ url, baseUrl }: any) {
      return url
    },
    async session({ session, user, token }: any) {
      return session
    },
    async jwt({ token, account, user }: JWTProps) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user
        }
      }
      return token
    }
  }
}

export default NextAuth(options)
