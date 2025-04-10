import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-slate-50">
      <div className="container flex flex-1 flex-col items-center justify-center space-y-12 px-4 py-16 text-center md:px-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">404 - Page Not Found</h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed">
              We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or never existed.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="flex-1" placeholder="Search the alumni site..." type="search" />
              <Button type="submit" variant="default">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="text-xl font-medium">Alumni Projects</div>
            <p className="text-center text-sm text-gray-500">Support the institution with fellow alumni members.</p>
            {/* <p className="text-center text-sm text-gray-500">Find and connect with fellow graduates from your class.</p> */}
            <Button variant="outline" asChild>
              <Link href="/projects">Visit projects</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="text-xl font-medium">Events Calendar</div>
            <p className="text-center text-sm text-gray-500">
              Discover upcoming reunions, networking events, and more.
            </p>
            <Button variant="outline" asChild>
              <Link href="/events">View Events</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
            <div className="text-xl font-medium">Alumni Benefits</div>
            <p className="text-center text-sm text-gray-500">
              Explore exclusive resources and benefits for our graduates.
            </p>
            <Button variant="outline" asChild>
              <Link href="/members-area">See Benefits</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-medium">Need assistance?</div>
          <p className="text-gray-500">
            Contact the Alumni Relations Office at{" "}
            <a href="mailto:alumni@university.edu" className="text-primary underline underline-offset-2">
              alumni@university.edu
            </a>{" "}
            or call (555) 123-4567
          </p>
          <Button asChild className="mx-auto mt-2">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
      <footer className="border-t bg-white py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-gray-500 md:text-left">
            © {new Date().getFullYear()} OAU Atlanta University Alumni Association. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline" href="/about-us">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/contact">
              Contact
            </Link>
            {/* <Link className="text-sm font-medium hover:underline" href="/privacy">
              Privacy
            </Link> */}
          </nav>
        </div>
      </footer>
    </div>
  )
}
