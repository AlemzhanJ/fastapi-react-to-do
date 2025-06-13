import { Link } from "react-router-dom"
import { PrimaryButton } from "../components/Buttons"
import { useState } from "react"

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-neutral-200 flex flex-col">
      
      {/* Шапка */}
      <header className="w-full border-b border-neutral-800 bg-black">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center">
          <span className="text-xl font-semibold">Do it</span>
          <button className="sm:hidden text-neutral-200 focus:outline-none" aria-label="Открыть меню" onClick={() => setMenuOpen(v => !v)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <ul className={`flex-col sm:flex-row flex gap-4 sm:gap-6 text-sm absolute sm:static top-16 left-0 w-full sm:w-auto bg-black sm:bg-transparent z-10 transition-all duration-200 ${menuOpen ? 'flex' : 'hidden sm:flex'}`}>
            <li>
              <Link to="/register" className="hover:text-white hover:underline block py-2 sm:py-0 px-4 sm:px-0">Sign up</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white hover:underline block py-2 sm:py-0 px-4 sm:px-0">Log in</Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-white hover:underline block py-2 sm:py-0 px-4 sm:px-0">Tasks</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Главная секция */}
      <main className="flex-grow flex items-center justify-center text-center px-2 sm:px-4">
        <div className="flex flex-col gap-8 sm:gap-12 w-full max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-wide break-words">
            <span className = 'bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent'>Revolutionizing</span> To Do Apps
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            AI-powered SaaS that builds your productivity.
          </p>
          <Link to="/login" className="self-center w-full max-w-xs">
            <PrimaryButton text="Start now" />
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
