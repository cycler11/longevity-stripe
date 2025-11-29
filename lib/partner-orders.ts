import type Stripe from "stripe"

interface CreateOrderParams {
  productId: string
  vendor: string
  vendorProductId?: string
  customerEmail: string
  shippingAddress: Stripe.Address | null
  customerName: string
  stripeSessionId: string
  amountPaid: number
}

interface OrderResult {
  success: boolean
  orderId?: string
  trackingUrl?: string
  error?: string
}

export async function createPartnerOrder(params: CreateOrderParams): Promise<OrderResult> {
  const { vendor, vendorProductId, customerEmail, shippingAddress, customerName } = params

  console.log("[v0] Creating order with vendor:", vendor)

  // Route to appropriate vendor integration
  switch (vendor) {
    case "shopify":
      return await createShopifyOrder(params)

    case "amazon":
      // Amazon MWS/SP-API integration would go here
      return {
        success: false,
        error: "Amazon integration not yet implemented",
      }

    case "other":
    default:
      // For non-integrated vendors, just log the order
      // In production, this could trigger an email to admin or create a manual task
      console.log("[v0] Manual fulfillment needed for vendor:", vendor)
      return {
        success: true,
        orderId: `MANUAL-${Date.now()}`,
      }
  }
}

async function createShopifyOrder(params: CreateOrderParams): Promise<OrderResult> {
  const shopifyDomain = process.env.SHOPIFY_DOMAIN
  const shopifyAdminToken = process.env.SHOPIFY_ADMIN_TOKEN

  if (!shopifyDomain || !shopifyAdminToken) {
    console.error("[v0] Shopify credentials not configured")
    return {
      success: false,
      error: "Shopify not configured",
    }
  }

  const { vendorProductId, customerEmail, shippingAddress, customerName, productId } = params

  if (!vendorProductId) {
    return {
      success: false,
      error: "No Shopify product ID mapped",
    }
  }

  if (!shippingAddress) {
    return {
      success: false,
      error: "No shipping address provided",
    }
  }

  // Create Shopify order via Admin API
  try {
    const response = await fetch(`https://${shopifyDomain}/admin/api/2024-01/orders.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAdminToken,
      },
      body: JSON.stringify({
        order: {
          email: customerEmail,
          fulfillment_status: "unfulfilled",
          send_receipt: false, // We'll send our own confirmation
          send_fulfillment_receipt: false,
          line_items: [
            {
              variant_id: vendorProductId,
              quantity: 1,
            },
          ],
          customer: {
            email: customerEmail,
            first_name: customerName.split(" ")[0] || customerName,
            last_name: customerName.split(" ").slice(1).join(" ") || "",
          },
          shipping_address: {
            first_name: customerName.split(" ")[0] || customerName,
            last_name: customerName.split(" ").slice(1).join(" ") || "",
            address1: shippingAddress.line1 || "",
            address2: shippingAddress.line2 || "",
            city: shippingAddress.city || "",
            province: shippingAddress.state || "",
            country: shippingAddress.country || "US",
            zip: shippingAddress.postal_code || "",
          },
          note: `Dropship order from LongevityBase. Stripe Session: ${params.stripeSessionId}`,
          tags: "dropship,longevitybase",
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Shopify API error:", error)
      return {
        success: false,
        error: `Shopify API error: ${response.status}`,
      }
    }

    const data = await response.json()
    const orderId = data.order.id

    console.log("[v0] Shopify order created:", orderId)

    return {
      success: true,
      orderId: orderId.toString(),
      trackingUrl: `https://${shopifyDomain}/admin/orders/${orderId}`,
    }
  } catch (error: any) {
    console.error("[v0] Shopify order creation failed:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
