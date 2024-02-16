import NextAuth, { type DefaultSession } from 'next-auth'
import TwitterProvider from "next-auth/providers/twitter";

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    })
  ],
  callbacks: {
    // jwt({ token, profile }) {
    //   console.log("JWT callback - Profile:", profile); // Logging the profile information
    //   if (profile) {
    //     token.id = profile.id || profile.sub;
    //     token.image = profile.avatar_url || profile.picture;
    //   }
    //   console.log("JWT callback - Token:", token); // Logging the token information
    //   return token;
    // },
    jwt({ token, account }) {
      // console.log("JWT callback - Account:", account); // Logging the account information
      if (account) {
        token.id = account.providerAccountId; // Using the providerAccountId as the user's ID
      }
      // console.log("JWT callback - Token:", token); // Logging the token information
      return token;
    },
    session: ({ session, token }) => {
      // console.log("Session callback - Token:", token); // Logging the token information
      if (session?.user && token?.id) {
        session.user.id = String(token.id);
      }
      // console.log("Session callback - Session:", session); // Logging the session information
      return session;
    },
    authorized({ auth, request }) {
      const isAuthorized = !!auth?.user || (!request.nextUrl.pathname.includes('/chat') && !request.nextUrl.pathname.includes('/new'));
      // console.log("Authorized callback - Is Authorized:", isAuthorized); // Logging the authorization status
      return isAuthorized;
    }
  },
  pages: {
    signIn: '/sign-in'
  },
  events: {
    signIn(message) {
      console.log('Sign in event:', message);
    },
    signOut(message) {
      console.log('Sign out event:', message);
    },
    createUser(message) {
      console.log('Create user event:', message);
    },
  },
  debug: true, // This enables debugging during development
});


// export const {
//   handlers: { GET, POST },
//   auth
// } = NextAuth({
//   providers: [
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET
//     })
//   ],
//   callbacks: {
//     jwt({ token, profile }) {
//       if (profile) {
//         token.id = profile.id
//         token.image = profile.avatar_url || profile.picture
//       }
//       return token
//     },
//     session: ({ session, token }) => {
//       if (session?.user && token?.id) {
//         session.user.id = String(token.id)
//       }
//       return session
//     },
//     authorized({ auth }) {
//       return !!auth?.user // this ensures there is a logged in user for -every- request
//     }
//   },
//   pages: {
//     signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
//   }
// })
