import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get user's cart
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    const cart = await db.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      return NextResponse.json({
        items: [],
        total: 0
      })
    }

    const items = JSON.parse(cart.items)
    
    // Calculate total
    let total = 0
    for (const item of items) {
      total += item.price * item.quantity
    }

    return NextResponse.json({
      items,
      total
    })
  } catch (error) {
    console.error('Fetch cart error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du panier' },
      { status: 500 }
    )
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId, quantity = 1 } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Utilisateur et produit requis' },
        { status: 400 }
      )
    }

    // Get product details
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId,
          items: JSON.stringify([])
        }
      })
    }

    // Parse current items
    const items = JSON.parse(cart.items)
    
    // Check if product already in cart
    const existingIndex = items.findIndex((item: any) => item.productId === productId)
    
    if (existingIndex >= 0) {
      // Update quantity
      items[existingIndex].quantity += quantity
    } else {
      // Add new item
      items.push({
        productId,
        quantity,
        price: product.price,
        title: product.title,
        image: JSON.parse(product.images)[0] || null
      })
    }

    // Update cart
    await db.cart.update({
      where: { userId },
      data: {
        items: JSON.stringify(items)
      }
    })

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

    return NextResponse.json({
      items,
      total,
      message: 'Produit ajouté au panier'
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout au panier' },
      { status: 500 }
    )
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId, quantity } = body

    if (!userId || !productId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Utilisateur, produit et quantité requis' },
        { status: 400 }
      )
    }

    const cart = await db.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      return NextResponse.json(
        { error: 'Panier non trouvé' },
        { status: 404 }
      )
    }

    const items = JSON.parse(cart.items)
    const index = items.findIndex((item: any) => item.productId === productId)

    if (index < 0) {
      return NextResponse.json(
        { error: 'Produit non trouvé dans le panier' },
        { status: 404 }
      )
    }

    if (quantity <= 0) {
      // Remove item
      items.splice(index, 1)
    } else {
      // Update quantity
      items[index].quantity = quantity
    }

    await db.cart.update({
      where: { userId },
      data: {
        items: JSON.stringify(items)
      }
    })

    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

    return NextResponse.json({
      items,
      total
    })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du panier' },
      { status: 500 }
    )
  }
}

// DELETE - Remove item from cart or clear cart
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const productId = searchParams.get('productId')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      )
    }

    const cart = await db.cart.findUnique({
      where: { userId }
    })

    if (!cart) {
      return NextResponse.json({
        items: [],
        total: 0
      })
    }

    let items = JSON.parse(cart.items)

    if (productId) {
      // Remove specific item
      items = items.filter((item: any) => item.productId !== productId)
    } else {
      // Clear cart
      items = []
    }

    await db.cart.update({
      where: { userId },
      data: {
        items: JSON.stringify(items)
      }
    })

    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

    return NextResponse.json({
      items,
      total
    })
  } catch (error) {
    console.error('Delete from cart error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du panier' },
      { status: 500 }
    )
  }
}
