// app/api/admin/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET: Récupérer tous les projets
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          technologies: true,
          published: true,
          featured: true,
          createdAt: true,
          image: true,
        }
      }),
      prisma.project.count()
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST: Créer un projet
export async function POST(request: NextRequest) {
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

    const data = await request.json()
    
    // Validation simple (utilisez Zod en production)
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Titre et slug requis' },
        { status: 400 }
      )
    }

    // Vérifier si le slug existe déjà
    const existing = await prisma.project.findUnique({
      where: { slug: data.slug }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        userId: session.user.id,
        publishedAt: data.published ? new Date() : null
      }
    })

    return NextResponse.json({ project }, { status: 201 })

  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
