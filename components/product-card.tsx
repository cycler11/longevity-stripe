import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { VendorIcon } from "./vendor-icon"
import { vendorConfig } from "@/lib/vendor-config"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  score?: number
  className?: string
}

export function ProductCard({ product, score, className }: ProductCardProps) {
  const vendorName = vendorConfig[product.vendor]?.name || product.vendor

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.03]",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Score Badge - Always visible */}
        {score !== undefined && (
          <div className="absolute right-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 backdrop-blur-sm">
            <span className="font-mono text-xs font-bold text-primary-foreground">{score.toFixed(1)}</span>
          </div>
        )}

        {/* Hover Overlay with Details */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 font-sans text-base font-semibold leading-tight text-white">
            {product.title}
          </h3>

          {/* Description */}
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-white/80">{product.short}</p>

          {/* Vendor & Category */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">
              <VendorIcon vendor={product.vendor} className="h-3 w-3" />
              <span className="font-mono text-xs text-white">{vendorName}</span>
            </div>
            <div className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">
              <span className="font-mono text-xs capitalize text-white">{product.category}</span>
            </div>
          </div>

          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-lg font-bold text-white">${product.price}</span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-mono text-sm font-semibold text-white">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
