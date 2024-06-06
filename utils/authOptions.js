import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked when sign in successful
    async signIn({ profile }) {
      //1. Connect the database
      //2. Check if user exists
      //3. if not, create user
      //4. return true to allow user
    },

    //modified session object
    async session({ session }) {
      //1. get user from database
      //2. assign user id to session
      //3. return session
    },
  },
};
