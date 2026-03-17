import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch all projects with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'recent'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}

    if (category) {
      where.category = category
    }
    if (status) {
      where.status = status
    }
    if (userId) {
      where.userId = userId
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    }

    let orderBy: any = { createdAt: 'desc' }
    if (sort === 'popular') {
      orderBy = { likes: 'desc' }
    } else if (sort === 'views') {
      orderBy = { views: 'desc' }
    }

    const projects = await db.project.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true,
            likesRel: true
          }
        }
      },
      orderBy,
      take: limit,
      skip: offset
    })

    const total = await db.project.count({ where })

    return NextResponse.json({
      projects: projects.map(p => ({
        ...p,
        images: JSON.parse(p.images),
        tags: p.tags ? JSON.parse(p.tags) : [],
        likes: p._count.likesRel,
        comments: p._count.comments
      })),
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Fetch projects error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    )
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, images, category, tags, userId, status = 'published' } = body

    if (!title || !userId) {
      return NextResponse.json(
        { error: 'Titre et utilisateur requis' },
        { status: 400 }
      )
    }

    const project = await db.project.create({
      data: {
        title,
        description: description || '',
        images: JSON.stringify(images || []),
        category: category || 'Autre',
        tags: JSON.stringify(tags || []),
        status,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
      tags: project.tags ? JSON.parse(project.tags) : []
    }, { status: 201 })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, images, category, tags, status } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (images !== undefined) updateData.images = JSON.stringify(images)
    if (category !== undefined) updateData.category = category
    if (tags !== undefined) updateData.tags = JSON.stringify(tags)
    if (status !== undefined) updateData.status = status

    const project = await db.project.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      ...project,
      images: JSON.parse(project.images),
      tags: project.tags ? JSON.parse(project.tags) : []
    })
  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du projet' },
      { status: 500 }
    )
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }

    await db.project.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    )
  }
}
