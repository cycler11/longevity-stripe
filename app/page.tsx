"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { MagneticButton } from "@/components/magnetic-button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/seed"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import AnimatedTextCycle from "@/components/ui/animated-text-cycle"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const featuredProducts = products.filter((p) => p.popularity >= 90)

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#d4f1f9"
            colorB="#ffd4e5"
            speed={0.5}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#e8f4fd"
            upColor="#cfe9ff"
            downColor="#ffd4e5"
            leftColor="#d4f1f9"
            rightColor="#ffe0f0"
            intensity={0.6}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.85}
          />
        </Shader>
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-semibold leading-tight tracking-tight text-foreground">
              Longevity Base
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MagneticButton variant="secondary" asChild>
            <Link href="/quiz">Get Started</Link>
          </MagneticButton>
        </div>
      </nav>

      <section className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
            <span className="text-balance">
              Find the right{" "}
              <span className="inline-block whitespace-nowrap">
                <AnimatedTextCycle
                  words={["longevity", "supplements", "wearables", "recovery", "biohacking", "wellness"]}
                  interval={3000}
                  className="font-normal text-foreground"
                />
              </span>
              <br />
              products for your goals
            </span>
          </h1>
          <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
            <span className="text-pretty">
              Take our quick quiz to discover curated longevity products that match your health objectives and budget.
              Shop smarter, live longer.
            </span>
          </p>
          <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
            <MagneticButton size="lg" variant="primary" asChild>
              <Link href="/quiz">Start Quiz</Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" asChild>
              <Link href="/products">Browse Products</Link>
            </MagneticButton>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
            <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
              <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-white/70 px-6 py-32 backdrop-blur-md md:px-12 md:py-40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            {/* Left column - Mission & Vision */}
            <div className="space-y-8">
              <div>
                <div className="mb-6 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
                  <p className="font-mono text-xs text-foreground/90">Our Mission</p>
                </div>
                <h2 className="mb-6 font-sans text-4xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
                  <span className="text-balance">
                    Empowering Your
                    <br />
                    Longevity Journey
                  </span>
                </h2>
                <p className="text-lg leading-relaxed text-foreground/80">
                  <span className="text-pretty">
                    We believe everyone deserves access to high-quality longevity products backed by science. Our
                    platform curates the best supplements, wearables, and recovery tools to help you optimize your
                    healthspan and live your best life.
                  </span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 font-sans text-lg font-medium text-foreground">Evidence-Based Selection</h3>
                    <p className="text-foreground/70">
                      Every product is carefully vetted and backed by scientific research to ensure maximum efficacy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 font-sans text-lg font-medium text-foreground">Personalized Recommendations</h3>
                    <p className="text-foreground/70">
                      Our smart quiz algorithm matches you with products tailored to your specific health goals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-chart-2/10">
                    <svg className="h-6 w-6 text-chart-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 font-sans text-lg font-medium text-foreground">Trusted Partners</h3>
                    <p className="text-foreground/70">
                      We partner with industry leaders to bring you the most reliable and effective products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Partners & Stats */}
            <div className="space-y-8">
              <div>
                <div className="mb-6 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
                  <p className="font-mono text-xs text-foreground/90">Our Partners</p>
                </div>
                <h3 className="mb-6 font-sans text-3xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
                  <span className="text-balance">Working With Industry Leaders</span>
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-foreground/80">
                  <span className="text-pretty">
                    We collaborate with the world's most innovative longevity companies to provide you with cutting-edge
                    products and exclusive offers.
                  </span>
                </p>

                {/* Featured Partners */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-all hover:border-foreground/30 hover:bg-card/60">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                        <span className="font-sans text-xl font-bold text-foreground">T</span>
                      </div>
                      <div>
                        <h4 className="font-sans text-lg font-semibold text-foreground">TruDiagnostic</h4>
                        <p className="font-mono text-xs text-muted-foreground">Epigenetic Testing</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      Advanced biological age testing through DNA methylation analysis, helping you measure and optimize
                      your healthspan.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-all hover:border-foreground/30 hover:bg-card/60">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-chart-2/20">
                        <span className="font-sans text-xl font-bold text-foreground">O</span>
                      </div>
                      <div>
                        <h4 className="font-sans text-lg font-semibold text-foreground">Oura Ring</h4>
                        <p className="font-mono text-xs text-muted-foreground">Sleep & Recovery Tracking</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      Premium wearable technology that tracks your sleep, activity, and readiness to optimize your daily
                      performance.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-all hover:border-foreground/30 hover:bg-card/60">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-chart-2/20 to-primary/20">
                        <span className="font-sans text-xl font-bold text-foreground">M</span>
                      </div>
                      <div>
                        <h4 className="font-sans text-lg font-semibold text-foreground">Momentous</h4>
                        <p className="font-mono text-xs text-muted-foreground">Performance Supplements</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      NSF Certified for Sport supplements trusted by elite athletes and health optimizers worldwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md">
                  <div className="mb-2 font-sans text-3xl font-light text-foreground">500+</div>
                  <div className="font-mono text-xs text-muted-foreground">Curated Products</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md">
                  <div className="mb-2 font-sans text-3xl font-light text-foreground">50K+</div>
                  <div className="font-mono text-xs text-muted-foreground">Happy Customers</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md">
                  <div className="mb-2 font-sans text-3xl font-light text-foreground">30+</div>
                  <div className="font-mono text-xs text-muted-foreground">Partner Brands</div>
                </div>
                <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md">
                  <div className="mb-2 font-sans text-3xl font-light text-foreground">4.9★</div>
                  <div className="font-mono text-xs text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-white/60 px-6 py-24 backdrop-blur-md md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs text-foreground/90">Best Sellers</p>
            </div>
            <h2 className="mb-4 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
              <span className="text-balance">Most Popular Products</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              <span className="text-pretty">
                Trusted by thousands of customers optimizing their healthspan and longevity.
              </span>
            </p>
          </div>

          <AnimatedGroup className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" preset="blur-slide">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatedGroup>

          <div className="mt-12 text-center">
            <MagneticButton variant="secondary" size="lg" asChild>
              <Link href="/products">Shop All Products</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-foreground/10 bg-gradient-to-b from-primary/5 to-white/50 dark:from-primary/10 dark:to-background/50 px-6 py-24 md:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-sans text-5xl font-light leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Start your longevity journey today</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            <span className="text-pretty">
              Get personalized product recommendations based on your unique health goals and preferences.
            </span>
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <MagneticButton size="lg" variant="primary" asChild>
              <Link href="/quiz">Take the Quiz</Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" asChild>
              <Link href="/about">Learn More</Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-foreground/10 bg-white/80 px-6 py-12 backdrop-blur-md md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/15">
                  <span className="font-sans text-lg font-bold text-foreground">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-base font-semibold leading-tight text-foreground">
                    Longevity Base
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your curated marketplace for evidence-based longevity products.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-sm text-foreground transition-colors hover:text-primary">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="text-sm text-foreground transition-colors hover:text-primary">
                    Take Quiz
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-foreground transition-colors hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-foreground transition-colors hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/legal/privacy" className="text-sm text-foreground transition-colors hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-sm text-foreground transition-colors hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/affiliate-disclosure"
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    Affiliate Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-foreground/10 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Longevity Base. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
