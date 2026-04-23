import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        // --- MOCK MODE BYPASS (CHECK FIRST) ---
        if (credentials.email === 'CEMSadmin@gmail.com' && credentials.password === '@#cems147') {
           try {
             await dbConnect();
             const adminUser = await User.findOne({ email: credentials.email });
             if (adminUser) {
               return {
                 id: adminUser._id.toString(),
                 name: adminUser.name,
                 email: adminUser.email,
                 role: adminUser.role,
               };
             }
           } catch (e) {
             console.log("Admin DB fallback failed, using mock data.");
           }
           
           // Fallback only if find fails
           return {
            id: "mock-admin-id",
            name: "System Admin",
            email: "CEMSadmin@gmail.com",
            role: "admin",
          };
        }
        // ------------------------------------

        try {
          await dbConnect();
        } catch (e) {
          console.log("Connection failed and not using admin bypass. Login will fail.");
          throw new Error("Database connection failed. Please try again later.");
        }

        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
