import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Cricket Club Directory</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/search"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Find Clubs
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/clubs/register">Register Your Club</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
