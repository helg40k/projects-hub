// see https://dev.to/peterlidee/full-guide-for-authentication-with-next-14-nextauth-4-strapi-v4-using-google-and-credentials-provider-7jh

import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth( {
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({user, account, profile}) {
      const email = user?.email;
      if (!email) {
        return false;
      }
      const allowedAuthUserDomain = process.env.ALLOWED_AUTH_USER_DOMAIN;
      const authEmailsWhiteList = process.env.AUTH_EMAILS_WHITE_LIST;
      if (allowedAuthUserDomain) {
        if (!email.endsWith(allowedAuthUserDomain) && authEmailsWhiteList) {
          return authEmailsWhiteList.includes(email);
        }
      }
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log(`= REDIRECT = ${url}`);
    //   return url;
    //   // return `${baseUrl}/projects`;
    // },
    async session({ session, token, user }) {
      console.log('= SESSION =');
      return session;
    },
    async jwt({token, user, account, profile, trigger, session}) {
      console.log('= JWT =');
      return token;
    }
  },
  logger: {
    async error(code, metadata) {
      console.error(`NextAuth error! Code: ${code}`, metadata);
    },
  },
});
