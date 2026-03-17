import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch users (creators)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const search = searchParams.get('search')
    const role = searchParams.get('role')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get single user by ID
    if (id) {
      const user = await db.user.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              projects: true,
              followers: true,
              following: true
            }
          }
        }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Utilisateur non trouvé' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
        stats: {
          projects: user._count.projects,
          followers: user._count.followers,
          following: user._count.following
        }
      })
    }

    // Get all users with filters
    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } }
      ]
    }
    if (role) {
      where.role = role
    }

    const users = await db.user.findMany({
      where,
      include: {
        _count: {
          select: {
            projects: true,
            followers: true
          }
        }
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' }
    })

    const total = await db.user.count({ where })

    return NextResponse.json({
      users: users.map(u => ({
        id: u.id,
        name: u.name,
        avatar: u.avatar,
        bio: u.bio,
        role: u.role,
        stats: {
          projects: u._count.projects,
          followers: u._count.followers
        }
      })),
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Fetch users error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, avatar, bio, role } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (avatar !== undefined) updateData.avatar = avatar
    if (bio !== undefined) updateData.bio = bio
    if (role !== undefined) updateData.role = role

    const user = await db.user.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'utilisateur' },
      { status: 500 }
    )
  }
}
