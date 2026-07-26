import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { orders } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      items?: { id: string; quantity: number }[];
      customerName?: string;
      customerEmail?: string;
    };

    const { items, customerName, customerEmail } = body;

    if (!items || !items.length || !customerName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const productIds = items.map((i: any) => i.id);

    // Fetch trusted prices from DB
    const dbProducts = await db.query.products.findMany({
      where: (products, { inArray }) => inArray(products.id, productIds),
    });

    let totalAmount = 0;

    for (const item of items) {
      if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        return NextResponse.json({ error: `Invalid quantity for product ${item.id}` }, { status: 400 });
      }

      const dbProduct = dbProducts.find((p) => p.id === item.id);
      if (dbProduct) {
        totalAmount += dbProduct.price * item.quantity;
      } else {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 404 });
      }
    }

    const orderId = uuidv4();

    await db.insert(orders).values({
      id: orderId,
      customerName,
      customerEmail,
      totalAmount,
      status: 'pending',
    });

    return NextResponse.json({ orderId, success: true });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
