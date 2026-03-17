import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Check if user liked a project or get all likes for a project
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')
    const userId = searchParams.get('userId')

    if (!projectId) {
      return NextResponse.json(
        { error: 'ID du projet requis' },
        { status: 400 }
      )
    }

    // Check if user liked the project
    if (userId) {
      const like = await db.like.findUnique({
        where: {
          userId_projectId: {
            userId,
            projectId
          }
        }
      })

      return NextResponse.json({
        liked: !!like
      })
    }

    // Get all likes for the project
    const likes = await db.like.findMany({
      where: { projectId },
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
      count: likes.length,
      likes: likes.map(l => ({
        id: l.id,
        user: l.user,
        createdAt: l.createdAt
      }))
    })
  } catch (error) {
    console.error('Fetch likes error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des likes' },
      { status: 500 }
    )
  }
}

// POST - Like a project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, projectId } = body

    if (!userId || !projectId) {
      return NextResponse.json(
        { error: 'Utilisateur et projet requis' },
        { status: 400 }
      )
    }

    // Check if already liked
    const existingLike = await db.like.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      }
    })

    if (existingLike) {
      // Unlike - remove the like
      await db.like.delete({
        where: { id: existingLike.id }
      })

      // Update project likes count
      const project = await db.project.findUnique({
        where: { id: projectId }
      })
      if (project) {
        await db.project.update({
          where: { id: projectId },
          data: { likes: Math.max(0, project.likes - 1) }
        })
      }

      return NextResponse.json({ liked: false })
    }

    // Create like
    await db.like.create({
      data: {
        userId,
        projectId
      }
    })

    // Update project likes count
    await db.project.update({
      where: { id: projectId },
      data: { likes: { increment: 1 } }
    })

    // Create notification
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: { user: true }
    })

    if (project && project.userId !== userId) {
      await db.notification.create({
        data: {
          type: 'like',
          message: `Quelqu'un a aimé votre projet "${project.title}"`,
          userId: project.userId,
          data: JSON.stringify({ projectId, likerId: userId })
        }
      })
    }

    return NextResponse.json({ liked: true })
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du like' },
      { status: 500 }
    )
  }
}

// DELETE - Unlike a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const projectId = searchParams.get('projectId')

    if (!userId || !projectId) {
      return NextResponse.json(
        { error: 'Utilisateur et projet requis' },
        { status: 400 }
      )
    }

    const like = await db.like.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      }
    })

    if (like) {
      await db.like.delete({
        where: { id: like.id }
      })

      // Update project likes count
      await db.project.update({
        where: { id: projectId },
        data: { likes: { decrement: 1 } }
      })
    }

    return NextResponse.json({ liked: false })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json(
      { error: 'Erreur lors du unlike' },
      { status: 500 }
    )
  }
}
