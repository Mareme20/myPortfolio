import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import { type NextAuthOptions } from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Invalid credentials')
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      })

      if (!user || !user.password) {
        throw new Error('Invalid credentials')
      }

      const isCorrectPassword = await compare(credentials.password, user.password)

      if (!isCorrectPassword) {
        throw new Error('Invalid credentials')
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      }
    },
  }),
]

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.unshift(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  )
}

let adapter: Adapter | undefined

try {
  adapter = PrismaAdapter(prisma) as Adapter
} catch {
  adapter = undefined
}

export const authOptions: NextAuthOptions = {
  adapter,
  providers,
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        })

        if (user && session.user) {
          session.user.id = user.id
          session.user.role = user.role
          session.user.name = user.name
          session.user.email = user.email
          session.user.image = user.image
        }
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
