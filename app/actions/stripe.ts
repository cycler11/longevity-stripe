"use server"

import { stripe } from "@/lib/stripe"
import { products } from "@/lib/seed"

export async function startCheckoutSession(productId: string) {
  const product = products.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  if (!product.priceInCents) {
    throw new Error(`Product "${product.title}" does not have Stripe pricing configured`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.short,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // Collect shipping address from customer
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "IT", "ES"],
    },
    // Store metadata for webhook processing
    metadata: {
      productId: product.id,
      productSlug: product.slug,
      vendor: product.vendor,
      vendorProductId: product.vendorProductId || "",
    },
  })

  return session.client_secret
}
