import connectDB from "@/config/database";
import User from "@/models/User";
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
      await connectDB();
      //2. Check if user exists
      const userExist = await User.findOne({ email: profile.email });
      //3. if not, create user
      if (!userExist) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow user
      return true;
    },

    //modified session object
    async session({ session }) {
      //1. get user from database
      const user = await User.findOne({ email: session.user.email });
      //2. assign user id to session
      session.user.id = user._id;
      //3. return session
      return session;
    },
  },
};
