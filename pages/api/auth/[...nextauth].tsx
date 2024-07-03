import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth( {
  pages: {
    signIn: '/',
    error: '/error',
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
      // console.log('User signed in:', user);
      // console.log('Account:', account);
      // console.log('Profile:', profile);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/projects`;
    },
  },
});
