import Link from "next/link";

export default function Nav() {
    return  (        
        <nav className="p-4 border-b flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/samples">Samples</Link>
          <Link href="/results">Results Search (WIP)</Link>
        </nav>
    )
}