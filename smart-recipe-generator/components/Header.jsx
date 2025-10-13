// components/Header.jsx
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">🧠 Smart Recipe Generator</Link>
        <nav className="space-x-3 text-sm">
          <Link href="/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
        </nav>
      </div>
    </header>
  );
}
