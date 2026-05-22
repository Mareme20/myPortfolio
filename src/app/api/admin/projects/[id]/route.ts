// app/api/admin/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET: Récupérer un projet
export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const [{ getServerSession }, { authOptions }, { prisma }] = await Promise.all([
      import('next-auth'),
      import('@/lib/auth'),
      import('@/lib/prisma'),
    ])

    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await context.params
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project })

  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT: Mettre à jour un projet
export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const [{ getServerSession }, { authOptions }, { prisma }] = await Promise.all([
      import('next-auth'),
      import('@/lib/auth'),
      import('@/lib/prisma'),
    ])

    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await context.params
    const data = await request.json()

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt
      }
    })

    return NextResponse.json({ project })

  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE: Supprimer un projet
export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const [{ getServerSession }, { authOptions }, { prisma }] = await Promise.all([
      import('next-auth'),
      import('@/lib/auth'),
      import('@/lib/prisma'),
    ])

    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await context.params

    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json(
      { message: 'Projet supprimé avec succès' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
