import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch comments for a project
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!projectId) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }

    const comments = await db.comment.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    const total = await db.comment.count({
      where: { projectId }
    })

    return NextResponse.json({
      comments,
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Fetch comments error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commentaires' },
      { status: 500 }
    )
  }
}

// POST - Create comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, userId, projectId } = body

    if (!content || !userId || !projectId) {
      return NextResponse.json(
        { error: 'Contenu, utilisateur et projet requis' },
        { status: 400 }
      )
    }

    const comment = await db.comment.create({
      data: {
        content,
        userId,
        projectId
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

    // Create notification
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { user: true }
    })

    if (project && project.userId !== userId) {
      await db.notification.create({
        data: {
          type: 'comment',
          message: `Nouveau commentaire sur "${project.title}"`,
          userId: project.userId,
          data: JSON.stringify({ projectId, commentId: comment.id, commenterId: userId })
        }
      })
    }

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du commentaire' },
      { status: 500 }
    )
  }
}

// DELETE - Delete comment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID du commentaire requis' },
        { status: 400 }
      )
    }

    await db.comment.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete comment error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du commentaire' },
      { status: 500 }
    )
  }
}
