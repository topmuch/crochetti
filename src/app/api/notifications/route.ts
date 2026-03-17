import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch user's notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    const where: any = { userId }
    if (unreadOnly) {
      where.read = false
    }

    const notifications = await db.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    })

    const total = await db.notification.count({ where })
    const unreadCount = await db.notification.count({
      where: { userId, read: false }
    })

    return NextResponse.json({
      notifications: notifications.map(n => ({
        ...n,
        data: n.data ? JSON.parse(n.data) : null
      })),
      total,
      unreadCount,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Fetch notifications error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des notifications' },
      { status: 500 }
    )
  }
}

// PUT - Mark notification as read
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, userId, markAllRead } = body

    if (markAllRead && userId) {
      // Mark all as read
      await db.notification.updateMany({
        where: { userId, read: false },
        data: { read: true }
      })

      return NextResponse.json({
        message: 'Toutes les notifications ont été marquées comme lues'
      })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la notification requis' },
        { status: 400 }
      )
    }

    const notification = await db.notification.update({
      where: { id },
      data: { read: true }
    })

    return NextResponse.json({
      ...notification,
      data: notification.data ? JSON.parse(notification.data) : null
    })
  } catch (error) {
    console.error('Update notification error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la notification' },
      { status: 500 }
    )
  }
}

// DELETE - Delete notification
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const userId = searchParams.get('userId')
    const clearAll = searchParams.get('clearAll') === 'true'

    if (clearAll && userId) {
      await db.notification.deleteMany({
        where: { userId }
      })

      return NextResponse.json({
        message: 'Toutes les notifications ont été supprimées'
      })
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID de la notification requis' },
        { status: 400 }
      )
    }

    await db.notification.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete notification error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la notification' },
      { status: 500 }
    )
  }
}
