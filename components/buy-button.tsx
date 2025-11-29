"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { StripeCheckout } from "@/components/stripe-checkout"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BuyButtonProps {
  productId: string
  productTitle: string
  vendorName: string
  hasStripePrice: boolean
  affiliateUrl?: string
}

export function BuyButton({ productId, productTitle, vendorName, hasStripePrice, affiliateUrl }: BuyButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false)

  if (hasStripePrice) {
    return (
      <>
        <Button size="lg" className="w-full rounded-2xl py-6 text-lg" onClick={() => setShowCheckout(true)}>
          Buy Now with Stripe
        </Button>

        <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{productTitle}</DialogTitle>
              <DialogDescription>Complete your purchase securely with Stripe</DialogDescription>
            </DialogHeader>
            <StripeCheckout productId={productId} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Button asChild size="lg" className="w-full rounded-2xl py-6 text-lg">
      <a href={affiliateUrl || "#"} target="_blank" rel="noopener noreferrer">
        Buy from {vendorName}
      </a>
    </Button>
  )
}
