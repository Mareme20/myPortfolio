export const dynamic = 'force-dynamic'

type AuthContext = {
  params: Promise<Record<string, string | string[]>>
}

export async function GET(request: Request, context: AuthContext) {
  const [{ default: NextAuth }, { authOptions }] = await Promise.all([
    import('next-auth'),
    import('@/lib/auth'),
  ])

  const handler = NextAuth(authOptions)
  return handler(request, context)
}

export async function POST(request: Request, context: AuthContext) {
  return GET(request, context)
}
