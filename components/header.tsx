import Link from "next/link"
import { User, CreditCard, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-6">
        <Link href="/" className="font-semibold text-xl">
          GaliChat
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="gap-2">
            <Star className="h-4 w-4" />
            Become a partner
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            Account
          </Button>
        </div>
      </div>
    </header>
  )
}

