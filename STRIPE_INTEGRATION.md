# Stripe Integration Guide

## Overview
Longevity Base is integrated with Stripe for secure payment processing. Products can be sold directly through Stripe Checkout or via affiliate links to partner sites.

## How It Works

### Product Configuration
Products in `lib/seed.ts` can have an optional `priceInCents` field:

\`\`\`typescript
{
  id: "1",
  slug: "oura-ring-gen3",
  title: "Oura Ring Gen 3",
  price: 299,              // Display price in dollars
  priceInCents: 29900,     // Stripe price in cents (enables Stripe checkout)
  affiliateUrl: "...",     // Fallback to affiliate link if no priceInCents
}
\`\`\`

### Checkout Flow
1. User clicks "Buy Now with Stripe" on product page
2. Modal opens with embedded Stripe Checkout
3. User completes payment securely through Stripe
4. Payment confirmed and order processed

### Server Action
The `startCheckoutSession` function in `app/actions/stripe.ts` creates a Stripe Checkout session with:
- Embedded UI mode
- No redirect after completion
- Dynamic product data from seed file
- Prices validated server-side (security feature)

## Environment Variables

Required environment variables (already configured in your project):
- `STRIPE_SECRET_KEY` - Server-side Stripe API key
- `STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Public Stripe key for client components

## Adding Stripe Checkout to Products

To enable Stripe checkout for a product, simply add the `priceInCents` field:

\`\`\`typescript
{
  id: "new-product",
  title: "Amazing Product",
  price: 99,
  priceInCents: 9900,  // Add this line
  // ... other fields
}
\`\`\`

Products without `priceInCents` will automatically show the affiliate link button instead.

## Components

### StripeCheckout (`components/stripe-checkout.tsx`)
Embedded Stripe Checkout form component that handles the payment UI.

### BuyButton (`components/buy-button.tsx`)
Smart button component that:
- Shows "Buy with Stripe" button + modal for products with `priceInCents`
- Shows "Buy from [Vendor]" link for affiliate products
- Handles modal state and checkout flow

## Testing

Use Stripe test mode cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and CVC

## Production Checklist

- [ ] Replace test Stripe keys with live keys
- [ ] Enable webhook endpoints for order fulfillment
- [ ] Test payment flow with real card
- [ ] Configure tax settings in Stripe Dashboard
- [ ] Set up email receipts in Stripe
- [ ] Review and enable fraud detection rules

## Security Features

✅ Server-side price validation - prices stored in seed file, not client
✅ No client-side price manipulation possible
✅ Stripe handles all payment security (PCI compliance)
✅ Checkout sessions expire after 24 hours
✅ HTTPS enforced in production

## Support

For Stripe-related issues:
1. Check Stripe Dashboard logs
2. Review webhook events
3. Contact Stripe support

For integration questions, refer to:
- [Stripe Docs](https://stripe.com/docs)
- [Embedded Checkout](https://stripe.com/docs/payments/checkout/embedded)
