import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Fetch products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    const creatorId = searchParams.get('creatorId')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get single product by ID
    if (id) {
      const product = await db.product.findUnique({
        where: { id },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Produit non trouvé' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        ...product,
        images: JSON.parse(product.images),
        tags: product.tags ? JSON.parse(product.tags) : []
      })
    }

    // Build filter
    const where: any = {}
    if (category) {
      where.category = category
    }
    if (creatorId) {
      where.creatorId = creatorId
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const products = await db.product.findMany({
      where,
      include: {
        creator: {
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

    const total = await db.product.count({ where })

    return NextResponse.json({
      products: products.map(p => ({
        ...p,
        images: JSON.parse(p.images),
        tags: p.tags ? JSON.parse(p.tags) : []
      })),
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Fetch products error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    )
  }
}

// POST - Create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, price, images, category, stock, tags, creatorId } = body

    if (!title || !price || !creatorId) {
      return NextResponse.json(
        { error: 'Titre, prix et créateur requis' },
        { status: 400 }
      )
    }

    const product = await db.product.create({
      data: {
        title,
        description: description || '',
        price: parseFloat(price),
        images: JSON.stringify(images || []),
        category: category || 'Autre',
        stock: stock || 0,
        tags: JSON.stringify(tags || []),
        creatorId
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      ...product,
      images: JSON.parse(product.images),
      tags: product.tags ? JSON.parse(product.tags) : []
    }, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, price, images, category, stock, tags } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID du produit requis' },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseFloat(price)
    if (images !== undefined) updateData.images = JSON.stringify(images)
    if (category !== undefined) updateData.category = category
    if (stock !== undefined) updateData.stock = stock
    if (tags !== undefined) updateData.tags = JSON.stringify(tags)

    const product = await db.product.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    return NextResponse.json({
      ...product,
      images: JSON.parse(product.images),
      tags: product.tags ? JSON.parse(product.tags) : []
    })
  } catch (error) {
    console.error('Update product error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID du produit requis' },
        { status: 400 }
      )
    }

    await db.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    )
  }
}
