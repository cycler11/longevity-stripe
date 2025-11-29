import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { createPartnerOrder } from "@/lib/partner-orders"
import type Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("[v0] Payment successful:", session.id)
    console.log("[v0] Customer email:", session.customer_details?.email)
    console.log("[v0] Shipping address:", session.shipping_details?.address)

    // Extract metadata
    const { productId, vendor, vendorProductId } = session.metadata || {}

    if (!productId) {
      console.error("[v0] No productId in session metadata")
      return NextResponse.json({ error: "Missing product info" }, { status: 400 })
    }

    // Create order with partner (Shopify, Amazon, etc.)
    try {
      const orderResult = await createPartnerOrder({
        productId,
        vendor,
        vendorProductId,
        customerEmail: session.customer_details?.email || "",
        shippingAddress: session.shipping_details?.address || null,
        customerName: session.shipping_details?.name || "",
        stripeSessionId: session.id,
        amountPaid: session.amount_total || 0,
      })

      console.log("[v0] Partner order created:", orderResult)
    } catch (error: any) {
      console.error("[v0] Failed to create partner order:", error.message)
      // In production, you'd want to retry or alert admin
    }
  }

  return NextResponse.json({ received: true })
}
