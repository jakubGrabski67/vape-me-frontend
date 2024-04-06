import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const generateRandomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateNextAuthSecret = () => {
  // Generate a random string of length 64
  return generateRandomString(64);
};

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET || generateNextAuthSecret(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
