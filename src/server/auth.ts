import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import { UserPermissionRole } from "@prisma/client";
import { api } from "~/trpc/server";
import { sendMail } from "~/lib/mail";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string,
      role?: UserPermissionRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserPermissionRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {


  pages: {
    signIn: '/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  secret: "e3cd8aace069fd2056eab19e930a8abb",

  providers: [

    GoogleProvider({
      clientId: "502784863652-4khsfe3ojq5uhe0vgguhvdkme66tuqv6.apps.googleusercontent.com",
      clientSecret: "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",
      allowDangerousEmailAccountLinking: true,

      profile(profile, token) {
        console.log('token:', token);
        return {
          id: profile.sub,
          name: `${profile.given_name}`,
          email: profile.email,
          role: UserPermissionRole.USER,
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, request) {
        if (!credentials) return null;

        // console.log('Inside credentials Provider', credentials);

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // console.log('user:', user);

        if (!user) {
          // User does not exists ...
          console.log("User or its credentials doesn't exist");
          return null;
        }
        if (credentials.password == user.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,

          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('account', account);
      console.log('profile', profile);
      const { success } = await sendMail({ subject: 'Registration NITTTR', text: 'You have successfull logged into NITTTR/hostels' });
      console.log({ success })
      return true;
    },
    session: ({ session, token, user }) => {
      session.user.role = token.role as UserPermissionRole;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      // console.log('url', url);
      // console.log('baseUrl', baseUrl);
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
